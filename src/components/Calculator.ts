import { useState } from 'react';
import  { ButtonValue } from './Button';

function useCalculator() {
  const [state, setState] = useState({
    currentValue: '0',
    previousValue: '',
    operation: null as ButtonValue | null,
    overwrite: false,
    history: [] as string[],
  });

  const handleInput = (value: ButtonValue) => {
    if (value === 'C') {
      setState(prev => ({
        ...prev,
        currentValue: '0',
        previousValue: '',
        operation: null,
        overwrite: false,
        history: [],
      }));
      return;
    }

    if (value === '⌫') {
      setState(prev => ({
        ...prev,
        currentValue:
          prev.currentValue.length === 1
            ? '0'
            : prev.currentValue.substring(0, prev.currentValue.length - 1),
      }));
      return;
    }

    if (/[0-9]/.test(value)) {
      setState(prev => {
        const shouldOverwrite = prev.overwrite || prev.currentValue === '0';
        return {
          ...prev,
          currentValue: shouldOverwrite ? value : prev.currentValue + value,
          overwrite: false,
        };
      });
      return;
    }

    if (value === '.') {
      setState(prev => ({
        ...prev,
        currentValue: prev.currentValue.includes('.') ? prev.currentValue : prev.currentValue + '.',
        overwrite: false,
      }));
      return;
    }

    if (value === '±') {
      setState(prev => {
        const newValue = prev.currentValue.startsWith('-')
          ? prev.currentValue.slice(1)
          : '-' + prev.currentValue;
    
        return {
          ...prev,
          currentValue: newValue,
        };
      });
      return;
    }
    
    if (value === '+') {
      setState(prev => ({
        ...prev,
        previousValue: prev.currentValue,
        operation: '+',
        overwrite: true,
      }));
      return;
    }

    if (value === '-') {
      setState(prev => ({
        ...prev,
        previousValue: prev.currentValue,
        operation: '-',
        overwrite: true,
      }));
      return;
    }

    if (value === '*') {
      setState(prev => ({
        ...prev,
        previousValue: prev.currentValue,
        operation: '*',
        overwrite: true,
      }));
      return;
    }

    if (value === '/') {
      setState(prev => ({
        ...prev,
        previousValue: prev.currentValue,
        operation: '/',
        overwrite: true,
      }));
      return;
    }


  };

  const calculate = () => {
    try {
      setState(prev => {
        const current = parseFloat(prev.currentValue);
        const previous = parseFloat(prev.previousValue);

        let result = 0;

        switch (prev.operation) {
          case '+':
            result = previous + current;
            break;
          case '-':
            result = previous - current;
            break;
          case '*':
            result = previous * current;
            break;
          case '/':
            if(current === 0) {
              throw new Error("Деление на ноль");
            }
            result = previous / current;
            break;
          default:
            return prev;
        }


        return {
          ...prev,
          currentValue: String(result),
          previousValue: '',
          operation: null,
          overwrite: true,
          history: [...prev.history, `${prev.previousValue} ${prev.operation} ${prev.currentValue} = ${result}`],
        };
      });
    }
    catch (Error) {
      setTimeout(() => setState(prev => ({
        ...prev,
        currentValue: "Введены некорректные данные"
      })),2000)

    }

  };


  return {
    state,
    handleInput,
    calculate
  };
}

export default useCalculator;
