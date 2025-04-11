import React from 'react';
import '../index.css';

interface DisplayProps {
  value: string;
  history?: string[];
  isDarkMode: boolean;
}

function Display({ value, history, isDarkMode }: DisplayProps) {
  return (
    <>
      <div>
        {history?.map((item, index) => <div key={index} className={`text-xl font-medium rounded-lg
                flex  ${isDarkMode ? 'text-blue-50' : 'text-neutral-950'}`}>{++index + ')'} {item}</div>)}
      </div>
      <div className={`text-xl font-medium rounded-lg flex  ${isDarkMode ? 'text-blue-50' : 'text-neutral-950'}`}>{value}</div>
    </>
  );
};

export default Display;