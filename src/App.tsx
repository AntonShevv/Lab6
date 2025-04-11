import React, { useState, useEffect } from 'react';
import useCalculator from './components/Calculator';
import Display from './components/Display';
import Keypad from './components/Keypad';
import ThemeToggle from './components/ThemeToggle';
import { ButtonValue } from './components/Button';
import './index.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { state, handleInput, calculate } = useCalculator();

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (/[0-9]/.test(key)) handleInput(key as ButtonValue);
      else if (['+', '-', '*', '/'].includes(key)) handleInput(key as ButtonValue);
      else if (key === '=') calculate();
      else if (key === 'Backspace') handleInput('⌫');
      else if (key.toUpperCase() === 'C') handleInput('C');
      else if (key === '.') handleInput('.');
      else if (key === '_') handleInput('±');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput, calculate]);

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-80 p-4 rounded-2xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        
        <Display value={state.currentValue} history={state.history} isDarkMode={isDarkMode} />
        
        <Keypad isDarkMode={isDarkMode} handleInput={handleInput} calculate={calculate} />
        
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      </div>
    </div>
  );
}

export default App;
