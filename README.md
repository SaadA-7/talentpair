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
