import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
    return (
        <header className="bg-white p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    {/* Increased logo size from h-8 w-8 to h-10 w-10 */}
                    <img src={logo} alt="TalentPair Logo" className="h-10 w-10" />
                    <h1 className="text-xl font-bold text-gray-800">TalentPair</h1>
                </div>
                {/* You can add more navigation or elements here if needed */}
            </div>
        </header>
    );
};

export default Header;