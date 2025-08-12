# TalentPair: AI-Powered Resume Screener

## 📌 Overview
TalentPair is a research prototype developed during my internship at **Elevvo Pathways**. It explores AI-driven communication and unstructured text analysis by matching resumes to job descriptions using Natural Language Processing (NLP).

The system:
- Preprocesses resumes and job descriptions using embeddings
- Applies cosine similarity to rank candidates
- Returns match scores with skill justification
- Provides a simple web interface for resume upload and instant analysis

---

## ✨ Key Features
- **Resume–Job Matching:** Preprocessing with advanced text embeddings
- **Ranking & Justification:** Cosine similarity generates scores and top-candidate lists
- **Frontend Prototype:** User-friendly resume upload and job description input
- **Comprehensive Analysis:** Entity extraction, classification, and semantic search using modern NLP tools

---

## ⚙️ How It Works
1. **Text Preprocessing**
   - Lowercasing, punctuation removal, stopword removal
   - Tokenization and lemmatization
   - Cleaning of HTML tags and special characters

2. **Embedding Generation**
   - Sentence-Transformer models create semantic embeddings
   - Similar meanings map close together in vector space

3. **Similarity Matching**
   - Cosine similarity compares embeddings
   - Scores close to `1.0` indicate strong matches

---

## 🛠 Technologies Used

### Backend (Python)
- **FastAPI** – Web framework for API endpoints
- **Uvicorn** – ASGI server for FastAPI
- **Sentence-Transformers** – High-quality embeddings
- **Pandas** – Data manipulation
- **Scikit-learn** – Cosine similarity calculation
- **python-multipart** – File upload handling

### Frontend (React + Vite)
- **React** – UI framework
- **Vite** – Fast build tool
- **Tailwind CSS** – Utility-first styling

---

## 💻 Local Setup & Usage

> ⚠️ Requires **Python 3.9+** and **Node.js 18+** installed.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/talentpair.git
cd talentpair

```
### 2. Backend Setup
```bash
cd backend

# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate   # Windows PowerShell
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Start backend server
uvicorn app:app --reload

# Backend will be running at http://localhost:8000

```

### 3. Frontend Setup
```bash
# Open a new terminal:
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend will be available at http://localhost:5173

```

## Using the Application

 - Open the frontend URL in your browser
 - Upload a resume file (.pdf, .docx, .txt)
 - Enter a job description
 - View match score, ranking, and skill justification

## Deployment
 - The application is deployed on Render.
 - Live App: Click here to view
 - (Note: The backend may take 1–2 minutes to wake from a cold start due to libraries installing.)

## Future Enhancements
 - Single Command Startup – One script to launch both backend & frontend
 - Reduced Backend Cold Start – Faster model loading
 - Enhanced Matching – Combine skills, experience, and education
 - Better Error Handling – Clearer feedback for file parsing or API failures

## Learning & Research Highlights
 - Text preprocessing: Lowercasing, punctuation/number removal, stopword filtering, lemmatization
 - Embedding creation with Sentence Transformers
 - Semantic comparison using cosine similarity
 - Handling unstructured real-world resume/job data
 - FastAPI API design for ML-powered applications

## License
This project is for research and educational purposes as part of my internship with Elevvo Pathways.
