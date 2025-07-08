# Calculator and Shader Display Frontend

A React-based frontend application featuring a Rust WebAssembly calculator and a WebGL shader renderer with AI-powered shader generation.

## Features

### 🧮 Calculator (Rust WASM)
- **Rust WebAssembly Integration**: High-performance mathematical operations

### 🎨 Text-to-Shader (WebGL + AI)
- **AI-Powered Shader Generation**: Uses Groq and Llama-4-Scout to generate GLSL shaders from text descriptions with shader code served from `Elixir/Phoenix Backend`.
-

## Project Structure

```
calculator-and-shader-display-frontend/
├── calculator/                    # Rust WASM Calculator
│   ├── Cargo.toml                # Rust dependencies
│   ├── Cargo.lock                # Locked dependencies
│   ├── pkg/                      # Compiled WASM output
│   └── src/
│       └── lib.rs                # Rust calculator logic
├── src/
│   ├── components/
│   │   ├── calculator/           # Calculator UI Components
│   │   │   ├── Display.tsx       # Calculator display
│   │   │   └── Keypad.tsx        # Calculator buttons
│   │   ├── Calculator.tsx        # Main calculator component
│   │   ├── text-to-shader/       # Shader Components
│   │   │   └── ShaderCanvas.tsx  # WebGL shader renderer
│   │   └── Text-To-Shader.tsx    # Main shader component
│   ├── App.tsx                   # Main application component
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── package.json                  # Node.js dependencies
├── vite.config.ts               # Vite configuration
└── tsconfig.json                # TypeScript configuration
```

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **WebGL** for shader rendering

### Backend Integration
- **Elixir** backend for shader generation
- **Groq API** for AI-powered code generation
- **Llama-4-Scout** model for GLSL shader creation

### Rust WASM
- **Rust** for high-performance calculator logic
- **wasm-pack** for WebAssembly compilation
- **wasm-bindgen** for JavaScript interop

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/code-raushan/calculator-and-shader-display-frontend.git
   cd calculator-and-shader-display-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Build Rust WASM calculator**
   ```bash
   cd calculator
   wasm-pack build --target web
   cd ..
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

### Building for Production

```bash
# Build Rust WASM
cd calculator && wasm-pack build --target web --release && cd ..

# Build frontend
pnpm build
```

## Usage

### Calculator
- Use the calculator interface for mathematical operations
- All calculations are performed by Rust WASM for optimal performance
- Supports standard arithmetic and scientific functions

### Text-to-Shader
1. **Enter a description** of the visual effect you want (e.g., "flowing lava", "rotating cube")
2. **Click "Generate"** to send the prompt to the AI backend
3. **View the result** in the WebGL canvas
4. **Examine the code** in the separate vertex and fragment shader panels
5. **Test with examples** using the "Load Example Shader" button

## API Endpoints

### Shader Generation
- **POST** `/api/shader`
- **Body**: `{ "prompt": "your shader description" }`
- **Response**: 
  ```json
  {
    "vertex_shader_code": "...",
    "fragment_shader_code": "..."
  }
  ```

  Live Deployment at [Fly.io]("https://calculator-and-shader-display-frontend.fly.dev/)