export type ButtonValue = 
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  | '+' | '-' | '*' | '/' | '%'
  | '=' | 'C' | '⌫' | '.' | '±';

interface ButtonProps {
  value: ButtonValue;
  onClick: (value: ButtonValue) => void;
  className?: string;
}

function Button({ value, onClick, className }:ButtonProps){
  return (
    <button
      onClick={() => onClick(value)}
      className={`${className} focus:outline-none focus:ring-2 focus:ring-opacity-50`}
    >
      {value}
    </button>
  );
};

export default Button;
