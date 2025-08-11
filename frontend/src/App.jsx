import React, { useState } from 'react';
import Header from './components/Header';
import MainLayout from './components/MainLayout';
import InputPanel from './components/InputPanel';
import ResultsPanel from './components/ResultsPanel'; // <-- Import the new component

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleScreenResume = async () => {
  // Add this check to prevent API calls with missing data
  if (!resumeFile || jobDescription.trim() === '') {
    alert("Please upload a resume and provide a job description.");
    return; // Stop the function if data is missing
  }

  setIsLoading(true);
  const formData = new FormData();
  formData.append('resume', resumeFile);
  formData.append('job_description', jobDescription);

  try {
    const response = await fetch('http://localhost:8000/match', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setResults(data);
    
  } catch (error) {
    console.error('Error during screening:', error);
    // Handle the error state in the UI
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Header />
      <MainLayout>
        {/* Left column for inputs */}
        <InputPanel 
          onFileChange={setResumeFile} 
          onDescriptionChange={setJobDescription} 
          onScreenClick={handleScreenResume}
          isLoading={isLoading}
          resumeFile={resumeFile} // Pass the resumeFile state
        />
        
        {/* Right column for results */}
        <ResultsPanel results={results} />
      </MainLayout>
    </div>
  );
}

export default App;