import React, { useState } from 'react';

const TipsDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const tips = [
        "**For Recruiters:** This tool is designed to mimic an Applicant Tracking System (ATS), helping you quickly identify which resumes are ideal for a job posting.",
        "**For Job Applicants:** Use this tool to determine which version of your resume best highlights your skills for a specific job, giving you an edge in the application process.",
        "**Tip:** Upload resume(s) and a job description to get a ranking of which sections of the resume likely match best with the role."
    ];

    return (
        <div className="max-w-xl mx-auto my-3 p-4 bg-white rounded-xl shadow-lg border border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full focus:outline-none text-gray-700 font-semibold"
            >
                <span>Helpful Tips</span>
                <svg
                    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <ul className="text-sm text-left text-gray-500 space-y-2">
                        {tips.map((tip, index) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: tip.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TipsDropdown;