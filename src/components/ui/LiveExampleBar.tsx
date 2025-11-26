'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNetworkStore, ArchitectureType } from '@/store/networkStore';

// XOR Visualization with proper axes
function XORVisualization({ step }: { step: number }) {
  const points = [
    { x: 0, y: 0, label: 0, expected: 0 },
    { x: 1, y: 0, label: 1, expected: 1 },
    { x: 0, y: 1, label: 1, expected: 1 },
    { x: 1, y: 1, label: 0, expected: 0 },
  ];
  
  return (
    <div className="flex items-center gap-6">
      {/* XOR Plot with Axes */}
      <div className="relative">
        {/* Y Axis Label */}
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-[var(--text-muted)]">
          x₂
        </div>
        {/* X Axis Label */}
        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-xs text-[var(--text-muted)]">
          x₁
        </div>
        
        <div className="relative w-32 h-32 border-l-2 border-b-2 border-[var(--text-muted)]">
          {/* Grid lines */}
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border-color)]" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--border-color)]" />
          </div>
          
          {/* Axis ticks */}
          <div className="absolute -bottom-4 left-0 text-xs text-[var(--text-muted)]">0</div>
          <div className="absolute -bottom-4 right-0 text-xs text-[var(--text-muted)]">1</div>
          <div className="absolute -left-4 bottom-0 text-xs text-[var(--text-muted)]">0</div>
          <div className="absolute -left-4 top-0 text-xs text-[var(--text-muted)]">1</div>
          
          {/* Decision boundary curve (for MLP solution) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <path 
              d="M 5 95 Q 50 50 95 95" 
              stroke="rgba(59, 130, 246, 0.5)" 
              strokeWidth="2" 
              fill="none"
              strokeDasharray={step >= 3 ? "0" : "5 5"}
              opacity={step >= 2 ? 0.8 : 0.2}
            />
            <path 
              d="M 5 5 Q 50 50 95 5" 
              stroke="rgba(59, 130, 246, 0.5)" 
              strokeWidth="2" 
              fill="none"
              strokeDasharray={step >= 3 ? "0" : "5 5"}
              opacity={step >= 2 ? 0.8 : 0.2}
            />
          </svg>
          
          {/* Data points */}
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ 
                scale: step >= 1 ? 1 : 0,
                backgroundColor: p.expected === 1 ? '#22c55e' : '#ef4444'
              }}
              transition={{ delay: i * 0.1 }}
              className="absolute w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
              style={{ 
                left: `${p.x * 80 + 10}%`, 
                top: `${(1 - p.y) * 80 + 10}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {p.label}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* XOR Truth Table */}
      <div className="text-xs space-y-1">
        <div className="font-semibold text-[var(--text-primary)] mb-2">XOR Truth Table</div>
        <table className="border-collapse">
          <thead>
            <tr className="text-[var(--text-muted)]">
              <th className="px-2 py-1 border-b border-[var(--border-color)]">x₁</th>
              <th className="px-2 py-1 border-b border-[var(--border-color)]">x₂</th>
              <th className="px-2 py-1 border-b border-[var(--border-color)]">y</th>
            </tr>
          </thead>
          <tbody className="text-[var(--text-secondary)]">
            {points.map((p, i) => (
              <tr key={i} className={step === i + 1 ? 'bg-blue-500/20' : ''}>
                <td className="px-2 py-1 text-center">{p.x}</td>
                <td className="px-2 py-1 text-center">{p.y}</td>
                <td className={`px-2 py-1 text-center font-bold ${p.expected === 1 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {p.expected}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Explanation */}
      <div className="text-xs text-[var(--text-secondary)] max-w-[200px]">
        <div className="font-semibold text-[var(--text-primary)] mb-1">Why XOR is special:</div>
        <p>XOR cannot be solved by a single perceptron (linear boundary). 
        It requires a <span className="text-blue-400">hidden layer</span> to create 
        non-linear decision boundaries.</p>
      </div>
    </div>
  );
}

// MNIST Visualization
function MNISTVisualization({ step }: { step: number }) {
  const digit = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,1,0,0,0,0],
    [0,0,0,0,0,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,1,1,1,0,0,1,1,0,0,0],
    [0,0,0,0,1,1,0,0,0,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0,0],
    [0,0,0,0,0,0,1,1,1,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  ];
  
  const stages = [
    { name: 'Input', desc: '28×28 grayscale' },
    { name: 'Conv1', desc: '32 filters, 3×3' },
    { name: 'Pool1', desc: '14×14' },
    { name: 'Conv2', desc: '64 filters' },
    { name: 'Dense', desc: '128 neurons' },
    { name: 'Output', desc: 'Softmax 10' },
  ];
  
  const predictions = [0.01, 0.02, 0.94, 0.01, 0.00, 0.00, 0.01, 0.00, 0.01, 0.00];
  
  return (
    <div className="flex items-center gap-4">
      {/* Input digit */}
      <div className="text-center">
        <div className="text-xs text-[var(--text-muted)] mb-1">Input</div>
        <motion.div 
          className="p-1 bg-black rounded" 
          style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: '1px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 0 ? 1 : 0.3 }}
        >
          {digit.flat().map((pixel, i) => (
            <div 
              key={i}
              className="w-1.5 h-1.5 rounded-sm"
              style={{ backgroundColor: pixel ? '#fff' : '#1a1a1a' }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Processing stages */}
      <div className="flex items-center gap-2">
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center">
            <motion.div 
              className={`p-2 rounded text-center min-w-[60px] ${
                step >= i + 1 ? 'bg-blue-500/30 border border-blue-500/50' : 'bg-[var(--bg-tertiary)] border border-[var(--border-color)]'
              }`}
              animate={{ scale: step === i + 1 ? 1.1 : 1 }}
            >
              <div className="text-xs font-medium text-[var(--text-primary)]">{stage.name}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{stage.desc}</div>
            </motion.div>
            {i < stages.length - 1 && (
              <motion.svg 
                className="w-4 h-4 text-[var(--text-muted)] mx-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ opacity: step >= i + 1 ? 1 : 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            )}
          </div>
        ))}
      </div>
      
      {/* Output probabilities */}
      <motion.div 
        className="text-center"
        animate={{ opacity: step >= 5 ? 1 : 0.3 }}
      >
        <div className="text-xs text-[var(--text-muted)] mb-1">Prediction</div>
        <div className="flex gap-px h-12">
          {predictions.map((p, i) => (
            <div key={i} className="flex flex-col items-center justify-end w-4">
              <motion.div 
                className={`w-3 rounded-t ${i === 2 ? 'bg-emerald-500' : 'bg-[var(--text-muted)]'}`}
                initial={{ height: 0 }}
                animate={{ height: step >= 5 ? `${p * 40}px` : 0 }}
                transition={{ delay: i * 0.05 }}
              />
              <div className="text-[8px] text-[var(--text-muted)]">{i}</div>
            </div>
          ))}
        </div>
        <div className="text-lg font-bold text-emerald-400 mt-1">2</div>
      </motion.div>
    </div>
  );
}

// Transformer Attention Visualization
function TransformerVisualization({ step }: { step: number }) {
  const words = ['The', 'cat', 'sat', 'on', 'the', 'mat'];
  const attentionMatrix = [
    [0.1, 0.4, 0.1, 0.1, 0.2, 0.1],
    [0.2, 0.1, 0.5, 0.1, 0.05, 0.05],
    [0.1, 0.4, 0.1, 0.2, 0.1, 0.1],
    [0.1, 0.1, 0.3, 0.1, 0.2, 0.2],
    [0.4, 0.1, 0.1, 0.1, 0.1, 0.2],
    [0.1, 0.2, 0.2, 0.3, 0.1, 0.1],
  ];
  
  const highlightedWord = step % words.length;
  
  return (
    <div className="flex items-center gap-6">
      {/* Input sentence */}
      <div>
        <div className="text-xs text-[var(--text-muted)] mb-2">Input Sentence</div>
        <div className="flex gap-1">
          {words.map((word, i) => (
            <motion.span 
              key={i}
              className={`px-2 py-1 text-sm rounded ${
                i === highlightedWord 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
              }`}
              animate={{ scale: i === highlightedWord ? 1.1 : 1 }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
      
      {/* Attention Matrix */}
      <div>
        <div className="text-xs text-[var(--text-muted)] mb-2">Self-Attention Weights</div>
        <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${words.length}, 1fr)` }}>
          {/* Column headers */}
          {words.map((w, i) => (
            <div key={`h-${i}`} className="text-[8px] text-[var(--text-muted)] text-center pb-1">
              {w.slice(0, 3)}
            </div>
          ))}
          
          {/* Matrix cells */}
          {attentionMatrix.map((row, i) => 
            row.map((weight, j) => (
              <motion.div 
                key={`${i}-${j}`}
                className="w-5 h-5 rounded-sm"
                style={{ backgroundColor: `rgba(59, 130, 246, ${weight})` }}
                animate={{ 
                  scale: (i === highlightedWord || j === highlightedWord) ? 1.1 : 1,
                  borderColor: (i === highlightedWord || j === highlightedWord) ? 'rgba(59, 130, 246, 0.8)' : 'transparent'
                }}
              />
            ))
          )}
        </div>
        <div className="text-[10px] text-[var(--text-muted)] mt-1 text-center">
          Brighter = stronger attention
        </div>
      </div>
      
      {/* Explanation */}
      <div className="text-xs text-[var(--text-secondary)] max-w-[180px]">
        <div className="font-semibold text-[var(--text-primary)] mb-1">Self-Attention:</div>
        <p>Each word attends to all other words. 
        <span className="text-blue-400"> "cat"</span> strongly attends to 
        <span className="text-blue-400"> "sat"</span> because they're semantically related.</p>
      </div>
    </div>
  );
}

// GAN Visualization
function GANVisualization({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-4">
      {/* Noise input */}
      <div className="text-center">
        <div className="text-xs text-[var(--text-muted)] mb-1">Random Noise</div>
        <div className="w-16 h-16 rounded overflow-hidden grid grid-cols-8 gap-px bg-[var(--bg-tertiary)]">
          {Array.from({ length: 64 }).map((_, i) => (
            <div 
              key={i}
              className="bg-[var(--text-muted)]"
              style={{ opacity: Math.random() }}
            />
          ))}
        </div>
      </div>
      
      <svg className="w-6 h-6 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
      
      {/* Generator */}
      <motion.div 
        className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-center"
        animate={{ scale: step === 1 ? 1.1 : 1 }}
      >
        <div className="text-sm font-medium text-emerald-400">Generator</div>
        <div className="text-[10px] text-[var(--text-muted)]">Creates fake images</div>
      </motion.div>
      
      <svg className="w-6 h-6 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
      
      {/* Generated image */}
      <motion.div 
        className="text-center"
        animate={{ opacity: step >= 2 ? 1 : 0.3 }}
      >
        <div className="text-xs text-[var(--text-muted)] mb-1">Generated</div>
        <div className="w-16 h-16 rounded bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          <span className="text-2xl">🎨</span>
        </div>
      </motion.div>
      
      <svg className="w-6 h-6 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
      
      {/* Discriminator */}
      <motion.div 
        className="p-3 rounded-lg bg-amber-500/20 border border-amber-500/50 text-center"
        animate={{ scale: step === 3 ? 1.1 : 1 }}
      >
        <div className="text-sm font-medium text-amber-400">Discriminator</div>
        <div className="text-[10px] text-[var(--text-muted)]">Real or Fake?</div>
      </motion.div>
      
      <svg className="w-6 h-6 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
      
      {/* Output */}
      <motion.div 
        className="text-center"
        animate={{ opacity: step >= 4 ? 1 : 0.3 }}
      >
        <div className="text-xs text-[var(--text-muted)] mb-1">Verdict</div>
        <div className={`px-3 py-2 rounded font-bold ${step >= 4 && step % 2 === 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
          {step >= 4 && step % 2 === 0 ? 'Real!' : 'Fake!'}
        </div>
      </motion.div>
    </div>
  );
}

export default function LiveExampleBar() {
  const { currentArchitecture, training, visualization } = useNetworkStore();
  const [step, setStep] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Auto-advance animation
  useEffect(() => {
    if (training.isTraining || visualization.showDataFlow) {
      const timer = setInterval(() => {
        setStep(s => (s + 1) % 6);
      }, 1500 / visualization.animationSpeed);
      return () => clearInterval(timer);
    }
  }, [training.isTraining, visualization.showDataFlow, visualization.animationSpeed]);
  
  const getVisualization = () => {
    switch (currentArchitecture) {
      case 'perceptron':
      case 'mlp':
        return <XORVisualization step={step} />;
      case 'cnn':
        return <MNISTVisualization step={step} />;
      case 'transformer':
        return <TransformerVisualization step={step} />;
      case 'gan':
        return <GANVisualization step={step} />;
      default:
        return <XORVisualization step={step} />;
    }
  };
  
  const getTitle = () => {
    switch (currentArchitecture) {
      case 'perceptron':
        return 'XOR Problem - Why Perceptrons Need Hidden Layers';
      case 'mlp':
        return 'XOR Classification with MLP';
      case 'cnn':
        return 'MNIST Digit Recognition Pipeline';
      case 'transformer':
        return 'Self-Attention Mechanism';
      case 'gan':
        return 'Generator vs Discriminator';
      default:
        return 'Live Example';
    }
  };
  
  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-30"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-2 rounded-t-lg bg-[var(--bg-secondary)] border border-b-0 border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm flex items-center gap-2"
      >
        <span>Live Example</span>
        <motion.svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </motion.svg>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass-strong border-t border-[var(--border-color)] overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  {getTitle()}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--text-muted)]">Step {step + 1}/6</span>
                  <button
                    onClick={() => setStep(s => (s + 1) % 6)}
                    className="px-2 py-1 text-xs rounded bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)]"
                  >
                    Next →
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                {getVisualization()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

