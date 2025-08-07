import pandas as pd
import os
from sentence_transformers import SentenceTransformer

# Define the path to your data folder
data_path = os.path.join(os.path.dirname(__file__), 'data')
resumes_file = os.path.join(data_path, 'resume_data.csv')

def load_resumes_for_test():
    """Loads a small portion of the resume data for testing."""
    try:
        resume_df = pd.read_csv(resumes_file)
        if 'skills' not in resume_df.columns:
            print("KeyError: 'skills' column not found. Please check your CSV file.")
            return None
        return resume_df.head(10) # Load only the first 10 rows for a quick test
    except FileNotFoundError:
        print(f"Error: Resume data file not found at {resumes_file}")
        return None

if __name__ == "__main__":
    print("--- Starting model and embedding test ---")

    # Load a small portion of the resume data
    resume_df = load_resumes_for_test()
    if resume_df is None:
        print("Test failed: Could not load resume data.")
    else:
        try:
            # 1. Attempt to load the Sentence Transformer model
            print("Attempting to load the Sentence Transformer model...")
            model = SentenceTransformer('all-MiniLM-L6-v2')
            print("✅ Model loaded successfully!")

            # 2. Attempt to generate embeddings for a few resumes
            print("Attempting to generate embeddings...")
            texts_to_embed = resume_df['skills'].tolist()
            embeddings = model.encode(texts_to_embed, convert_to_tensor=True)
            print(f"✅ Embeddings generated successfully! Shape: {embeddings.shape}")
            
            print("\n--- Test complete. The model and embeddings are working. ---")

        except Exception as e:
            print(f"\n❌ An error occurred during the model test.")
            print(f"Error: {e}")
            import traceback
            traceback.print_exc()