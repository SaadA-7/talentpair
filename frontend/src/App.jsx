import React, { useState } from 'react';
import Header from './components/Header';
import MainLayout from './components/MainLayout';
import InputPanel from './components/InputPanel';

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleScreenResume = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jobDescription', jobDescription);

    try {
      // Replace with your actual backend URL
      const response = await fetch('http://localhost:5000/api/screen', {
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
        />
        
        {/* Right column for results */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
          {/* We'll add logic to display the results here later */}
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l-2 2-2-2-2 2L2 6v13a2 2 0 002 2h14a2 2 0 002-2v-3m-6 3V9m-2 4h4" />
          </svg>
          <p className="mt-4 text-sm text-gray-500">
            Ready to analyze. Upload a resume and provide a job description to see detailed matching results and recommendations.
          </p>
        </div>
      </MainLayout>
    </div>
  );
}

export default App;