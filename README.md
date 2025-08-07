To set up:

Create virtual environment (if not done yet):
python -m venv venv

Activate the virtual environment (PowerShell syntax):
.\venv\Scripts\Activate

You should see something like this in your terminal prompt after activation:
(venv) PS C:\Users\YourName\resume-screening-nlp>


Run the server in backend with the command: 
uvicorn app:app --reload
avigate to http://127.0.0.1:8000/docs in your browser.

Restart the Uvicorn server with the command uvicorn app:app --host 0.0.0.0 --port 8000 --reload. This time, it should start up almost instantly.

Navigate to http://127.0.0.1:8000/docs and test the /match endpoint.