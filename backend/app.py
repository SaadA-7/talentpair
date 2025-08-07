import pandas as pd
import os
import re
from nltk.corpus import stopwords
import nltk
from sentence_transformers import SentenceTransformer, util

# Ensure NLTK stopwords are downloaded (run once in Python terminal)
# >>> import nltk
# >>> nltk.download('stopwords')

# Load a pre-trained Sentence Transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Get the list of English stopwords
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

def load_datasets():
    """Loads and preprocesses the resume and job descriptions datasets."""
    
    resume_df = None
    job_df = None
    
    try:
        job_df = pd.read_csv(jobs_file)
        resume_df = pd.read_csv(resumes_file)
    except FileNotFoundError as e:
        print(f"Error: A data file was not found. Please check your filenames and paths. Details: {e}")
        return None, None
    
    # Use the correct column names found through debugging
    resume_text_column = 'skills' 
    job_desc_column = 'job_title'
    
    # Check if the required columns exist before processing
    if resume_text_column not in resume_df.columns:
        print(f"KeyError: '{resume_text_column}' column not found in resume_data.csv. Please check the CSV file.")
        return None, None
    if job_desc_column not in job_df.columns:
        print(f"KeyError: '{job_desc_column}' column not found in job_description.csv. Please check the CSV file.")
        return None, None

    # Preprocess the text data
    resume_df['processed_resume'] = resume_df[resume_text_column].apply(preprocess_text)
    job_df['processed_job'] = job_df[job_desc_column].apply(preprocess_text)

    # Drop rows where the text might have become empty after preprocessing
    resume_df.dropna(subset=['processed_resume'], inplace=True)
    job_df.dropna(subset=['processed_job'], inplace=True)

    return resume_df, job_df

def get_embeddings(texts):
    """
    Generates sentence embeddings for a list of texts.
    """
    return model.encode(texts, convert_to_tensor=True)

def match_resumes_to_job(job_description, resumes_df, num_matches=5):
    """
    Matches and ranks resumes against a single job description.
    """
    print(f"\nMatching resumes for job: {job_description}\n")

    # Generate embeddings for the job description and all resumes
    job_embedding = get_embeddings([job_description])
    resume_embeddings = get_embeddings(resumes_df['processed_resume'].tolist())

    # Calculate cosine similarity between the job and all resumes
    cosine_scores = util.cos_sim(job_embedding, resume_embeddings)[0]

    # Get the top N resume indices based on the scores
    top_matches_indices = cosine_scores.topk(num_matches).indices.tolist()
    
    ranked_resumes = []
    for rank, idx in enumerate(top_matches_indices):
        score = cosine_scores[idx].item()
        resume_text = resumes_df.iloc[idx]['processed_resume']
        original_resume_data = resumes_df.iloc[idx]
        
        ranked_resumes.append({
            'rank': rank + 1,
            'match_score': score,
            'resume_text': resume_text,
            'original_data': original_resume_data
        })
    
    return ranked_resumes

if __name__ == "__main__":
    resume_df, job_df = load_datasets()

    if resume_df is not None and job_df is not None:
        # Example 1: Match all resumes to the first job description in the dataset
        job_description_text = job_df.iloc[0]['processed_job']
        ranked_resumes = match_resumes_to_job(job_description_text, resume_df)

        print("--- Top Ranked Resumes ---")
        for match in ranked_resumes:
            print(f"Rank {match['rank']}: Score = {match['match_score']:.4f}")
            print(f"Resume Content: {match['resume_text'][:100]}...\n") # Print first 100 characters

        # Example 2: Match resumes to a custom job title
        custom_job = "Data Analyst with Python and SQL skills."
        ranked_custom_resumes = match_resumes_to_job(preprocess_text(custom_job), resume_df)
        
        print("\n--- Top Ranked Resumes for Custom Job ---")
        for match in ranked_custom_resumes:
            print(f"Rank {match['rank']}: Score = {match['match_score']:.4f}")
            print(f"Resume Content: {match['resume_text'][:100]}...\n")

    else:
        print("Dataset loading failed. Please resolve the file or column name errors.")