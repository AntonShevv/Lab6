import React from 'react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

function ThemeToggle({ isDarkMode, toggleTheme }:ThemeToggleProps)  {
  return (
    <button 
      onClick={toggleTheme} 
      className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white text-xl font-medium rounded-lg p-3"
    >
      {isDarkMode ? 'Светлая тема' : 'Тёмная тема'}
    </button>
  );
};

export default ThemeToggle;
