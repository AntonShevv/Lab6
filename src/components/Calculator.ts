import { useState } from 'react';
import { ButtonValue } from './Button';

function useCalculator() {
  const [state, setState] = useState({
    currentValue: '0',
    previousValue: '',
    operation: null as ButtonValue | null,
    overwrite: false,
    history: [] as string[],
    hasError: false,
  });

  const resetError = () => {
    if (state.hasError) {
      setState(prev => ({
        ...prev,
        currentValue: '0',
        hasError: false,
      }));
    }
  };

  const handleInput = (value: ButtonValue) => {
    if (state.hasError) resetError();

    if (value === 'C') {
      setState({
        currentValue: '0',
        previousValue: '',
        operation: null,
        overwrite: false,
        history: [],
        hasError: false,
      });
      return;
    }

    if (value === '⌫') {
      setState(prev => ({
        ...prev,
        currentValue:
          prev.currentValue.length === 1 || prev.hasError
            ? '0'
            : prev.currentValue.slice(0, -1),
        hasError: false,
      }));
      return;
    }

    if (/[0-9]/.test(value)) {
      setState(prev => {
        const shouldOverwrite = prev.overwrite || prev.currentValue === '0' || prev.hasError;
        return {
          ...prev,
          currentValue: shouldOverwrite ? value : prev.currentValue + value,
          overwrite: false,
          hasError: false,
        };
      });
      return;
    }

    if (value === '.') {
      setState(prev => ({
        ...prev,
        currentValue: prev.currentValue.includes('.') ? prev.currentValue : prev.currentValue + '.',
        overwrite: false,
        hasError: false,
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
          hasError: false,
        };
      });
      return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
      setState(prev => ({
        ...prev,
        previousValue: prev.currentValue,
        operation: value,
        overwrite: true,
        hasError: false,
      }));
      return;
    }
  };

  const calculate = () => {
    setState(prev => {
      const current = parseFloat(prev.currentValue);
      const previous = parseFloat(prev.previousValue);

      if (isNaN(current) || isNaN(previous)) {
        return {
          ...prev,
          currentValue: 'Некорректные числа',
          hasError: true,
          overwrite: false,
        };
      }

      if (prev.operation === '/' && current === 0) {
        return {
          ...prev,
          currentValue: 'Деление на ноль',
          hasError: true,
          overwrite: false,
        };
      }

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
        hasError: false,
        history: [
          ...prev.history,
          `${prev.previousValue} ${prev.operation} ${prev.currentValue} = ${result}`,
        ],
      };
    });

    setTimeout(() => {
      setState(prev => {
        if (prev.hasError) {
          return {
            ...prev,
            currentValue: '0',
            hasError: false,
          };
        }
        return prev;
      });
    }, 2000);
  };

  return {
    state,
    handleInput,
    calculate,
  };
}

export default useCalculator;
