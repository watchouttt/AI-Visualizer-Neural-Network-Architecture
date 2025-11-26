'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNetworkStore, ArchitectureType } from '@/store/networkStore';

// Perceptron Full Visualization - REDESIGNED
function PerceptronVisualization({ step }: { step: number }) {
  return (
    <div className="space-y-4">
      {/* Row 1: Architecture + Logic Gates */}
      <div className="grid grid-cols-4 gap-4">
        {/* Architecture Diagram */}
        <div className="col-span-1 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
          <div className="text-[11px] text-blue-400 font-semibold mb-2 text-center">ARCHITECTURE</div>
          <div className="flex items-center justify-center gap-2">
            {/* Inputs */}
            <div className="flex flex-col gap-1">
              <motion.div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold" animate={{ scale: step === 1 ? 1.2 : 1 }}>x1</motion.div>
              <motion.div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold" animate={{ scale: step === 1 ? 1.2 : 1 }}>x2</motion.div>
              <div className="w-8 h-8 rounded-full bg-gray-600 text-gray-300 flex items-center justify-center text-[10px] font-bold">1</div>
            </div>
            {/* Arrows with weights */}
            <div className="flex flex-col items-center text-[8px] text-amber-400">
              <div>w1</div>
              <div>w2</div>
              <div className="text-gray-400">b</div>
            </div>
            {/* Sum */}
            <motion.div className="w-10 h-10 rounded bg-amber-600/40 border border-amber-500 flex flex-col items-center justify-center" animate={{ scale: step === 2 ? 1.2 : 1 }}>
              <span className="text-amber-400 text-sm font-bold">Sum</span>
            </motion.div>
            {/* Arrow */}
            <span className="text-gray-500">-&gt;</span>
            {/* Step */}
            <motion.div className="w-10 h-10 rounded bg-purple-600/40 border border-purple-500 flex flex-col items-center justify-center" animate={{ scale: step === 3 ? 1.2 : 1 }}>
              <span className="text-purple-400 text-[9px] font-bold">Step</span>
            </motion.div>
            {/* Arrow */}
            <span className="text-gray-500">-&gt;</span>
            {/* Output */}
            <motion.div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold" animate={{ scale: step === 4 ? 1.2 : 1 }}>y</motion.div>
          </div>
          <div className="mt-2 text-center">
            <div className="text-[9px] font-mono text-blue-400">y = step(w1*x1 + w2*x2 + b)</div>
            <div className="text-[8px] text-gray-400 mt-1">step(z) = 1 if z &gt;= 0, else 0</div>
          </div>
        </div>

        {/* AND Gate */}
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-emerald-500/30">
          <div className="text-[11px] text-emerald-400 font-semibold mb-1 text-center">AND GATE (Solvable)</div>
          <div className="flex gap-2">
            {/* Graph */}
            <svg width="80" height="80" viewBox="0 0 80 80" className="flex-shrink-0">
              {/* Grid */}
              <line x1="10" y1="70" x2="70" y2="70" stroke="white" strokeWidth="1" />
              <line x1="10" y1="70" x2="10" y2="10" stroke="white" strokeWidth="1" />
              <text x="72" y="73" fill="white" fontSize="8">x1</text>
              <text x="2" y="8" fill="white" fontSize="8">x2</text>
              <text x="5" y="73" fill="gray" fontSize="7">0</text>
              <text x="65" y="73" fill="gray" fontSize="7">1</text>
              <text x="2" y="20" fill="gray" fontSize="7">1</text>
              {/* Decision boundary: x1 + x2 = 1.5 -> from (0,1.5) to (1.5,0) -> scaled: (10,25) to (55,70) */}
              <line x1="10" y1="25" x2="55" y2="70" stroke="#22c55e" strokeWidth="2" strokeDasharray="3" />
              {/* Points */}
              <circle cx="20" cy="60" r="6" fill="#ef4444" /><text x="17" y="63" fill="white" fontSize="7">0</text>
              <circle cx="60" cy="60" r="6" fill="#ef4444" /><text x="57" y="63" fill="white" fontSize="7">0</text>
              <circle cx="20" cy="20" r="6" fill="#ef4444" /><text x="17" y="23" fill="white" fontSize="7">0</text>
              <circle cx="60" cy="20" r="6" fill="#22c55e" /><text x="57" y="23" fill="white" fontSize="7">1</text>
            </svg>
            {/* Truth Table */}
            <div className="text-[8px]">
              <table className="border-collapse">
                <thead>
                  <tr className="text-gray-400">
                    <th className="px-1">x1</th><th className="px-1">x2</th><th className="px-1">y</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr><td className="px-1 text-center">0</td><td className="px-1 text-center">0</td><td className="px-1 text-center text-red-400">0</td></tr>
                  <tr><td className="px-1 text-center">0</td><td className="px-1 text-center">1</td><td className="px-1 text-center text-red-400">0</td></tr>
                  <tr><td className="px-1 text-center">1</td><td className="px-1 text-center">0</td><td className="px-1 text-center text-red-400">0</td></tr>
                  <tr><td className="px-1 text-center">1</td><td className="px-1 text-center">1</td><td className="px-1 text-center text-emerald-400">1</td></tr>
                </tbody>
              </table>
              <div className="mt-1 text-emerald-400 font-mono">w1=1, w2=1, b=-1.5</div>
            </div>
          </div>
        </div>

        {/* OR Gate */}
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-emerald-500/30">
          <div className="text-[11px] text-emerald-400 font-semibold mb-1 text-center">OR GATE (Solvable)</div>
          <div className="flex gap-2">
            {/* Graph */}
            <svg width="80" height="80" viewBox="0 0 80 80" className="flex-shrink-0">
              {/* Grid */}
              <line x1="10" y1="70" x2="70" y2="70" stroke="white" strokeWidth="1" />
              <line x1="10" y1="70" x2="10" y2="10" stroke="white" strokeWidth="1" />
              <text x="72" y="73" fill="white" fontSize="8">x1</text>
              <text x="2" y="8" fill="white" fontSize="8">x2</text>
              <text x="5" y="73" fill="gray" fontSize="7">0</text>
              <text x="65" y="73" fill="gray" fontSize="7">1</text>
              <text x="2" y="20" fill="gray" fontSize="7">1</text>
              {/* Decision boundary: x1 + x2 = 0.5 -> scaled: from (10,55) to (25,70) */}
              <line x1="10" y1="55" x2="25" y2="70" stroke="#22c55e" strokeWidth="2" strokeDasharray="3" />
              {/* Points */}
              <circle cx="20" cy="60" r="6" fill="#ef4444" /><text x="17" y="63" fill="white" fontSize="7">0</text>
              <circle cx="60" cy="60" r="6" fill="#22c55e" /><text x="57" y="63" fill="white" fontSize="7">1</text>
              <circle cx="20" cy="20" r="6" fill="#22c55e" /><text x="17" y="23" fill="white" fontSize="7">1</text>
              <circle cx="60" cy="20" r="6" fill="#22c55e" /><text x="57" y="23" fill="white" fontSize="7">1</text>
            </svg>
            {/* Truth Table */}
            <div className="text-[8px]">
              <table className="border-collapse">
                <thead>
                  <tr className="text-gray-400">
                    <th className="px-1">x1</th><th className="px-1">x2</th><th className="px-1">y</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr><td className="px-1 text-center">0</td><td className="px-1 text-center">0</td><td className="px-1 text-center text-red-400">0</td></tr>
                  <tr><td className="px-1 text-center">0</td><td className="px-1 text-center">1</td><td className="px-1 text-center text-emerald-400">1</td></tr>
                  <tr><td className="px-1 text-center">1</td><td className="px-1 text-center">0</td><td className="px-1 text-center text-emerald-400">1</td></tr>
                  <tr><td className="px-1 text-center">1</td><td className="px-1 text-center">1</td><td className="px-1 text-center text-emerald-400">1</td></tr>
                </tbody>
              </table>
              <div className="mt-1 text-emerald-400 font-mono">w1=1, w2=1, b=-0.5</div>
            </div>
          </div>
        </div>

        {/* XOR Gate */}
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-red-500/30">
          <div className="text-[11px] text-red-400 font-semibold mb-1 text-center">XOR (NOT Solvable!)</div>
          <div className="flex gap-2">
            {/* Graph */}
            <svg width="80" height="80" viewBox="0 0 80 80" className="flex-shrink-0">
              {/* Grid */}
              <line x1="10" y1="70" x2="70" y2="70" stroke="white" strokeWidth="1" />
              <line x1="10" y1="70" x2="10" y2="10" stroke="white" strokeWidth="1" />
              <text x="72" y="73" fill="white" fontSize="8">x1</text>
              <text x="2" y="8" fill="white" fontSize="8">x2</text>
              <text x="5" y="73" fill="gray" fontSize="7">0</text>
              <text x="65" y="73" fill="gray" fontSize="7">1</text>
              <text x="2" y="20" fill="gray" fontSize="7">1</text>
              {/* No single line works - show failed attempts */}
              <line x1="10" y1="40" x2="70" y2="40" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" opacity="0.4" />
              <line x1="40" y1="10" x2="40" y2="70" stroke="#ef4444" strokeWidth="1" strokeDasharray="2" opacity="0.4" />
              {/* Points */}
              <circle cx="20" cy="60" r="6" fill="#ef4444" /><text x="17" y="63" fill="white" fontSize="7">0</text>
              <circle cx="60" cy="60" r="6" fill="#22c55e" /><text x="57" y="63" fill="white" fontSize="7">1</text>
              <circle cx="20" cy="20" r="6" fill="#22c55e" /><text x="17" y="23" fill="white" fontSize="7">1</text>
              <circle cx="60" cy="20" r="6" fill="#ef4444" /><text x="57" y="23" fill="white" fontSize="7">0</text>
            </svg>
            {/* Truth Table */}
            <div className="text-[8px]">
              <table className="border-collapse">
                <thead>
                  <tr className="text-gray-400">
                    <th className="px-1">x1</th><th className="px-1">x2</th><th className="px-1">y</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr><td className="px-1 text-center">0</td><td className="px-1 text-center">0</td><td className="px-1 text-center text-red-400">0</td></tr>
                  <tr><td className="px-1 text-center">0</td><td className="px-1 text-center">1</td><td className="px-1 text-center text-emerald-400">1</td></tr>
                  <tr><td className="px-1 text-center">1</td><td className="px-1 text-center">0</td><td className="px-1 text-center text-emerald-400">1</td></tr>
                  <tr><td className="px-1 text-center">1</td><td className="px-1 text-center">1</td><td className="px-1 text-center text-red-400">0</td></tr>
                </tbody>
              </table>
              <div className="mt-1 text-red-400">No single line works!</div>
              <div className="text-amber-400">Need MLP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Layer Details */}
      <div className="grid grid-cols-4 gap-4">
        {/* Input Layer */}
        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="text-[10px] font-semibold text-blue-400 mb-1">INPUT LAYER</div>
          <div className="text-[9px] text-[var(--text-secondary)] space-y-1">
            <p><span className="text-blue-300">Role:</span> Receives raw features from data</p>
            <p><span className="text-blue-300">Example:</span> For AND gate, x1=1, x2=0 means first input ON, second OFF</p>
            <p><span className="text-blue-300">Size:</span> 2 neurons (one per feature)</p>
          </div>
        </div>

        {/* Weights */}
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <div className="text-[10px] font-semibold text-amber-400 mb-1">WEIGHTS + BIAS</div>
          <div className="text-[9px] text-[var(--text-secondary)] space-y-1">
            <p><span className="text-amber-300">Role:</span> Scale inputs by importance</p>
            <p><span className="text-amber-300">Formula:</span> z = w1*x1 + w2*x2 + b</p>
            <p><span className="text-amber-300">Example:</span> AND: 1*1 + 1*1 + (-1.5) = 0.5 &gt; 0 = 1</p>
            <p><span className="text-amber-300">Learning:</span> Adjusted by gradient descent</p>
          </div>
        </div>

        {/* Step Function */}
        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
          <div className="text-[10px] font-semibold text-purple-400 mb-1">HEAVISIDE STEP</div>
          <div className="text-[9px] text-[var(--text-secondary)] space-y-1">
            <p><span className="text-purple-300">Role:</span> Binary threshold activation</p>
            <p><span className="text-purple-300">Formula:</span> f(z) = 1 if z &gt;= 0, else 0</p>
            <p><span className="text-purple-300">Problem:</span> Not differentiable at z=0</p>
            <p><span className="text-purple-300">Solution:</span> Use sigmoid for gradient descent</p>
          </div>
        </div>

        {/* Output */}
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <div className="text-[10px] font-semibold text-emerald-400 mb-1">OUTPUT LAYER</div>
          <div className="text-[9px] text-[var(--text-secondary)] space-y-1">
            <p><span className="text-emerald-300">Role:</span> Final binary prediction</p>
            <p><span className="text-emerald-300">Values:</span> 0 (negative class) or 1 (positive)</p>
            <p><span className="text-emerald-300">Limitation:</span> Only linearly separable problems</p>
            <p><span className="text-emerald-300">Key:</span> Decision boundary is a straight line</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// MLP Full Visualization
function MLPVisualization({ step }: { step: number }) {
  return (
    <div className="space-y-4">
      {/* Row 1: Architecture + XOR Solution */}
      <div className="grid grid-cols-3 gap-4">
        {/* Architecture */}
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
          <div className="text-[11px] text-blue-400 font-semibold mb-2 text-center">MLP ARCHITECTURE</div>
          <div className="flex items-center justify-center gap-3">
            <div className="flex flex-col gap-1 items-center">
              <div className="text-[8px] text-gray-400">Input</div>
              <motion.div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]" animate={{ scale: step === 1 ? 1.2 : 1 }}>x1</motion.div>
              <motion.div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]" animate={{ scale: step === 1 ? 1.2 : 1 }}>x2</motion.div>
            </div>
            <svg className="w-8 h-16" viewBox="0 0 30 60">
              {[0,1].map(i => [0,1,2].map(j => <line key={`${i}-${j}`} x1="0" y1={15+i*30} x2="30" y2={10+j*20} stroke="rgba(168,85,247,0.4)" strokeWidth="1" />))}
            </svg>
            <div className="flex flex-col gap-1 items-center">
              <div className="text-[8px] text-gray-400">Hidden</div>
              {[1,2,3].map(n => <motion.div key={n} className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-[9px]" animate={{ scale: step === 2 ? 1.2 : 1 }}>h{n}</motion.div>)}
              <div className="text-[7px] text-purple-400">ReLU</div>
            </div>
            <svg className="w-6 h-16" viewBox="0 0 20 60">
              {[0,1,2].map(j => <line key={j} x1="0" y1={10+j*20} x2="20" y2="30" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />)}
            </svg>
            <div className="flex flex-col items-center">
              <div className="text-[8px] text-gray-400">Out</div>
              <motion.div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]" animate={{ scale: step === 3 ? 1.2 : 1 }}>y</motion.div>
              <div className="text-[7px] text-emerald-400">Sigmoid</div>
            </div>
          </div>
        </div>

        {/* XOR Solved */}
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-emerald-500/30">
          <div className="text-[11px] text-emerald-400 font-semibold mb-1 text-center">XOR SOLVED!</div>
          <div className="flex gap-3 items-center">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <line x1="10" y1="90" x2="90" y2="90" stroke="white" strokeWidth="1" />
              <line x1="10" y1="90" x2="10" y2="10" stroke="white" strokeWidth="1" />
              <text x="92" y="93" fill="white" fontSize="9">x1</text>
              <text x="2" y="8" fill="white" fontSize="9">x2</text>
              {/* Non-linear boundaries */}
              <path d="M 10 90 Q 50 50 90 90" stroke="#a855f7" strokeWidth="2" fill="none" strokeDasharray="4" />
              <path d="M 10 10 Q 50 50 90 10" stroke="#a855f7" strokeWidth="2" fill="none" strokeDasharray="4" />
              {/* Points */}
              <circle cx="20" cy="80" r="8" fill="#ef4444" /><text x="17" y="83" fill="white" fontSize="8">0</text>
              <circle cx="80" cy="80" r="8" fill="#22c55e" /><text x="77" y="83" fill="white" fontSize="8">1</text>
              <circle cx="20" cy="20" r="8" fill="#22c55e" /><text x="17" y="23" fill="white" fontSize="8">1</text>
              <circle cx="80" cy="20" r="8" fill="#ef4444" /><text x="77" y="23" fill="white" fontSize="8">0</text>
            </svg>
            <div className="text-[9px] space-y-1">
              <p className="text-purple-400 font-semibold">Hidden layer creates curved boundary!</p>
              <p className="text-[var(--text-secondary)]">Each hidden neuron learns a linear boundary</p>
              <p className="text-[var(--text-secondary)]">Combined they form non-linear separation</p>
            </div>
          </div>
        </div>

        {/* Training Process */}
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
          <div className="text-[11px] text-blue-400 font-semibold mb-2 text-center">TRAINING PROCESS</div>
          <div className="space-y-1">
            <div className="p-1.5 rounded bg-blue-500/10 text-[9px]"><span className="text-blue-400 font-semibold">1. Forward:</span> <span className="text-[var(--text-secondary)]">h = ReLU(W1*x + b1), y = sigmoid(W2*h + b2)</span></div>
            <div className="p-1.5 rounded bg-amber-500/10 text-[9px]"><span className="text-amber-400 font-semibold">2. Loss:</span> <span className="text-[var(--text-secondary)]">BCE = -[y*log(p) + (1-y)*log(1-p)]</span></div>
            <div className="p-1.5 rounded bg-red-500/10 text-[9px]"><span className="text-red-400 font-semibold">3. Backprop:</span> <span className="text-[var(--text-secondary)]">dL/dW = chain rule through layers</span></div>
            <div className="p-1.5 rounded bg-emerald-500/10 text-[9px]"><span className="text-emerald-400 font-semibold">4. Update:</span> <span className="text-[var(--text-secondary)]">W = W - learning_rate * gradient</span></div>
          </div>
        </div>
      </div>

      {/* Row 2: Layer Details */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="text-[10px] font-semibold text-blue-400 mb-1">INPUT LAYER (2 neurons)</div>
          <div className="text-[9px] text-[var(--text-secondary)]">
            <p>Receives x1, x2 coordinates. No weights, just passes data. Example: XOR(1,0) sends [1,0] to hidden layer.</p>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
          <div className="text-[10px] font-semibold text-purple-400 mb-1">HIDDEN LAYER (3+ neurons, ReLU)</div>
          <div className="text-[9px] text-[var(--text-secondary)]">
            <p>ReLU: max(0, z). Creates non-linear transformation. Each neuron learns one linear boundary. Combined = curved separation.</p>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <div className="text-[10px] font-semibold text-emerald-400 mb-1">OUTPUT LAYER (1 neuron, Sigmoid)</div>
          <div className="text-[9px] text-[var(--text-secondary)]">
            <p>Sigmoid: 1/(1+e^-z) squashes to [0,1]. Output &gt; 0.5 = class 1. Example: XOR(1,0) outputs 0.95 = class 1.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// CNN Full Visualization
function CNNVisualization({ step }: { step: number }) {
  return (
    <div className="space-y-4">
      {/* Row 1: Pipeline */}
      <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
        <div className="text-[11px] text-blue-400 font-semibold mb-2 text-center">CNN PIPELINE (MNIST Digit Recognition)</div>
        <div className="flex items-end justify-center gap-2">
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 1 ? 1.1 : 1 }}>
            <div className="w-12 h-12 bg-gray-700 rounded grid grid-cols-5 gap-px p-0.5">{Array(25).fill(0).map((_, i) => <div key={i} className="bg-gray-500" style={{ opacity: 0.3 + Math.random() * 0.7 }} />)}</div>
            <div className="text-[8px] text-blue-400">Input 28x28</div>
          </motion.div>
          <span className="text-gray-500 mb-4">-&gt;</span>
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 2 ? 1.1 : 1 }}>
            <div className="flex gap-px">{[1,2,3].map(i => <div key={i} className="w-2 h-10 bg-blue-500/50 border border-blue-500/70 rounded-sm" />)}</div>
            <div className="text-[8px] text-blue-400">Conv 26x26x32</div>
          </motion.div>
          <span className="text-gray-500 mb-4">-&gt;</span>
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 3 ? 1.1 : 1 }}>
            <div className="flex gap-px">{[1,2,3].map(i => <div key={i} className="w-1.5 h-8 bg-cyan-500/50 border border-cyan-500/70 rounded-sm" />)}</div>
            <div className="text-[8px] text-cyan-400">Pool 13x13</div>
          </motion.div>
          <span className="text-gray-500 mb-4">-&gt;</span>
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 4 ? 1.1 : 1 }}>
            <div className="flex gap-px">{[1,2,3,4].map(i => <div key={i} className="w-1.5 h-8 bg-purple-500/50 border border-purple-500/70 rounded-sm" />)}</div>
            <div className="text-[8px] text-purple-400">Conv 11x11x64</div>
          </motion.div>
          <span className="text-gray-500 mb-4">-&gt;</span>
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 5 ? 1.1 : 1 }}>
            <div className="w-1 h-14 bg-amber-500/50 border border-amber-500/70 rounded-sm" />
            <div className="text-[8px] text-amber-400">Flatten 1600</div>
          </motion.div>
          <span className="text-gray-500 mb-4">-&gt;</span>
          <motion.div className="flex flex-col items-center" animate={{ scale: step === 6 ? 1.1 : 1 }}>
            <div className="flex flex-col gap-px">{[1,2,3,4].map(i => <div key={i} className="w-4 h-1.5 bg-emerald-500/50 border border-emerald-500/70 rounded-sm" />)}</div>
            <div className="text-[8px] text-emerald-400">Dense 128</div>
          </motion.div>
          <span className="text-gray-500 mb-4">-&gt;</span>
          <div className="flex flex-col items-center">
            <div className="flex gap-px h-10 items-end">{[0.01,0.02,0.02,0.9,0.01,0.01,0.01,0.01,0.01,0.00].map((p, i) => <div key={i} className={`w-1.5 rounded-t ${i === 3 ? 'bg-emerald-500' : 'bg-gray-600'}`} style={{ height: `${Math.max(4, p * 36)}px` }} />)}</div>
            <div className="text-[8px] text-emerald-400">Softmax 10</div>
          </div>
        </div>
      </div>

      {/* Row 2: Layer Details */}
      <div className="grid grid-cols-4 gap-3">
        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="text-[10px] font-semibold text-blue-400 mb-1">CONV2D LAYER</div>
          <div className="text-[9px] text-[var(--text-secondary)]">
            <p><span className="text-blue-300">Role:</span> Detects features (edges, textures)</p>
            <p><span className="text-blue-300">How:</span> 3x3 kernel slides over image</p>
            <p><span className="text-blue-300">Formula:</span> out = (in - k + 2p) / s + 1</p>
            <p><span className="text-blue-300">Example:</span> 28-3+0)/1+1 = 26</p>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
          <div className="text-[10px] font-semibold text-cyan-400 mb-1">MAXPOOL LAYER</div>
          <div className="text-[9px] text-[var(--text-secondary)]">
            <p><span className="text-cyan-300">Role:</span> Downsample, keep strongest</p>
            <p><span className="text-cyan-300">How:</span> Take max in 2x2 window</p>
            <p><span className="text-cyan-300">Benefit:</span> Translation invariance</p>
            <p><span className="text-cyan-300">Example:</span> 26/2 = 13</p>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <div className="text-[10px] font-semibold text-amber-400 mb-1">FLATTEN LAYER</div>
          <div className="text-[9px] text-[var(--text-secondary)]">
            <p><span className="text-amber-300">Role:</span> 3D to 1D for dense</p>
            <p><span className="text-amber-300">How:</span> Unroll all dimensions</p>
            <p><span className="text-amber-300">Formula:</span> H x W x C = vector</p>
            <p><span className="text-amber-300">Example:</span> 5x5x64 = 1600</p>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <div className="text-[10px] font-semibold text-emerald-400 mb-1">DENSE + SOFTMAX</div>
          <div className="text-[9px] text-[var(--text-secondary)]">
            <p><span className="text-emerald-300">Role:</span> Classification head</p>
            <p><span className="text-emerald-300">Softmax:</span> e^zi / sum(e^zj)</p>
            <p><span className="text-emerald-300">Output:</span> Probabilities sum to 1</p>
            <p><span className="text-emerald-300">Example:</span> [0.9, 0.05, 0.05...]</p>
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
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {/* Sequence Processing */}
        <div className="col-span-2 p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
          <div className="text-[11px] text-amber-400 font-semibold mb-2 text-center">LSTM SEQUENCE PROCESSING</div>
          <div className="flex items-center justify-center gap-2">
            {words.map((word, i) => (
              <div key={word} className="flex flex-col items-center">
                <motion.div className={`px-2 py-1 rounded text-[10px] ${step === i + 1 ? 'bg-blue-600 text-white' : 'bg-[var(--bg-secondary)]'}`} animate={{ scale: step === i + 1 ? 1.1 : 1 }}>{word}</motion.div>
                <div className="text-[7px] text-purple-400 my-0.5">embed</div>
                <motion.div className="w-14 h-10 rounded border-2 bg-amber-600/10 flex flex-col items-center justify-center" animate={{ borderColor: step === i + 1 ? '#f59e0b' : 'rgba(245,158,11,0.3)' }}>
                  <div className="text-[8px] text-amber-400 font-bold">LSTM</div>
                  <div className="text-[7px] text-gray-400">h{i},c{i}</div>
                </motion.div>
                {i < words.length - 1 && <div className="text-gray-500 text-xs">-&gt;</div>}
              </div>
            ))}
            <div className="ml-2 flex flex-col items-center">
              <div className="text-[8px] text-gray-400">Dense</div>
              <motion.div className="w-10 h-10 rounded-lg bg-emerald-600/30 border-2 border-emerald-500 flex items-center justify-center" animate={{ scale: step >= 5 ? 1.2 : 1 }}>
                <span className="text-emerald-400 font-bold">+</span>
              </motion.div>
              <div className="text-[8px] text-emerald-400">Positive</div>
            </div>
          </div>
        </div>

        {/* LSTM Cell */}
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-amber-500/30">
          <div className="text-[11px] text-amber-400 font-semibold mb-2 text-center">LSTM CELL GATES</div>
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded bg-red-500/30 border border-red-500 flex items-center justify-center text-[10px] text-red-400 font-bold">f</div>
              <div className="text-[7px] text-red-400">Forget</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded bg-blue-500/30 border border-blue-500 flex items-center justify-center text-[10px] text-blue-400 font-bold">i</div>
              <div className="text-[7px] text-blue-400">Input</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded bg-emerald-500/30 border border-emerald-500 flex items-center justify-center text-[10px] text-emerald-400 font-bold">o</div>
              <div className="text-[7px] text-emerald-400">Output</div>
            </div>
          </div>
          <div className="mt-2 text-[8px] text-gray-400 text-center">Cell state: long-term memory highway</div>
        </div>
      </div>

      {/* Gate Details */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30">
          <div className="text-[10px] font-semibold text-red-400">FORGET GATE</div>
          <div className="text-[9px] text-[var(--text-secondary)]">
            <p>Decides what to discard from cell state. ft = sigmoid(Wf*[ht-1, xt])</p>
            <p className="text-red-300">Example: Forget old subject when new one appears</p>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="text-[10px] font-semibold text-blue-400">INPUT GATE</div>
          <div className="text-[9px] text-[var(--text-secondary)]">
            <p>Decides what new info to store. it = sigmoid(Wi*[ht-1, xt])</p>
            <p className="text-blue-300">Example: Store new subject information</p>
          </div>
        </div>
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <div className="text-[10px] font-semibold text-emerald-400">OUTPUT GATE</div>
          <div className="text-[9px] text-[var(--text-secondary)]">
            <p>Decides what to output. ot = sigmoid(Wo*[ht-1, xt])</p>
            <p className="text-emerald-300">Example: Output verb form based on subject</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Transformer Full Visualization
function TransformerVisualization({ step }: { step: number }) {
  const words = ['The', 'cat', 'sat'];
  const attention = [[0.1,0.6,0.3],[0.3,0.2,0.5],[0.2,0.5,0.3]];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {/* Encoder */}
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
          <div className="text-[11px] text-purple-400 font-semibold mb-2 text-center">ENCODER BLOCK</div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1">{words.map(w => <motion.div key={w} className="px-1.5 py-0.5 rounded bg-blue-600/30 text-[9px]" animate={{ scale: step === 1 ? 1.1 : 1 }}>{w}</motion.div>)}</div>
            <div className="text-[7px] text-blue-400">+ Position</div>
            <motion.div className="w-full p-1.5 rounded border bg-purple-600/10 text-center" animate={{ borderColor: step === 2 ? '#a855f7' : 'rgba(168,85,247,0.3)' }}>
              <div className="text-[8px] text-purple-400">Multi-Head Attention</div>
            </motion.div>
            <div className="text-[7px] text-gray-400">Add + Norm</div>
            <motion.div className="w-full p-1.5 rounded border bg-emerald-600/10 text-center" animate={{ borderColor: step === 3 ? '#22c55e' : 'rgba(34,197,94,0.3)' }}>
              <div className="text-[8px] text-emerald-400">Feed Forward</div>
            </motion.div>
            <div className="text-[7px] text-gray-400">Add + Norm</div>
          </div>
        </div>

        {/* Attention Matrix */}
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-purple-500/30">
          <div className="text-[11px] text-purple-400 font-semibold mb-2 text-center">ATTENTION MATRIX</div>
          <div className="flex justify-center">
            <table className="text-[8px]">
              <thead><tr><th></th>{words.map(w => <th key={w} className="px-1 text-gray-400">{w}</th>)}</tr></thead>
              <tbody>
                {words.map((w, i) => (
                  <tr key={w}>
                    <td className="text-gray-400 pr-1">{w}</td>
                    {attention[i].map((a, j) => <td key={j} className="w-6 h-6 text-center rounded" style={{ backgroundColor: `rgba(168,85,247,${a})` }}>{a.toFixed(1)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-[8px] text-purple-300 text-center">Each word attends to all others</div>
        </div>

        {/* Q K V */}
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
          <div className="text-[11px] text-blue-400 font-semibold mb-2 text-center">Q, K, V MECHANISM</div>
          <div className="space-y-1">
            <div className="p-1 rounded bg-blue-500/10 text-[9px]"><span className="text-blue-400">Q (Query):</span> What am I looking for?</div>
            <div className="p-1 rounded bg-purple-500/10 text-[9px]"><span className="text-purple-400">K (Key):</span> What do I contain?</div>
            <div className="p-1 rounded bg-emerald-500/10 text-[9px]"><span className="text-emerald-400">V (Value):</span> What info to pass?</div>
            <div className="p-1 rounded bg-amber-500/10 text-[9px] font-mono">Att = softmax(QK^T/sqrt(d))*V</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="text-[10px] font-semibold text-blue-400">POSITIONAL ENCODING</div>
          <div className="text-[9px] text-[var(--text-secondary)]">Sin/cos functions encode position. Without it, "dog bites man" = "man bites dog".</div>
        </div>
        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
          <div className="text-[10px] font-semibold text-purple-400">MULTI-HEAD (8 heads)</div>
          <div className="text-[9px] text-[var(--text-secondary)]">8 parallel attention. Each learns different patterns (syntax, semantics, etc).</div>
        </div>
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <div className="text-[10px] font-semibold text-emerald-400">PARALLEL PROCESSING</div>
          <div className="text-[9px] text-[var(--text-secondary)]">All positions computed at once. Much faster than sequential RNN.</div>
        </div>
      </div>
    </div>
  );
}

// GAN Full Visualization
function GANVisualization({ step }: { step: number }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Architecture */}
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
          <div className="text-[11px] text-purple-400 font-semibold mb-2 text-center">GAN ARCHITECTURE</div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded bg-gray-700 grid grid-cols-3 gap-px p-0.5">{Array(9).fill(0).map((_, i) => <div key={i} className="bg-gray-500" style={{ opacity: Math.random() }} />)}</div>
              <div className="text-[7px] text-gray-400">Noise z</div>
            </div>
            <span className="text-gray-500">-&gt;</span>
            <motion.div className="p-2 rounded border-2 bg-emerald-600/10" animate={{ borderColor: step === 1 ? '#22c55e' : 'rgba(34,197,94,0.3)' }}>
              <div className="text-[9px] text-emerald-400 font-bold">Generator</div>
            </motion.div>
            <span className="text-gray-500">-&gt;</span>
            <motion.div className="w-10 h-10 rounded bg-gradient-to-br from-blue-500 to-purple-600" animate={{ scale: step === 2 ? 1.2 : 1 }} />
            <span className="text-gray-500">-&gt;</span>
            <motion.div className="p-2 rounded border-2 bg-amber-600/10" animate={{ borderColor: step === 3 ? '#f59e0b' : 'rgba(245,158,11,0.3)' }}>
              <div className="text-[9px] text-amber-400 font-bold">Discriminator</div>
            </motion.div>
            <span className="text-gray-500">-&gt;</span>
            <motion.div className={`px-2 py-1 rounded text-[10px] font-bold ${step % 2 === 0 ? 'bg-emerald-600/30 text-emerald-400' : 'bg-red-600/30 text-red-400'}`} animate={{ scale: step >= 4 ? 1.2 : 1 }}>{step % 2 === 0 ? 'Real?' : 'Fake?'}</motion.div>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-amber-500 to-red-600" />
            <div className="text-[8px] text-amber-400">Real Data</div>
            <span className="text-gray-500 text-xs">also to D</span>
          </div>
        </div>

        {/* Min-Max Game */}
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
          <div className="text-[11px] text-amber-400 font-semibold mb-2 text-center">MIN-MAX GAME</div>
          <div className="space-y-2">
            <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30">
              <div className="text-[10px] font-semibold text-emerald-400">Generator Loss</div>
              <div className="text-[9px] text-[var(--text-secondary)]">Wants D(G(z))=1 (fool discriminator)</div>
              <div className="text-[8px] font-mono text-emerald-300">min log(1 - D(G(z)))</div>
            </div>
            <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30">
              <div className="text-[10px] font-semibold text-amber-400">Discriminator Loss</div>
              <div className="text-[9px] text-[var(--text-secondary)]">Wants D(real)=1, D(fake)=0</div>
              <div className="text-[8px] font-mono text-amber-300">max log(D(x)) + log(1-D(G(z)))</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <div className="text-[10px] font-semibold text-emerald-400">GENERATOR</div>
          <div className="text-[9px] text-[var(--text-secondary)]">Takes random noise, outputs fake images. Dense-&gt;BN-&gt;ReLU-&gt;Deconv. Goal: Create realistic fakes.</div>
        </div>
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <div className="text-[10px] font-semibold text-amber-400">DISCRIMINATOR</div>
          <div className="text-[9px] text-[var(--text-secondary)]">CNN classifier: Real or Fake? Conv-&gt;LeakyReLU-&gt;Dense-&gt;Sigmoid. Goal: Detect fakes.</div>
        </div>
        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30">
          <div className="text-[10px] font-semibold text-red-400">CHALLENGES</div>
          <div className="text-[9px] text-[var(--text-secondary)]">Mode collapse (limited variety), training instability, G vs D balance critical.</div>
        </div>
      </div>
    </div>
  );
}

// Autoencoder Full Visualization
function AutoencoderVisualization({ step }: { step: number }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Architecture */}
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
          <div className="text-[11px] text-purple-400 font-semibold mb-2 text-center">AUTOENCODER ARCHITECTURE</div>
          <div className="flex items-end justify-center gap-1">
            <motion.div className="flex flex-col items-center" animate={{ scale: step === 1 ? 1.1 : 1 }}>
              <div className="w-12 h-12 bg-blue-600/30 border-2 border-blue-500 rounded grid grid-cols-4 gap-px p-0.5">{Array(16).fill(0).map((_, i) => <div key={i} className="bg-blue-400" style={{ opacity: 0.3 + Math.random() * 0.7 }} />)}</div>
              <div className="text-[8px] text-blue-400">Input 784</div>
            </motion.div>
            <div className="flex flex-col items-center">
              <div className="text-[7px] text-purple-400">Encoder</div>
              <div className="flex items-end gap-px">
                <motion.div className="w-2 h-10 bg-purple-600/40 border border-purple-500 rounded-sm" animate={{ scale: step === 2 ? 1.1 : 1 }} />
                <motion.div className="w-1.5 h-8 bg-purple-600/40 border border-purple-500 rounded-sm" animate={{ scale: step === 2 ? 1.1 : 1 }} />
                <motion.div className="w-1 h-6 bg-purple-600/40 border border-purple-500 rounded-sm" animate={{ scale: step === 2 ? 1.1 : 1 }} />
              </div>
              <div className="text-[7px] text-gray-400">256-64-32</div>
            </div>
            <motion.div className="px-2 py-3 rounded bg-amber-600/30 border-2 border-amber-500" animate={{ scale: step === 3 ? 1.2 : 1 }}>
              <div className="text-[11px] text-amber-400 font-bold">z</div>
              <div className="text-[7px] text-amber-300">8d</div>
            </motion.div>
            <div className="flex flex-col items-center">
              <div className="text-[7px] text-emerald-400">Decoder</div>
              <div className="flex items-end gap-px">
                <motion.div className="w-1 h-6 bg-emerald-600/40 border border-emerald-500 rounded-sm" animate={{ scale: step === 4 ? 1.1 : 1 }} />
                <motion.div className="w-1.5 h-8 bg-emerald-600/40 border border-emerald-500 rounded-sm" animate={{ scale: step === 4 ? 1.1 : 1 }} />
                <motion.div className="w-2 h-10 bg-emerald-600/40 border border-emerald-500 rounded-sm" animate={{ scale: step === 4 ? 1.1 : 1 }} />
              </div>
              <div className="text-[7px] text-gray-400">32-64-256</div>
            </div>
            <motion.div className="flex flex-col items-center" animate={{ scale: step === 5 ? 1.1 : 1 }}>
              <div className="w-12 h-12 bg-emerald-600/30 border-2 border-emerald-500 rounded grid grid-cols-4 gap-px p-0.5">{Array(16).fill(0).map((_, i) => <div key={i} className="bg-emerald-400" style={{ opacity: 0.3 + Math.random() * 0.7 }} />)}</div>
              <div className="text-[8px] text-emerald-400">Output 784</div>
            </motion.div>
          </div>
        </div>

        {/* Loss and Training */}
        <div className="p-3 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
          <div className="text-[11px] text-red-400 font-semibold mb-2 text-center">RECONSTRUCTION LOSS</div>
          <div className="space-y-2">
            <div className="p-2 rounded bg-red-500/10 border border-red-500/30">
              <div className="text-[10px] font-semibold text-red-400">MSE Loss</div>
              <div className="text-[9px] font-mono text-red-300">L = ||x - x_hat||^2</div>
              <div className="text-[8px] text-[var(--text-secondary)]">Sum of squared differences between input and output</div>
            </div>
            <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30">
              <div className="text-[10px] font-semibold text-amber-400">Bottleneck Forces Compression</div>
              <div className="text-[8px] text-[var(--text-secondary)]">784 -&gt; 8 dimensions. Must learn only essential features to reconstruct.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
          <div className="text-[10px] font-semibold text-purple-400">ENCODER</div>
          <div className="text-[9px] text-[var(--text-secondary)]">Compresses input to latent z. Learns to extract essential features only.</div>
        </div>
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <div className="text-[10px] font-semibold text-amber-400">LATENT SPACE</div>
          <div className="text-[9px] text-[var(--text-secondary)]">Compressed representation. Similar inputs cluster together.</div>
        </div>
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <div className="text-[10px] font-semibold text-emerald-400">DECODER</div>
          <div className="text-[9px] text-[var(--text-secondary)]">Reconstructs from z. Mirror of encoder architecture.</div>
        </div>
        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="text-[10px] font-semibold text-blue-400">APPLICATIONS</div>
          <div className="text-[9px] text-[var(--text-secondary)]">Denoising, anomaly detection, dimensionality reduction, feature learning.</div>
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
      initial={{ y: 400 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 25 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -top-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-t-lg bg-[var(--bg-secondary)] border border-b-0 border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs flex items-center gap-2"
      >
        <span className="font-semibold">Live Architecture Guide</span>
        <motion.svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ rotate: isExpanded ? 180 : 0 }}>
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
                  {titles[currentArchitecture] || 'Architecture Guide'}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-[var(--text-muted)]">Step {step + 1}/6</span>
                  <button onClick={() => setStep(s => (s + 1) % 6)} className="px-3 py-1.5 text-[10px] rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Next Step
                  </button>
                  <button onClick={() => setIsExpanded(false)} className="p-1.5 rounded hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                {getVisualization()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
