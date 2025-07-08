import { useState } from "react";
import ShaderCanvas from "./text-to-shader/ShaderCanvas";

const exampleVertexShader = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const exampleFragmentShader = `
precision mediump float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_resolution;
void main() {
  vec2 uv = v_uv;
  vec3 color = 0.5 + 0.5 * sin(u_time + uv.xyx + vec3(0,2,4));
  gl_FragColor = vec4(color, 1.0);
}`;

const TextToShader = () => {
  const [prompt, setPrompt] = useState("");
  const [vertexShaderCode, setVertexShaderCode] = useState("");
  const [fragmentShaderCode, setFragmentShaderCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateShader = async () => {
    setIsLoading(true);
    setError("");
    setVertexShaderCode("");
    setFragmentShaderCode("");
    try {
      const response = await fetch(
        "https://text-to-shader-backend.fly.dev/api/shader",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate shader");
      }
      const data = await response.json();
      setVertexShaderCode(data.vertex_shader_code);
      setFragmentShaderCode(data.fragment_shader_code);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const loadExampleShader = () => {
    setPrompt("Simple animated color shader");
    setVertexShaderCode(exampleVertexShader);
    setFragmentShaderCode(exampleFragmentShader);
    setError("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-cyan-400">Text-to-Shader</h2>
      <p className="text-stone-300">
        Describe a visual effect. Your prompt will be sent to an Elixir backend,
        which uses Groq and Llama-4-Scout model to generate shader code.
      </p>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow p-2 rounded bg-stone-800 text-white border border-stone-600 focus:ring-cyan-500 focus:border-cyan-500"
          placeholder="e.g., flowing lava, rotating cube..."
        />
        <button
          onClick={generateShader}
          disabled={isLoading}
          className="p-2 bg-cyan-500 text-white font-bold rounded hover:bg-cyan-400 disabled:bg-stone-500"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
        <button
          type="button"
          onClick={loadExampleShader}
          className="p-2 bg-stone-700 text-cyan-300 font-bold rounded hover:bg-stone-600 border border-cyan-700"
        >
          Load Example Shader
        </button>
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <div>
          <h3 className="font-bold mb-2">Result</h3>
          <ShaderCanvas
            vertexShaderCode={vertexShaderCode}
            fragmentShaderCode={fragmentShaderCode}
            onCompileError={setError}
          />
        </div>
        <div>
          <h3 className="font-bold mb-2">Generated GLSL Code</h3>
          {error && (
            <pre className="text-red-400 bg-red-900/50 p-2 rounded mb-2 whitespace-pre-wrap">
              {error}
            </pre>
          )}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="font-mono text-xs text-cyan-300 mb-1">
                Vertex Shader
              </div>
              <pre className="bg-stone-800 text-white p-2 rounded overflow-auto h-[256px] text-sm whitespace-pre-wrap">
                {vertexShaderCode ||
                  "// Vertex shader code will appear here..."}
              </pre>
            </div>
            <div className="flex-1">
              <div className="font-mono text-xs text-cyan-300 mb-1">
                Fragment Shader
              </div>
              <pre className="bg-stone-800 text-white p-2 rounded overflow-auto h-[256px] text-sm whitespace-pre-wrap">
                {fragmentShaderCode ||
                  "// Fragment shader code will appear here..."}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextToShader;
