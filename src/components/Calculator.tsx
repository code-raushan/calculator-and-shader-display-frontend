import Display from "./calculator/Display";
import Keypad from "./calculator/Keypad";

const Calculator = () => {
  return (
    <div className="w-full max-w-xs mx-auto mt-10 bg-gray-900 rounded-lg shadow-lg p-4">
      <Display value="0" />
      <Keypad onButtonClick={() => {}} />
    </div>
  );
};

export default Calculator;
