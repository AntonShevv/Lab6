export type Operation = '+' | '-' | '*' | '/' | '=' | 'C' | '⌫';

export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: Operation | null;
  overwrite: boolean;
  history: string[];
}

export type ButtonValue = number | Operation | '.' | '±';