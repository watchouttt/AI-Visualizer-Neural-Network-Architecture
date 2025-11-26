# AI Visualizer - Neural Network Architecture

<div align="center">
  
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-R164-black?style=for-the-badge&logo=three.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

**An interactive 3D educational platform for understanding Deep Learning architectures**

[Live Demo](#) | [Documentation](#documentation) | [Features](#features) | [Getting Started](#getting-started)

**By Nolan Cacheux**

</div>

---

## Project Overview

**AI Visualizer** is a comprehensive web application designed to demystify neural network architectures through interactive 3D visualization. From simple perceptrons to complex transformers, users can explore, configure, and understand the mathematical foundations of deep learning.

This project serves as:
- **An Educational Platform**: Learn deep learning concepts visually
- **A Laboratory**: Experiment with different architectures in real-time
- **A Code Generator**: See TensorFlow/Keras code update as you build
- **A Mathematical Reference**: Explore formulas with LaTeX rendering

## Features

### Interactive 3D Visualization
- **Real-time 3D rendering** of neural network architectures using React Three Fiber
- **Data flow animation** showing how information propagates through layers
- **Gradient visualization** for understanding backpropagation
- **Dynamic camera controls** - orbit, zoom, and pan

### Architecture Builder
- **Pre-built templates**: Perceptron, MLP, CNN, RNN/LSTM, Transformer, GAN, Autoencoder
- **Layer-by-layer construction**: Add Dense, Conv2D, MaxPool, Dropout, BatchNorm, LSTM, Attention
- **Real-time parameter adjustment**: Modify units, filters, activation functions
- **Drag-and-drop reordering**: Rearrange layers with ease

### Live Code Generation
```python
# Code updates automatically as you modify the architecture
model = models.Sequential([
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])
```

### Mathematical Foundations
- **LaTeX-rendered formulas** for every concept
- **Activation functions**: ReLU, Sigmoid, Softmax, ELU, Tanh
- **Loss functions**: Cross-Entropy, MSE
- **Optimizers**: Adam, SGD, Momentum

### Live Architecture Guide
Interactive bottom panel showing:
- Complete architecture diagrams for each neural network type
- Layer-by-layer explanations with roles and formulas
- AND/OR/XOR decision boundary visualizations
- Real-time step-by-step animation

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **React Three Fiber** | Declarative 3D graphics |
| **Three.js + Drei** | 3D rendering and helpers |
| **Zustand** | Global state management |
| **Framer Motion** | Smooth UI animations |
| **KaTeX** | Mathematical formula rendering |
| **Tailwind CSS** | Utility-first styling |

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/nolancacheux/AI-Visualizer-Neural-Network-Architecture.git

# Navigate to project directory
cd AI-Visualizer-Neural-Network-Architecture

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/
│   ├── 3d/                # Three.js components
│   │   ├── NeuronNode.tsx      # Individual neuron visualization
│   │   ├── NetworkConnection.tsx # Connection lines and data flow
│   │   └── NetworkVisualization.tsx # Main 3D scene
│   ├── ui/                # UI components
│   │   ├── LeftSidebar.tsx     # Architecture selector
│   │   ├── RightPanel.tsx      # Parameters and code panel
│   │   ├── LiveExampleBar.tsx  # Architecture guide
│   │   ├── CodeBlock.tsx       # Syntax-highlighted code
│   │   └── MathBlock.tsx       # LaTeX math rendering
│   └── NeuralNetworkVisualizer.tsx # Main orchestrator
├── data/
│   └── curriculum.ts      # All educational content
├── engine/
│   └── tensorflowSimulator.ts # Mock TF calculations
└── store/
    └── networkStore.ts    # Zustand global state
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + 1` | Toggle left sidebar |
| `Cmd/Ctrl + 2` | Toggle right panel |
| `Cmd/Ctrl + D` | Toggle data flow |
| `Cmd/Ctrl + W` | Toggle weights |
| `Cmd/Ctrl + G` | Toggle gradients |

## Documentation

### Adding New Layer Types

1. Add layer definition in `src/data/curriculum.ts`:
```typescript
export const layers: LayerDefinition[] = [
  {
    id: 'new-layer',
    name: 'NewLayer',
    type: 'new-layer',
    description: 'Description here',
    parameters: [...],
    // ...
  }
];
```

2. Update store in `src/store/networkStore.ts`
3. Add visualization in `src/components/3d/NetworkVisualization.tsx`

### Adding Educational Content

All curriculum content is centralized in `src/data/curriculum.ts`:

```typescript
export const activationFunctions: ConceptDefinition[] = [
  {
    id: 'your-concept',
    name: 'Concept Name',
    formulas: [{
      latex: '\\frac{1}{1+e^{-x}}',
      description: 'Formula description'
    }],
    // ...
  }
];
```

## Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#0f1117` | Main background |
| Surface | `#1a1d27` | Cards and panels |
| Primary | `#3b82f6` | Primary accent |
| Secondary | `#8b5cf6` | Secondary accent |
| Success | `#22c55e` | Success states |
| Warning | `#f59e0b` | Warning states |
| Error | `#ef4444` | Error states |

### Typography

- **Display**: Orbitron (headers)
- **Body**: Exo 2 (content)
- **Mono**: JetBrains Mono (code)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by TensorFlow Playground and NN-SVG
- Educational content based on Deep Learning fundamentals
- 3D visualization powered by the Three.js ecosystem

---

<div align="center">

**Built by Nolan Cacheux**

*ML Engineer Portfolio Project - Full Stack + Deep Learning*

[GitHub](https://github.com/nolancacheux)

</div>

