import { useEffect, useRef, type FC } from "react";

interface ShaderCanvasProps {
  vertexShaderCode: string;
  fragmentShaderCode: string;
  onCompileError: (msg: string) => void;
}

const ShaderCanvas: FC<ShaderCanvasProps> = ({
  vertexShaderCode,
  fragmentShaderCode,
  onCompileError,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    onCompileError("");
    if (!vertexShaderCode || !fragmentShaderCode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { antialias: true });
    if (!gl) {
      onCompileError("WebGL not supported");
      return;
    }

    const compileShader = (type: number, src: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) {
        onCompileError(
          `Failed to create ${
            type === gl.VERTEX_SHADER ? "vertex" : "fragment"
          } shader`
        );
        return null;
      }
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const errMsg = gl.getShaderInfoLog(shader) || "Unknown error";
        gl.deleteShader(shader);
        onCompileError(`Shader compilation failed: ${errMsg}`);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderCode);
    const fragmentShader = compileShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderCode
    );
    if (!vertexShader || !fragmentShader) {
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      onCompileError("Failed to create shader program");
      return;
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const errMsg = gl.getProgramInfoLog(program) || "Unknown error";
      gl.deleteProgram(program);
      onCompileError(`Shader program linking failed: ${errMsg}`);
      return;
    }
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionAttribLocation = gl.getAttribLocation(program, "a_position");
    if (positionAttribLocation === -1) {
      onCompileError("Attribute 'a_position' not found in vertex shader");
      return;
    }
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    let animationFrameId: number;
    const render = (time: number) => {
      time *= 0.001;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (resolutionLocation)
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
      if (timeLocation) gl.uniform1f(timeLocation, time);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, [vertexShaderCode, fragmentShaderCode, onCompileError]);

  return (
    <canvas
      ref={canvasRef}
      height={512}
      width={512}
      className="border border-stone-500 rounded-md bg-black"
    />
  );
};

export default ShaderCanvas;
