import type { FC } from "react";

interface ButtonProps {
  label: string;
  onClick: (value: string) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={() => onClick(label)} className={`h-10 px-4 rounded`}>
      {label}
    </button>
  );
};

interface KeypadProps {
  onButtonClick: (value: string) => void;
}

const Keypad: FC<KeypadProps> = ({ onButtonClick }) => {
  const buttons = [
    "C",
    "+/-",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];
  return (
    <div className="grid grid-cols-4 gap-3">
      {buttons.map((label) => {
        const isOperator = ["/", "*", "-", "+", "="].includes(label);
        const isFunction = ["C", "+/-", "%"].includes(label);

        let colorClass = "bg-stone-700 hover:bg-stone-600";
        if (isOperator) colorClass = "bg-amber-500 hover:bg-amber-400";
        if (isFunction) colorClass = "bg-stone-500 hover:bg-stone-400";

        return (
          <Button
            key={label}
            label={label}
            onClick={onButtonClick}
            className={`
              ${colorClass}
            `}
          />
        );
      })}
    </div>
  );
};

export default Keypad;
