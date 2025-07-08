import { useState } from "react";
import Calculator from "./components/Calculator";
import ShaderDisplay from "./components/Text-To-Shader";

const TABS = [
  { label: "Calculator", key: "calculator" },
  { label: "Text-to-Shader", key: "textToShader" },
];

export default function App() {
  const [selectedTab, setSelectedTab] = useState("calculator");

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-900">
      <div className="flex justify-center w-full pt-8 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={`px-8 py-2 rounded-lg border-2 mx-2 transition-colors duration-200 focus:outline-none ${
              selectedTab === tab.key
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-300 bg-white text-white hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Main content centered below tabs */}
      <div className="flex-1 flex justify-center items-start">
        <div className="max-w-md w-full">
          {selectedTab === "calculator" && <Calculator />}
          {selectedTab === "textToShader" && <ShaderDisplay />}
        </div>
      </div>
    </div>
  );
}
