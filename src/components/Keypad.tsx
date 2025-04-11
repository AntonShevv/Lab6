import React from 'react';
import Button, { ButtonValue } from './Button';

interface KeypadProps {
  isDarkMode: boolean;
  handleInput: (value: ButtonValue) => void;
  calculate: () => void;
}

const buttons: ButtonValue[] = [
  '1', '2', '3', '+',
  '4', '5', '6', '-',
  '7', '8', '9', '*',
  '0', '±', '.', '/',
  'C', '⌫', '='
];

function Keypad({ isDarkMode, handleInput, calculate }:KeypadProps)  {
  const getButtonClasses = (btn: ButtonValue): string => {
    if (btn === '=') return 'col-span-1 bg-green-500 hover:bg-green-600 text-white';
    if (['C', '⌫'].includes(btn)) return 'bg-red-500 hover:bg-red-600 text-white';
    if (['+', '-', '*', '/', '%'].includes(btn)) return 'bg-blue-500 hover:bg-blue-600 text-white';
    return isDarkMode
      ? 'bg-gray-700 hover:bg-gray-600 text-white'
      : 'bg-gray-200 hover:bg-gray-300';
  };

  return (
    <div className="grid grid-cols-4 gap-3 mt-4">
      {buttons.map((btn) => (
        <Button
          key={btn}
          value={btn}
          onClick={btn === '=' ? calculate : handleInput}
          className={`text-xl font-medium rounded-lg p-4 flex items-center justify-center ${getButtonClasses(btn)}`}
        />
      ))}
    </div>
  );
};

export default Keypad;
