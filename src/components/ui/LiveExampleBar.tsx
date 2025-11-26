'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNetworkStore, ArchitectureType } from '@/store/networkStore';

// Layer explanation component
function LayerExplanation({ name, role, formula, color }: { name: string; role: string; formula?: string; color: string }) {
  return (
    <div className={`p-2 rounded border-l-2 ${color} bg-[var(--bg-tertiary)] text-[10px]`}>
      <div className="font-semibold text-[var(--text-primary)]">{name}</div>
      <div className="text-[var(--text-secondary)] leading-relaxed">{role}</div>
      {formula && <div className="font-mono text-blue-400 mt-0.5">{formula}</div>}
    </div>
  );
}

// Coordinate System Component
function CoordinateSystem({ children, width = 120, height = 120, showGrid = true }: { children: React.ReactNode; width?: number; height?: number; showGrid?: boolean }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      {/* Grid */}
      {showGrid && (
        <g stroke="rgba(255,255,255,0.1)" strokeWidth="0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`h${i}`} x1="20" y1={20 + i * 20} x2={width - 10} y2={20 + i * 20} />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={`v${i}`} x1={20 + i * 20} y1="10" x2={20 + i * 20} y2={height - 20} />
          ))}
        </g>
      )}
      {/* Axes */}
      <line x1="20" y1={height - 20} x2={width - 10} y2={height - 20} stroke="white" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="20" y1={height - 20} x2="20" y2="10" stroke="white" strokeWidth="1.5" markerEnd="url(#arrow)" />
      {/* Labels */}
      <text x={width - 15} y={height - 5} fill="white" fontSize="10" fontWeight="bold">x1</text>
      <text x="5" y="15" fill="white" fontSize="10" fontWeight="bold">x2</text>
      <text x="12" y={height - 5} fill="rgba(255,255,255,0.5)" fontSize="8">0</text>
      {/* Arrow marker */}
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="white" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

// Perceptron Full Visualization with AND/OR
function PerceptronVisualization({ step }: { step: number }) {
  return (
    <div className="flex gap-6">
      {/* Architecture Diagram */}
      <div className="flex-shrink-0">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Perceptron Architecture</div>
        <div className="flex items-center gap-6">
          {/* Input nodes */}
          <div className="flex flex-col gap-3 items-center">
            <div className="text-[9px] text-[var(--text-muted)]">Inputs</div>
            {['x1', 'x2', '1'].map((label, i) => (
              <motion.div
                key={label}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-bold border-2 ${
                  i === 2 ? 'bg-gray-700 border-gray-500 text-gray-300' : 'bg-blue-600 border-blue-400 text-white'
                }`}
                animate={{ scale: step === i + 1 ? 1.15 : 1, boxShadow: step === i + 1 ? '0 0 15px rgba(59,130,246,0.5)' : 'none' }}
              >
                {label === '1' ? 'b' : label}
              </motion.div>
            ))}
          </div>
          
          {/* Weights */}
          <div className="flex flex-col items-center">
            <svg className="w-20 h-28" viewBox="0 0 80 110">
              <line x1="0" y1="20" x2="80" y2="55" stroke="rgba(245,158,11,0.6)" strokeWidth="2" />
              <line x1="0" y1="55" x2="80" y2="55" stroke="rgba(245,158,11,0.6)" strokeWidth="2" />
              <line x1="0" y1="90" x2="80" y2="55" stroke="rgba(245,158,11,0.6)" strokeWidth="2" />
              <text x="30" y="30" fill="#f59e0b" fontSize="9" fontWeight="bold">w1</text>
              <text x="30" y="50" fill="#f59e0b" fontSize="9" fontWeight="bold">w2</text>
              <text x="30" y="85" fill="#9ca3af" fontSize="9">bias</text>
            </svg>
          </div>
          
          {/* Sum */}
          <motion.div 
            className="flex flex-col items-center"
            animate={{ scale: step === 4 ? 1.15 : 1 }}
          >
            <div className="text-[9px] text-[var(--text-muted)]">Weighted Sum</div>
            <div className="w-14 h-14 rounded-lg bg-amber-600/30 border-2 border-amber-500 flex flex-col items-center justify-center">
              <span className="text-amber-400 text-lg font-bold">E</span>
              <span className="text-[8px] text-amber-300">w*x + b</span>
            </div>
          </motion.div>
          
          {/* Activation */}
          <motion.div 
            className="flex flex-col items-center"
            animate={{ scale: step === 5 ? 1.15 : 1 }}
          >
            <div className="text-[9px] text-[var(--text-muted)]">Activation</div>
            <div className="w-14 h-14 rounded-lg bg-purple-600/30 border-2 border-purple-500 flex flex-col items-center justify-center">
              <span className="text-purple-400 text-sm font-bold">Step</span>
              <span className="text-[8px] text-purple-300">Heaviside</span>
            </div>
          </motion.div>
          
          {/* Output */}
          <motion.div 
            className="flex flex-col items-center"
            animate={{ scale: step === 6 ? 1.15 : 1 }}
          >
            <div className="text-[9px] text-[var(--text-muted)]">Output</div>
            <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-emerald-400 flex items-center justify-center text-white font-bold">
              y
            </div>
            <div className="text-[8px] text-emerald-400 mt-1">0 or 1</div>
          </motion.div>
        </div>
        
        {/* Formula */}
        <div className="mt-3 p-2 rounded bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
          <div className="text-[10px] text-[var(--text-muted)]">Mathematical Formula:</div>
          <div className="text-[11px] font-mono text-blue-400">y = step(w1*x1 + w2*x2 + b)</div>
          <div className="text-[10px] font-mono text-purple-400 mt-1">step(z) = 1 if z &gt;= 0, else 0</div>
        </div>
      </div>
      
      {/* AND Gate Example */}
      <div className="flex-shrink-0">
        <div className="text-[11px] text-emerald-400 mb-2 font-semibold">AND Gate (Solvable)</div>
        <CoordinateSystem width={100} height={100}>
          {/* Decision boundary: x1 + x2 = 1.5 */}
          <line x1="20" y1="25" x2="95" y2="80" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" />
          {/* Points */}
          <circle cx="30" cy="70" r="8" fill="#ef4444" stroke="white" strokeWidth="1" /> {/* (0,0)=0 */}
          <circle cx="85" cy="70" r="8" fill="#ef4444" stroke="white" strokeWidth="1" /> {/* (1,0)=0 */}
          <circle cx="30" cy="25" r="8" fill="#ef4444" stroke="white" strokeWidth="1" /> {/* (0,1)=0 */}
          <circle cx="85" cy="25" r="8" fill="#22c55e" stroke="white" strokeWidth="1" /> {/* (1,1)=1 */}
          {/* Labels */}
          <text x="27" y="73" fill="white" fontSize="8" fontWeight="bold">0</text>
          <text x="82" y="73" fill="white" fontSize="8" fontWeight="bold">0</text>
          <text x="27" y="28" fill="white" fontSize="8" fontWeight="bold">0</text>
          <text x="82" y="28" fill="white" fontSize="8" fontWeight="bold">1</text>
        </CoordinateSystem>
        <div className="text-[9px] text-[var(--text-secondary)] mt-1">
          Output 1 only when BOTH inputs are 1
        </div>
        <div className="text-[8px] font-mono text-emerald-400 mt-1">w1=1, w2=1, b=-1.5</div>
      </div>
      
      {/* OR Gate Example */}
      <div className="flex-shrink-0">
        <div className="text-[11px] text-emerald-400 mb-2 font-semibold">OR Gate (Solvable)</div>
        <CoordinateSystem width={100} height={100}>
          {/* Decision boundary: x1 + x2 = 0.5 */}
          <line x1="20" y1="65" x2="65" y2="20" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" />
          {/* Points */}
          <circle cx="30" cy="70" r="8" fill="#ef4444" stroke="white" strokeWidth="1" /> {/* (0,0)=0 */}
          <circle cx="85" cy="70" r="8" fill="#22c55e" stroke="white" strokeWidth="1" /> {/* (1,0)=1 */}
          <circle cx="30" cy="25" r="8" fill="#22c55e" stroke="white" strokeWidth="1" /> {/* (0,1)=1 */}
          <circle cx="85" cy="25" r="8" fill="#22c55e" stroke="white" strokeWidth="1" /> {/* (1,1)=1 */}
          {/* Labels */}
          <text x="27" y="73" fill="white" fontSize="8" fontWeight="bold">0</text>
          <text x="82" y="73" fill="white" fontSize="8" fontWeight="bold">1</text>
          <text x="27" y="28" fill="white" fontSize="8" fontWeight="bold">1</text>
          <text x="82" y="28" fill="white" fontSize="8" fontWeight="bold">1</text>
        </CoordinateSystem>
        <div className="text-[9px] text-[var(--text-secondary)] mt-1">
          Output 1 when ANY input is 1
        </div>
        <div className="text-[8px] font-mono text-emerald-400 mt-1">w1=1, w2=1, b=-0.5</div>
      </div>
      
      {/* XOR Problem */}
      <div className="flex-shrink-0">
        <div className="text-[11px] text-red-400 mb-2 font-semibold">XOR (NOT Solvable)</div>
        <CoordinateSystem width={100} height={100}>
          {/* No single line can separate! */}
          <line x1="20" y1="20" x2="95" y2="80" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" opacity="0.3" />
          <line x1="20" y1="80" x2="95" y2="20" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" opacity="0.3" />
          {/* Points */}
          <circle cx="30" cy="70" r="8" fill="#ef4444" stroke="white" strokeWidth="1" /> {/* (0,0)=0 */}
          <circle cx="85" cy="70" r="8" fill="#22c55e" stroke="white" strokeWidth="1" /> {/* (1,0)=1 */}
          <circle cx="30" cy="25" r="8" fill="#22c55e" stroke="white" strokeWidth="1" /> {/* (0,1)=1 */}
          <circle cx="85" cy="25" r="8" fill="#ef4444" stroke="white" strokeWidth="1" /> {/* (1,1)=0 */}
          {/* Labels */}
          <text x="27" y="73" fill="white" fontSize="8" fontWeight="bold">0</text>
          <text x="82" y="73" fill="white" fontSize="8" fontWeight="bold">1</text>
          <text x="27" y="28" fill="white" fontSize="8" fontWeight="bold">1</text>
          <text x="82" y="28" fill="white" fontSize="8" fontWeight="bold">0</text>
        </CoordinateSystem>
        <div className="text-[9px] text-red-400 mt-1">
          No single line can separate classes!
        </div>
        <div className="text-[8px] text-[var(--text-muted)] mt-1">Need MLP with hidden layer</div>
      </div>
      
      {/* Layer Explanations */}
      <div className="flex-1 space-y-1 max-w-[200px]">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Layer Details</div>
        <LayerExplanation 
          name="Input Layer" 
          role="Receives features. Each input is a dimension of the data point."
          color="border-blue-500"
        />
        <LayerExplanation 
          name="Weights" 
          role="Learnable parameters determining feature importance. Updated during training."
          formula="z = w1*x1 + w2*x2 + b"
          color="border-amber-500"
        />
        <LayerExplanation 
          name="Heaviside Step" 
          role="Binary activation. Not differentiable at 0, so gradient descent cannot be used directly."
          formula="f(z) = {1 if z>=0, 0 otherwise}"
          color="border-purple-500"
        />
      </div>
    </div>
  );
}

// MLP Full Visualization
function MLPVisualization({ step }: { step: number }) {
  return (
    <div className="flex gap-6">
      {/* Architecture Diagram */}
      <div className="flex-shrink-0">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">MLP Architecture (XOR Solver)</div>
        <div className="flex items-center gap-4">
          {/* Input Layer */}
          <div className="flex flex-col gap-3 items-center">
            <div className="text-[9px] text-[var(--text-muted)]">Input</div>
            {['x1', 'x2'].map((n) => (
              <motion.div key={n} className="w-9 h-9 rounded-full bg-blue-600 border-2 border-blue-400 text-white flex items-center justify-center text-[10px] font-bold" animate={{ scale: step === 1 ? 1.15 : 1 }}>{n}</motion.div>
            ))}
          </div>
          
          {/* Connections to Hidden */}
          <svg className="w-12 h-24" viewBox="0 0 50 100">
            {[0,1].map(i => [0,1,2].map(j => (
              <line key={`${i}-${j}`} x1="0" y1={25 + i * 50} x2="50" y2={15 + j * 35} stroke="rgba(168,85,247,0.4)" strokeWidth="1" />
            )))}
          </svg>
          
          {/* Hidden Layer */}
          <div className="flex flex-col gap-2 items-center">
            <div className="text-[9px] text-[var(--text-muted)]">Hidden</div>
            {[1, 2, 3].map((n) => (
              <motion.div key={n} className="w-9 h-9 rounded-full bg-purple-600 border-2 border-purple-400 text-white flex items-center justify-center text-[10px] font-bold" animate={{ scale: step === 2 ? 1.15 : 1 }}>h{n}</motion.div>
            ))}
            <div className="text-[8px] text-purple-400 font-semibold">ReLU</div>
          </div>
          
          {/* Connections to Output */}
          <svg className="w-10 h-24" viewBox="0 0 40 100">
            {[0,1,2].map(j => (
              <line key={j} x1="0" y1={15 + j * 35} x2="40" y2="50" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />
            ))}
          </svg>
          
          {/* Output */}
          <div className="flex flex-col items-center">
            <div className="text-[9px] text-[var(--text-muted)]">Output</div>
            <motion.div className="w-9 h-9 rounded-full bg-emerald-600 border-2 border-emerald-400 text-white flex items-center justify-center text-[10px] font-bold" animate={{ scale: step === 3 ? 1.15 : 1 }}>y</motion.div>
            <div className="text-[8px] text-emerald-400 font-semibold">Sigmoid</div>
          </div>
        </div>
      </div>
      
      {/* XOR Solution */}
      <div className="flex-shrink-0">
        <div className="text-[11px] text-emerald-400 mb-2 font-semibold">XOR Solution</div>
        <CoordinateSystem width={120} height={120}>
          {/* Non-linear decision boundaries */}
          <path d="M 25 95 Q 60 50 95 95" stroke="#a855f7" strokeWidth="2" fill="none" strokeDasharray="4" />
          <path d="M 25 25 Q 60 70 95 25" stroke="#a855f7" strokeWidth="2" fill="none" strokeDasharray="4" />
          {/* Points */}
          <circle cx="30" cy="90" r="10" fill="#ef4444" stroke="white" strokeWidth="1.5" />
          <circle cx="100" cy="90" r="10" fill="#22c55e" stroke="white" strokeWidth="1.5" />
          <circle cx="30" cy="30" r="10" fill="#22c55e" stroke="white" strokeWidth="1.5" />
          <circle cx="100" cy="30" r="10" fill="#ef4444" stroke="white" strokeWidth="1.5" />
          {/* Labels */}
          <text x="27" y="93" fill="white" fontSize="9" fontWeight="bold">0</text>
          <text x="97" y="93" fill="white" fontSize="9" fontWeight="bold">1</text>
          <text x="27" y="33" fill="white" fontSize="9" fontWeight="bold">1</text>
          <text x="97" y="33" fill="white" fontSize="9" fontWeight="bold">0</text>
        </CoordinateSystem>
        <div className="text-[9px] text-[var(--text-secondary)] mt-1">
          Hidden layer creates curved boundary
        </div>
      </div>
      
      {/* Layer Explanations */}
      <div className="flex-1 space-y-1 max-w-[220px]">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Layer Details</div>
        <LayerExplanation 
          name="Input Layer (2 neurons)" 
          role="Receives x1, x2 coordinates. Passes values to hidden layer."
          color="border-blue-500"
        />
        <LayerExplanation 
          name="Hidden Layer (3+ neurons)" 
          role="Transforms input space. ReLU: max(0,x) introduces non-linearity enabling curved boundaries."
          formula="h = ReLU(W1*x + b1)"
          color="border-purple-500"
        />
        <LayerExplanation 
          name="Output Layer (1 neuron)" 
          role="Sigmoid squashes output to [0,1] probability. Threshold at 0.5."
          formula="y = sigmoid(W2*h + b2)"
          color="border-emerald-500"
        />
      </div>
      
      {/* Training Process */}
      <div className="flex-shrink-0 max-w-[180px]">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Training Process</div>
        <div className="space-y-1.5">
          <div className="p-1.5 rounded bg-blue-500/10 border border-blue-500/30 text-[9px]">
            <span className="text-blue-400 font-semibold">1. Forward Pass:</span>
            <span className="text-[var(--text-secondary)]"> Compute predictions</span>
          </div>
          <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/30 text-[9px]">
            <span className="text-amber-400 font-semibold">2. Loss:</span>
            <span className="text-[var(--text-secondary)]"> Binary cross-entropy</span>
          </div>
          <div className="p-1.5 rounded bg-red-500/10 border border-red-500/30 text-[9px]">
            <span className="text-red-400 font-semibold">3. Backprop:</span>
            <span className="text-[var(--text-secondary)]"> Compute gradients</span>
          </div>
          <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[9px]">
            <span className="text-emerald-400 font-semibold">4. Update:</span>
            <span className="text-[var(--text-secondary)]"> w = w - lr * grad</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// CNN Full Visualization
function CNNVisualization({ step }: { step: number }) {
  return (
    <div className="flex gap-4">
      {/* Full Architecture Pipeline */}
      <div className="flex-shrink-0">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">CNN Pipeline (MNIST Digit Recognition)</div>
        <div className="flex items-end gap-2">
          {/* Input */}
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 1 ? 1.05 : 1 }}>
            <div className="w-14 h-14 bg-gray-700 rounded border border-gray-600 grid grid-cols-7 gap-px p-1">
              {Array(49).fill(0).map((_, i) => <div key={i} className="bg-gray-500 rounded-sm" style={{ opacity: 0.2 + Math.random() * 0.8 }} />)}
            </div>
            <div className="text-[8px] text-blue-400 mt-1 font-semibold">Input</div>
            <div className="text-[7px] text-[var(--text-muted)]">28x28x1</div>
          </motion.div>
          
          <span className="text-[var(--text-muted)] text-lg mb-6">-&gt;</span>
          
          {/* Conv1 + ReLU */}
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 2 ? 1.05 : 1 }}>
            <div className="flex gap-0.5">
              {[1,2,3,4].map(i => <div key={i} className="w-2.5 h-12 bg-blue-500/40 border border-blue-500/60 rounded-sm" />)}
            </div>
            <div className="text-[8px] text-blue-400 mt-1 font-semibold">Conv2D</div>
            <div className="text-[7px] text-[var(--text-muted)]">26x26x32</div>
          </motion.div>
          
          {/* Pool1 */}
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 3 ? 1.05 : 1 }}>
            <div className="flex gap-0.5">
              {[1,2,3,4].map(i => <div key={i} className="w-2 h-9 bg-cyan-500/40 border border-cyan-500/60 rounded-sm" />)}
            </div>
            <div className="text-[8px] text-cyan-400 mt-1 font-semibold">MaxPool</div>
            <div className="text-[7px] text-[var(--text-muted)]">13x13x32</div>
          </motion.div>
          
          {/* Conv2 */}
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 4 ? 1.05 : 1 }}>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-9 bg-purple-500/40 border border-purple-500/60 rounded-sm" />)}
            </div>
            <div className="text-[8px] text-purple-400 mt-1 font-semibold">Conv2D</div>
            <div className="text-[7px] text-[var(--text-muted)]">11x11x64</div>
          </motion.div>
          
          {/* Pool2 */}
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 5 ? 1.05 : 1 }}>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-7 bg-cyan-500/40 border border-cyan-500/60 rounded-sm" />)}
            </div>
            <div className="text-[8px] text-cyan-400 mt-1 font-semibold">MaxPool</div>
            <div className="text-[7px] text-[var(--text-muted)]">5x5x64</div>
          </motion.div>
          
          {/* Flatten */}
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 6 ? 1.05 : 1 }}>
            <div className="w-1.5 h-16 bg-amber-500/40 border border-amber-500/60 rounded-sm" />
            <div className="text-[8px] text-amber-400 mt-1 font-semibold">Flatten</div>
            <div className="text-[7px] text-[var(--text-muted)]">1600</div>
          </motion.div>
          
          {/* Dense */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-0.5">
              {[1,2,3,4,5].map(i => <div key={i} className="w-5 h-2 bg-emerald-500/40 border border-emerald-500/60 rounded-sm" />)}
            </div>
            <div className="text-[8px] text-emerald-400 mt-1 font-semibold">Dense</div>
            <div className="text-[7px] text-[var(--text-muted)]">128</div>
          </div>
          
          {/* Output Softmax */}
          <div className="flex flex-col items-center">
            <div className="flex gap-0.5 h-12 items-end">
              {[0.01,0.01,0.02,0.92,0.01,0.01,0.01,0.00,0.01,0.00].map((p, i) => (
                <div key={i} className="flex flex-col items-center justify-end">
                  <div className={`w-2 rounded-t ${i === 3 ? 'bg-emerald-500' : 'bg-gray-600'}`} style={{ height: `${Math.max(4, p * 40)}px` }} />
                </div>
              ))}
            </div>
            <div className="text-[8px] text-emerald-400 mt-1 font-semibold">Softmax</div>
            <div className="text-[7px] text-[var(--text-muted)]">10 classes</div>
          </div>
        </div>
      </div>
      
      {/* Key Concepts */}
      <div className="flex-1 space-y-1 max-w-[260px]">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Layer Details</div>
        <LayerExplanation 
          name="Conv2D (Convolutional)" 
          role="Slides kernel over image extracting features. Learns edge, texture, pattern detectors."
          formula="out = (W-K+2P)/S + 1"
          color="border-blue-500"
        />
        <LayerExplanation 
          name="MaxPooling" 
          role="Downsamples by taking maximum value in window. Adds translation invariance, reduces computation."
          color="border-cyan-500"
        />
        <LayerExplanation 
          name="Flatten" 
          role="Converts 3D feature maps (H x W x C) to 1D vector for dense layer input."
          formula="HxWxC -> HWC"
          color="border-amber-500"
        />
        <LayerExplanation 
          name="Dense + Softmax" 
          role="Fully connected classification. Softmax converts logits to probabilities summing to 1."
          color="border-emerald-500"
        />
      </div>
      
      {/* Feature Hierarchy */}
      <div className="flex-shrink-0 max-w-[140px]">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Feature Hierarchy</div>
        <div className="space-y-1">
          <div className="p-1.5 rounded bg-blue-500/10 border border-blue-500/30 text-[9px]">
            <span className="text-blue-400 font-semibold">Layer 1:</span>
            <span className="text-[var(--text-secondary)]"> Edges, lines</span>
          </div>
          <div className="p-1.5 rounded bg-purple-500/10 border border-purple-500/30 text-[9px]">
            <span className="text-purple-400 font-semibold">Layer 2:</span>
            <span className="text-[var(--text-secondary)]"> Shapes, curves</span>
          </div>
          <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[9px]">
            <span className="text-emerald-400 font-semibold">Deep:</span>
            <span className="text-[var(--text-secondary)]"> Objects, faces</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// RNN/LSTM Full Visualization
function RNNVisualization({ step }: { step: number }) {
  const words = ['The', 'movie', 'was', 'great'];
  
  return (
    <div className="flex gap-4">
      {/* Architecture */}
      <div className="flex-shrink-0">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">LSTM Sequence Processing</div>
        <div className="flex items-center gap-1">
          {words.map((word, i) => (
            <div key={word} className="flex flex-col items-center gap-1">
              {/* Word input */}
              <motion.div 
                className={`px-2 py-1.5 rounded text-[10px] font-semibold ${step === i + 1 ? 'bg-blue-600 text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'}`}
                animate={{ scale: step === i + 1 ? 1.1 : 1 }}
              >
                {word}
              </motion.div>
              
              {/* Embedding arrow */}
              <div className="text-[7px] text-purple-400">embed</div>
              
              {/* LSTM Cell */}
              <motion.div 
                className="relative w-16 h-12 rounded border-2 bg-amber-600/10 flex flex-col items-center justify-center"
                animate={{ borderColor: step === i + 1 ? 'rgb(245, 158, 11)' : 'rgba(245, 158, 11, 0.3)' }}
              >
                <div className="text-[9px] text-amber-400 font-semibold">LSTM</div>
                <div className="text-[7px] text-[var(--text-muted)]">h{i}, c{i}</div>
                {/* Gate indicators */}
                <div className="absolute -right-0.5 top-1 w-1.5 h-1.5 rounded-full bg-red-500" title="Forget" />
                <div className="absolute -right-0.5 top-4 w-1.5 h-1.5 rounded-full bg-blue-500" title="Input" />
                <div className="absolute -right-0.5 top-7 w-1.5 h-1.5 rounded-full bg-emerald-500" title="Output" />
              </motion.div>
              
              {/* Hidden state arrow to next */}
              {i < words.length - 1 && (
                <svg className="absolute w-6 h-3" style={{ left: '100%', top: '50%' }}>
                  <path d="M0 6 L20 6" stroke="rgba(245,158,11,0.5)" strokeWidth="2" markerEnd="url(#arrowAmber)" />
                </svg>
              )}
            </div>
          ))}
          
          {/* Final Output */}
          <div className="flex flex-col items-center gap-1 ml-4">
            <div className="text-[9px] text-[var(--text-muted)]">Dense</div>
            <motion.div 
              className="w-12 h-12 rounded-lg bg-emerald-600/30 border-2 border-emerald-500 flex items-center justify-center"
              animate={{ scale: step >= 5 ? 1.15 : 1 }}
            >
              <span className="text-2xl">+</span>
            </motion.div>
            <div className="text-[9px] text-emerald-400 font-semibold">Positive</div>
            <div className="text-[8px] text-[var(--text-muted)]">87%</div>
          </div>
        </div>
      </div>
      
      {/* LSTM Cell Detail */}
      <div className="flex-shrink-0">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">LSTM Cell Internal</div>
        <div className="w-40 h-28 rounded border border-amber-500/30 bg-amber-500/5 p-2 relative">
          {/* Cell state line */}
          <div className="absolute top-3 left-2 right-2 h-0.5 bg-amber-500/50" />
          <div className="absolute top-1 left-12 text-[7px] text-amber-400">Cell State (Ct)</div>
          
          {/* Gates */}
          <div className="flex justify-around mt-6">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded bg-red-500/30 border border-red-500 flex items-center justify-center text-[8px] text-red-400">f</div>
              <div className="text-[7px] text-red-400">Forget</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded bg-blue-500/30 border border-blue-500 flex items-center justify-center text-[8px] text-blue-400">i</div>
              <div className="text-[7px] text-blue-400">Input</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded bg-emerald-500/30 border border-emerald-500 flex items-center justify-center text-[8px] text-emerald-400">o</div>
              <div className="text-[7px] text-emerald-400">Output</div>
            </div>
          </div>
          
          {/* Hidden state */}
          <div className="absolute bottom-1 left-12 text-[7px] text-purple-400">Hidden State (ht)</div>
        </div>
      </div>
      
      {/* Gate Explanations */}
      <div className="flex-1 space-y-1 max-w-[220px]">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">LSTM Gates</div>
        <LayerExplanation 
          name="Forget Gate (f)" 
          role="Decides what to remove from cell state. Sigmoid outputs 0-1 multiplied with cell state."
          formula="ft = sigmoid(Wf*[ht-1,xt] + bf)"
          color="border-red-500"
        />
        <LayerExplanation 
          name="Input Gate (i)" 
          role="Decides what new information to store. Creates candidate values to add."
          formula="it = sigmoid(Wi*[ht-1,xt] + bi)"
          color="border-blue-500"
        />
        <LayerExplanation 
          name="Output Gate (o)" 
          role="Decides what to output based on cell state. Filtered through tanh."
          formula="ot = sigmoid(Wo*[ht-1,xt] + bo)"
          color="border-emerald-500"
        />
      </div>
      
      {/* Why LSTM */}
      <div className="flex-shrink-0 max-w-[140px]">
        <div className="p-2 rounded bg-purple-500/10 border border-purple-500/30">
          <div className="text-[10px] font-semibold text-purple-400 mb-1">Why LSTM over RNN?</div>
          <div className="text-[8px] text-[var(--text-secondary)] space-y-1">
            <div>Solves vanishing gradient</div>
            <div>Cell state: highway for gradients</div>
            <div>Gates control info flow</div>
            <div>Long-term dependencies</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Transformer Full Visualization
function TransformerVisualization({ step }: { step: number }) {
  const words = ['The', 'cat', 'sat'];
  const attention = [[0.1,0.6,0.3],[0.2,0.2,0.6],[0.3,0.5,0.2]];
  
  return (
    <div className="flex gap-4">
      {/* Encoder Architecture */}
      <div className="flex-shrink-0">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Transformer Encoder</div>
        <div className="flex flex-col items-center gap-2 p-2 rounded border border-[var(--border-color)]">
          {/* Input + Positional */}
          <div className="flex gap-1">
            {words.map((w, i) => (
              <motion.div key={w} className="px-2 py-1 rounded bg-blue-600/30 border border-blue-500 text-[9px]" animate={{ scale: step === 1 ? 1.1 : 1 }}>{w}</motion.div>
            ))}
          </div>
          <div className="text-[7px] text-blue-400">+ Positional Encoding</div>
          
          {/* Multi-Head Attention */}
          <motion.div 
            className="w-full p-2 rounded border bg-purple-600/10"
            animate={{ borderColor: step === 2 ? 'rgb(168, 85, 247)' : 'rgba(168, 85, 247, 0.3)' }}
          >
            <div className="text-[8px] text-purple-400 text-center mb-1 font-semibold">Multi-Head Self-Attention</div>
            <div className="flex justify-center">
              <div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {attention.flat().map((w, i) => (
                  <div key={i} className="w-5 h-5 rounded text-[7px] flex items-center justify-center" style={{ backgroundColor: `rgba(168, 85, 247, ${w})` }}>
                    {w.toFixed(1)}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <div className="text-[7px] text-gray-400">Add and Norm</div>
          
          {/* Feed Forward */}
          <motion.div 
            className="w-full p-2 rounded border bg-emerald-600/10"
            animate={{ borderColor: step === 3 ? 'rgb(34, 197, 94)' : 'rgba(34, 197, 94, 0.3)' }}
          >
            <div className="text-[8px] text-emerald-400 text-center font-semibold">Feed Forward Network</div>
            <div className="text-[7px] text-[var(--text-muted)] text-center">Dense -&gt; ReLU -&gt; Dense</div>
          </motion.div>
          
          <div className="text-[7px] text-gray-400">Add and Norm</div>
          
          {/* Output */}
          <div className="flex gap-1">
            {words.map((w) => (
              <div key={w} className="px-2 py-1 rounded bg-emerald-600/30 border border-emerald-500 text-[9px]">{w}</div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Self-Attention Detail */}
      <div className="flex-shrink-0">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Self-Attention Mechanism</div>
        <div className="p-2 rounded border border-[var(--border-color)] bg-[var(--bg-tertiary)]">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded bg-blue-600/30 border border-blue-500 flex items-center justify-center text-[9px] text-blue-400">Q</div>
              <div className="text-[7px] text-[var(--text-muted)]">Query</div>
            </div>
            <span className="text-[var(--text-muted)]">x</span>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded bg-purple-600/30 border border-purple-500 flex items-center justify-center text-[9px] text-purple-400">K</div>
              <div className="text-[7px] text-[var(--text-muted)]">Key</div>
            </div>
            <span className="text-[var(--text-muted)]">-&gt;</span>
            <div className="flex flex-col items-center">
              <div className="w-12 h-8 rounded bg-amber-600/30 border border-amber-500 flex items-center justify-center text-[8px] text-amber-400">Score</div>
            </div>
          </div>
          <div className="text-[8px] font-mono text-center text-blue-400">
            Attention = softmax(QK^T / sqrt(d)) * V
          </div>
        </div>
      </div>
      
      {/* QKV Explanations */}
      <div className="flex-1 space-y-1 max-w-[200px]">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Attention Components</div>
        <LayerExplanation 
          name="Query (Q)" 
          role="What am I looking for? Each token creates a query to match against keys."
          formula="Q = X * Wq"
          color="border-blue-500"
        />
        <LayerExplanation 
          name="Key (K)" 
          role="What do I contain? Each token advertises its content via key vector."
          formula="K = X * Wk"
          color="border-purple-500"
        />
        <LayerExplanation 
          name="Value (V)" 
          role="What information to pass? Actual content retrieved based on attention."
          formula="V = X * Wv"
          color="border-emerald-500"
        />
      </div>
      
      {/* Key Features */}
      <div className="flex-shrink-0 max-w-[130px]">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Advantages</div>
        <div className="space-y-1">
          <div className="p-1.5 rounded bg-blue-500/10 border border-blue-500/30 text-[8px] text-[var(--text-secondary)]">
            <span className="text-blue-400">Parallel:</span> All positions at once
          </div>
          <div className="p-1.5 rounded bg-purple-500/10 border border-purple-500/30 text-[8px] text-[var(--text-secondary)]">
            <span className="text-purple-400">Multi-head:</span> 8 attention views
          </div>
          <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[8px] text-[var(--text-secondary)]">
            <span className="text-emerald-400">Global:</span> Any token sees all
          </div>
        </div>
      </div>
    </div>
  );
}

// GAN Full Visualization
function GANVisualization({ step }: { step: number }) {
  return (
    <div className="flex gap-4">
      {/* Architecture */}
      <div className="flex-shrink-0">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">GAN Architecture</div>
        <div className="flex items-center gap-3">
          {/* Noise */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded bg-gray-700 grid grid-cols-3 gap-px p-1">
              {Array(9).fill(0).map((_, i) => <div key={i} className="bg-gray-500 rounded-sm" style={{ opacity: Math.random() }} />)}
            </div>
            <div className="text-[8px] text-[var(--text-muted)]">Random z</div>
            <div className="text-[7px] text-gray-400">N(0,1)</div>
          </div>
          
          <span className="text-[var(--text-muted)]">-&gt;</span>
          
          {/* Generator */}
          <motion.div 
            className="flex flex-col items-center p-3 rounded border-2 bg-emerald-600/10"
            animate={{ borderColor: step === 1 ? 'rgb(34, 197, 94)' : 'rgba(34, 197, 94, 0.3)' }}
          >
            <div className="text-[10px] font-semibold text-emerald-400">Generator G</div>
            <div className="text-[7px] text-[var(--text-muted)]">Dense-&gt;BN-&gt;ReLU</div>
            <div className="text-[7px] text-[var(--text-muted)]">Deconv layers</div>
          </motion.div>
          
          <span className="text-[var(--text-muted)]">-&gt;</span>
          
          {/* Fake Image */}
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 2 ? 1.1 : 1 }}>
            <div className="w-12 h-12 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-purple-400">
              <span className="text-white text-lg">G</span>
            </div>
            <div className="text-[8px] text-purple-400 font-semibold">Fake</div>
          </motion.div>
          
          <div className="flex flex-col items-center gap-1">
            <span className="text-[var(--text-muted)] text-lg">|</span>
            <span className="text-[var(--text-muted)] text-lg">v</span>
          </div>
          
          {/* Discriminator */}
          <motion.div 
            className="flex flex-col items-center p-3 rounded border-2 bg-amber-600/10"
            animate={{ borderColor: step === 3 ? 'rgb(245, 158, 11)' : 'rgba(245, 158, 11, 0.3)' }}
          >
            <div className="text-[10px] font-semibold text-amber-400">Discriminator D</div>
            <div className="text-[7px] text-[var(--text-muted)]">Conv-&gt;LeakyReLU</div>
            <div className="text-[7px] text-[var(--text-muted)]">Dense-&gt;Sigmoid</div>
          </motion.div>
          
          <span className="text-[var(--text-muted)]">-&gt;</span>
          
          {/* Output */}
          <motion.div className="flex flex-col items-center" animate={{ scale: step >= 4 ? 1.1 : 1 }}>
            <div className={`px-4 py-3 rounded text-[11px] font-bold ${step % 2 === 0 ? 'bg-emerald-600/30 border-2 border-emerald-500 text-emerald-400' : 'bg-red-600/30 border-2 border-red-500 text-red-400'}`}>
              {step % 2 === 0 ? 'Real?' : 'Fake?'}
            </div>
            <div className="text-[8px] text-[var(--text-muted)]">P(real)</div>
          </motion.div>
        </div>
        
        {/* Real image input */}
        <div className="mt-2 flex items-center gap-2 ml-32">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center border-2 border-amber-400">
            <span className="text-white text-lg">R</span>
          </div>
          <div className="text-[8px] text-amber-400 font-semibold">Real Data</div>
          <svg className="w-8 h-4">
            <path d="M0 8 L25 8" stroke="rgba(245,158,11,0.5)" strokeWidth="2" />
          </svg>
        </div>
      </div>
      
      {/* Training Game */}
      <div className="flex-1 max-w-[200px]">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Min-Max Game</div>
        <div className="space-y-1">
          <LayerExplanation 
            name="Generator Loss" 
            role="Wants D(G(z)) = 1. Fools discriminator into thinking fake is real."
            formula="min log(1 - D(G(z)))"
            color="border-emerald-500"
          />
          <LayerExplanation 
            name="Discriminator Loss" 
            role="Wants D(real)=1, D(fake)=0. Correctly classify real vs fake."
            formula="max log(D(x)) + log(1-D(G(z)))"
            color="border-amber-500"
          />
        </div>
      </div>
      
      {/* Challenges */}
      <div className="flex-shrink-0 max-w-[130px]">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Challenges</div>
        <div className="p-2 rounded bg-red-500/10 border border-red-500/30">
          <div className="text-[8px] text-[var(--text-secondary)] space-y-1">
            <div><span className="text-red-400">Mode collapse:</span> Limited variety</div>
            <div><span className="text-red-400">Instability:</span> Hard to train</div>
            <div><span className="text-red-400">Balance:</span> G vs D equilibrium</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Autoencoder Full Visualization
function AutoencoderVisualization({ step }: { step: number }) {
  return (
    <div className="flex gap-4">
      {/* Architecture */}
      <div className="flex-shrink-0">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Autoencoder Architecture</div>
        <div className="flex items-end gap-2">
          {/* Input */}
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 1 ? 1.1 : 1 }}>
            <div className="w-12 h-12 bg-blue-600/30 border-2 border-blue-500 rounded grid grid-cols-4 gap-px p-1">
              {Array(16).fill(0).map((_, i) => <div key={i} className="bg-blue-400 rounded-sm" style={{ opacity: 0.3 + Math.random() * 0.7 }} />)}
            </div>
            <div className="text-[8px] text-blue-400 font-semibold">Input x</div>
            <div className="text-[7px] text-[var(--text-muted)]">784 dim</div>
          </motion.div>
          
          {/* Encoder */}
          <div className="flex flex-col items-center">
            <div className="text-[8px] text-purple-400 mb-1 font-semibold">Encoder</div>
            <div className="flex items-end gap-0.5">
              <motion.div className="w-3 h-12 bg-purple-600/30 border border-purple-500 rounded-sm" animate={{ scale: step === 2 ? 1.1 : 1 }} />
              <motion.div className="w-2.5 h-10 bg-purple-600/30 border border-purple-500 rounded-sm" animate={{ scale: step === 2 ? 1.1 : 1 }} />
              <motion.div className="w-2 h-8 bg-purple-600/30 border border-purple-500 rounded-sm" animate={{ scale: step === 2 ? 1.1 : 1 }} />
            </div>
            <div className="text-[7px] text-[var(--text-muted)]">256-&gt;64-&gt;32</div>
          </div>
          
          {/* Latent */}
          <motion.div 
            className="flex flex-col items-center px-3 py-2 rounded bg-amber-600/20 border-2 border-amber-500"
            animate={{ scale: step === 3 ? 1.2 : 1 }}
          >
            <div className="text-[12px] font-bold text-amber-400">z</div>
            <div className="text-[7px] text-amber-300">Latent</div>
            <div className="text-[7px] text-[var(--text-muted)]">8 dim</div>
          </motion.div>
          
          {/* Decoder */}
          <div className="flex flex-col items-center">
            <div className="text-[8px] text-emerald-400 mb-1 font-semibold">Decoder</div>
            <div className="flex items-end gap-0.5">
              <motion.div className="w-2 h-8 bg-emerald-600/30 border border-emerald-500 rounded-sm" animate={{ scale: step === 4 ? 1.1 : 1 }} />
              <motion.div className="w-2.5 h-10 bg-emerald-600/30 border border-emerald-500 rounded-sm" animate={{ scale: step === 4 ? 1.1 : 1 }} />
              <motion.div className="w-3 h-12 bg-emerald-600/30 border border-emerald-500 rounded-sm" animate={{ scale: step === 4 ? 1.1 : 1 }} />
            </div>
            <div className="text-[7px] text-[var(--text-muted)]">32-&gt;64-&gt;256</div>
          </div>
          
          {/* Output */}
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 5 ? 1.1 : 1 }}>
            <div className="w-12 h-12 bg-emerald-600/30 border-2 border-emerald-500 rounded grid grid-cols-4 gap-px p-1">
              {Array(16).fill(0).map((_, i) => <div key={i} className="bg-emerald-400 rounded-sm" style={{ opacity: 0.3 + Math.random() * 0.7 }} />)}
            </div>
            <div className="text-[8px] text-emerald-400 font-semibold">Output x hat</div>
            <div className="text-[7px] text-[var(--text-muted)]">784 dim</div>
          </motion.div>
        </div>
      </div>
      
      {/* Layer Explanations */}
      <div className="flex-1 max-w-[220px]">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Components</div>
        <div className="space-y-1">
          <LayerExplanation 
            name="Encoder f(x)" 
            role="Compresses high-dimensional input to low-dimensional latent space. Learns important features."
            formula="z = f(x)"
            color="border-purple-500"
          />
          <LayerExplanation 
            name="Latent Space z" 
            role="Compressed representation. Bottleneck forces network to learn essential features only."
            color="border-amber-500"
          />
          <LayerExplanation 
            name="Decoder g(z)" 
            role="Reconstructs original input from latent code. Mirror structure of encoder."
            formula="x_hat = g(z)"
            color="border-emerald-500"
          />
          <LayerExplanation 
            name="Reconstruction Loss" 
            role="MSE between input and output. Minimized during training."
            formula="L = ||x - x_hat||^2"
            color="border-red-500"
          />
        </div>
      </div>
      
      {/* Applications */}
      <div className="flex-shrink-0 max-w-[130px]">
        <div className="text-[11px] text-[var(--text-muted)] mb-2 font-semibold">Applications</div>
        <div className="space-y-1">
          <div className="p-1.5 rounded bg-blue-500/10 border border-blue-500/30 text-[8px] text-[var(--text-secondary)]">
            Dimensionality reduction
          </div>
          <div className="p-1.5 rounded bg-purple-500/10 border border-purple-500/30 text-[8px] text-[var(--text-secondary)]">
            Denoising images
          </div>
          <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[8px] text-[var(--text-secondary)]">
            Anomaly detection
          </div>
          <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/30 text-[8px] text-[var(--text-secondary)]">
            Feature learning
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LiveExampleBar() {
  const { currentArchitecture, training, visualization, ui } = useNetworkStore();
  const [step, setStep] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  
  useEffect(() => {
    if (training.isTraining || visualization.showDataFlow) {
      const timer = setInterval(() => setStep(s => (s + 1) % 6), 1500 / visualization.animationSpeed);
      return () => clearInterval(timer);
    }
  }, [training.isTraining, visualization.showDataFlow, visualization.animationSpeed]);
  
  const getVisualization = () => {
    switch (currentArchitecture) {
      case 'perceptron': return <PerceptronVisualization step={step} />;
      case 'mlp': return <MLPVisualization step={step} />;
      case 'cnn': return <CNNVisualization step={step} />;
      case 'rnn': return <RNNVisualization step={step} />;
      case 'transformer': return <TransformerVisualization step={step} />;
      case 'gan': return <GANVisualization step={step} />;
      case 'autoencoder': return <AutoencoderVisualization step={step} />;
      default: return <MLPVisualization step={step} />;
    }
  };
  
  const titles: Record<string, string> = {
    perceptron: 'Linear Perceptron - Binary Classification with Single Line Decision Boundary',
    mlp: 'Multi-Layer Perceptron - Non-Linear Classification (XOR Problem)',
    cnn: 'Convolutional Neural Network - Image Feature Extraction and Classification',
    rnn: 'LSTM Recurrent Network - Sequential Data Processing with Memory',
    transformer: 'Transformer - Self-Attention Mechanism for Parallel Sequence Processing',
    gan: 'Generative Adversarial Network - Generator vs Discriminator Training',
    autoencoder: 'Autoencoder - Unsupervised Feature Learning and Compression',
  };
  
  const leftMargin = ui.leftPanelOpen ? '320px' : '0';
  const rightMargin = ui.rightPanelOpen ? '384px' : '0';
  
  return (
    <motion.div 
      className="fixed bottom-0 z-30"
      style={{ left: leftMargin, right: rightMargin }}
      initial={{ y: 300 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 25 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -top-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-t-lg bg-[var(--bg-secondary)] border border-b-0 border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs flex items-center gap-2"
      >
        <span className="font-semibold">Live Architecture Guide</span>
        <motion.svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ rotate: isExpanded ? 180 : 0 }}>
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
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  {titles[currentArchitecture] || 'Architecture Guide'}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[var(--text-muted)]">Step {step + 1}/6</span>
                  <button onClick={() => setStep(s => (s + 1) % 6)} className="px-3 py-1.5 text-[10px] rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Next Step
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto pb-2">
                {getVisualization()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
