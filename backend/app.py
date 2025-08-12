import pandas as pd
import os
import re
import nltk
from nltk.corpus import stopwords
from sentence_transformers import SentenceTransformer, util
from fastapi import FastAPI, UploadFile, File, Form
import uvicorn
from io import StringIO
import json
import torch
import pypandoc
from tempfile import NamedTemporaryFile
import fitz  # PyMuPDF library

# Initialize FastAPI app
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",  # frontend's address
    "http://127.0.0.1:5173",  # other local setups
]

# middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Note on NLTK stopwords: This is a one-time download.
# If you run the code and it throws a LookupError, open a Python
# terminal and run:
# >>> import nltk
# >>> nltk.download('stopwords')

# Get the list of English stopwords
try:
    stop_words = set(stopwords.words('english'))
except LookupError:
    print("Downloading NLTK stopwords...")
    nltk.download('stopwords')
    stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    """
    Cleans and preprocesses a given text.
    """
    if not isinstance(text, str):
        # Handle non-string values like NaN gracefully
        return ""

    # 1. Lowercase the text
    text = text.lower()

    # 2. Remove HTML tags
    text = re.sub('<.*?>', '', text)

    # 3. Remove non-alphanumeric characters and numbers
    text = re.sub(r'[^a-zA-Z\s]', '', text)

    # 4. Remove extra whitespaces
    text = re.sub(r'\s+', ' ', text).strip()

    # 5. Remove stopwords
    tokens = text.split()
    filtered_tokens = [word for word in tokens if word not in stop_words]
    text = ' '.join(filtered_tokens)

    return text

# Define the path to our data folder
data_path = os.path.join(os.path.dirname(__file__), 'data')
jobs_file = os.path.join(data_path, 'job_description.csv')
resumes_file = os.path.join(data_path, 'resume_data.csv')

def load_resumes_for_match():
    """Loads and preprocesses the entire resume dataset for matching."""
    try:
        resume_df = pd.read_csv(resumes_file)
    except FileNotFoundError as e:
        print(f"Error: Resume data file not found. Details: {e}")
        return None
    
    # Use the correct column name
    resume_text_column = 'skills' 
    
    if resume_text_column not in resume_df.columns:
        print(f"KeyError: '{resume_text_column}' column not found in resume_data.csv. Please check the CSV file.")
        return None

    resume_df['processed_resume'] = resume_df[resume_text_column].apply(preprocess_text)
    resume_df.dropna(subset=['processed_resume'], inplace=True)
    return resume_df

# Load the Sentence Transformer model globally at startup
model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embeddings(texts):
    """
    Generates sentence embeddings for a list of texts.
    """
    # Check for empty list and handle it gracefully
    if not texts:
        return torch.tensor([])
    return model.encode(texts, convert_to_tensor=True)

# --- API Endpoints ---
@app.get("/")
def read_root():
    """
    Health check endpoint to ensure the API is running.
    """
    return {"message": "Welcome to the TalentPair API! The server is running."}

@app.post("/match")
async def match_resumes(job_description: str = Form(...), resume: UploadFile = File(...)):
    """
    Screens and ranks resumes against a provided job description.
    """
    # Load the full resume dataset when the endpoint is called
    resume_df = load_resumes_for_match()
    if resume_df is None:
        return {"error": "Resume dataset failed to load."}

    # Use a temporary file to save the uploaded resume
    try:
        _, file_extension = os.path.splitext(resume.filename)
        file_extension = file_extension.lstrip('.').lower()

        if file_extension == 'pdf':
            # Use PyMuPDF for PDF files
            file_bytes = await resume.read()
            doc = fitz.open(stream=file_bytes, filetype="pdf")
            resume_content = ""
            for page in doc:
                resume_content += page.get_text()
            doc.close()
        elif file_extension in ['docx', 'doc']:
            # Use pypandoc for DOCX files
            with NamedTemporaryFile(delete=False, suffix=f".{file_extension}") as temp_file:
                temp_file.write(await resume.read())
                temp_file_path = temp_file.name
            resume_content = pypandoc.convert_file(temp_file_path, 'plain', format=file_extension)
            os.unlink(temp_file_path)
        else:
            return {"error": f"Unsupported file type: {file_extension}. Please upload a PDF, DOCX, or DOC file."}

    except Exception as e:
        # Handle potential errors during conversion
        print(f"Error converting file: {e}")
        return {"error": "Failed to extract text from resume file."}
    
    # Preprocess the job description and the uploaded resume
    processed_job_desc = preprocess_text(job_description)
    processed_resume_content = preprocess_text(resume_content)

    # Generate embeddings for all resumes and the job description
    all_texts = resume_df['processed_resume'].tolist()
    all_texts.append(processed_resume_content)
    all_texts.append(processed_job_desc)

    all_embeddings = get_embeddings(all_texts)
    
    # The last embedding is for the job description
    job_embedding = all_embeddings[-1:]
    
    # The first embeddings are for the resumes (including the uploaded one)
    resumes_embeddings = all_embeddings[:-1]

    # Calculate cosine similarity between the job and all resumes
    cosine_scores = util.cos_sim(job_embedding, resumes_embeddings)[0]
    
    top_matches_indices = sorted(range(len(cosine_scores)), key=lambda i: cosine_scores[i], reverse=True)
    
    ranked_results = []
    
    for rank, idx in enumerate(top_matches_indices[:5]): # Top 5 results
        score = cosine_scores[idx].item()
        
        # Check if the index corresponds to the uploaded resume
        if idx == len(resume_df):
            resume_data = {"id": "uploaded_resume", "content": resume_content, "match_score": score}
        else:
            resume_data = {
                "id": resume_df.iloc[idx]['ID'] if 'ID' in resume_df.columns else idx,
                "content": resume_df.iloc[idx]['skills'],
                "match_score": score
            }
        
        ranked_results.append({
            "rank": rank + 1,
            "resume": resume_data
        })

    return {"job_description": job_description, "ranked_resumes": ranked_results}