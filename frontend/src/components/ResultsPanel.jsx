import React from 'react';

const ResultsPanel = ({ results }) => {
  if (!results) {
    return (
      // ... (your existing welcome message content)
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l-2 2-2-2-2 2L2 6v13a2 2 0 002 2h14a2 2 0 002-2v-3m-6 3V9m-2 4h4" />
        </svg>
        <p className="mt-4 text-sm text-gray-500">
          Ready to analyze. Upload a resume and provide a job description to see detailed matching results and recommendations.
        </p>
      </div>
    );
  }

  // Add this check to prevent the crash
  const ranked_resumes = results.ranked_resumes || []; 

  if (ranked_resumes.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
        <p className="mt-4 text-sm text-gray-500">
          No matches found for the provided job description.
        </p>
      </div>
    );
  }

  return (
    // ... (your existing ranked results list)
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Matching Results</h2>
      <ul className="divide-y divide-gray-200">
        {ranked_resumes.map((item) => (
          <li key={item.rank} className="py-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Rank {item.rank}</h3>
              <span className="px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-full">
                {Math.round(item.resume.match_score * 100)}%
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {item.resume.content.length > 200
                ? item.resume.content.substring(0, 200) + '...'
                : item.resume.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPanel;