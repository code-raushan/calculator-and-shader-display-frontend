import init, { Calculator as CalculatorWasm } from "calculator";
import { useEffect, useRef, useState } from "react";
import Display from "./calculator/Display";
import Keypad from "./calculator/Keypad";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState<string>("0");
  const calculator = useRef<CalculatorWasm | null>(null);

  useEffect(() => {
    init().then(() => {
      calculator.current = CalculatorWasm.new();
      setDisplayValue(calculator.current.get_current_display());
    });
  }, []);

  const handleButtonClick = (value: string) => {
    if (calculator.current) {
      calculator.current.handle_button(value);
      setDisplayValue(calculator.current.get_current_display());
    }
  };
  return (
    <div className="w-full max-w-xs mx-auto mt-10 bg-gray-900 rounded-lg shadow-lg p-4">
      <Display value={displayValue} />
      <Keypad onButtonClick={handleButtonClick} />
    </div>
  );
};

export default Calculator;
