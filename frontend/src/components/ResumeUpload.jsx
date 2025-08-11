import React from 'react';

const ResumeUpload = ({ onFileChange, resumeFile }) => {
  const handleFileChange = (event) => {
    // This line ensures that we get the file even if the user clicks "cancel"
    if (event.target.files && event.target.files.length > 0) {
      onFileChange(event.target.files[0]);
    } else {
      // If no file is selected, clear the state
      onFileChange(null);
    }
  };

  return (
    <div className="mt-4 p-6 border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:bg-gray-50 transition-colors">
      <input 
        id="file-upload" 
        name="file-upload" 
        type="file" 
        className="sr-only" 
        onChange={handleFileChange} 
        accept=".pdf,.doc,.docx" // This line ensures only valid files can be selected
      />
      <label htmlFor="file-upload" className="block cursor-pointer">
        {resumeFile ? (
          <div>
            <p className="mt-2 text-sm text-gray-600">
              File selected: <span className="font-medium text-blue-600">{resumeFile.name}</span>
            </p>
          </div>
        ) : (
          <div>
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28m0 0l-3-3m-4-3l-3 3m0 0l-4 4m0-16h8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium text-blue-600">Click to upload or drag and drop</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">PDF, DOC, or DOCX files only</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default ResumeUpload;