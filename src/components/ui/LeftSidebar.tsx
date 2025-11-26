'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useNetworkStore, ArchitectureType } from '@/store/networkStore';
import { architectureTemplates, layers as layerDefinitions } from '@/data/curriculum';

// Icons
const icons = {
  perceptron: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="12" r="2" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
  mlp: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="4" cy="8" r="2" /><circle cx="4" cy="16" r="2" />
      <circle cx="12" cy="6" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="18" r="2" />
      <circle cx="20" cy="12" r="2" />
      <line x1="6" y1="8" x2="10" y2="6" /><line x1="6" y1="8" x2="10" y2="12" />
      <line x1="6" y1="16" x2="10" y2="12" /><line x1="6" y1="16" x2="10" y2="18" />
      <line x1="14" y1="6" x2="18" y2="12" /><line x1="14" y1="12" x2="18" y2="12" />
      <line x1="14" y1="18" x2="18" y2="12" />
    </svg>
  ),
  cnn: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="6" width="6" height="12" rx="1" />
      <rect x="10" y="8" width="5" height="8" rx="1" />
      <rect x="17" y="10" width="4" height="4" rx="1" />
    </svg>
  ),
  rnn: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 8 C16 4, 20 8, 16 12" />
      <path d="M12 16 C8 20, 4 16, 8 12" />
    </svg>
  ),
  autoencoder: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="4,8 12,12 20,8" />
      <polyline points="4,16 12,12 20,16" />
    </svg>
  ),
  transformer: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <line x1="10" y1="6.5" x2="14" y2="6.5" />
      <line x1="10" y1="17.5" x2="14" y2="17.5" />
      <line x1="6.5" y1="10" x2="6.5" y2="14" />
      <line x1="17.5" y1="10" x2="17.5" y2="14" />
    </svg>
  ),
  gan: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="7" cy="12" r="4" />
      <circle cx="17" cy="12" r="4" />
      <path d="M11 12 L13 12" strokeDasharray="1 1" />
      <path d="M7 8 L7 4 M17 8 L17 4" />
      <path d="M7 16 L7 20 M17 16 L17 20" />
    </svg>
  ),
  custom: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )
};

const layerIcons: Record<string, JSX.Element> = {
  dense: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="8" cy="6" r="2" /><circle cx="8" cy="12" r="2" /><circle cx="8" cy="18" r="2" />
      <circle cx="16" cy="9" r="2" /><circle cx="16" cy="15" r="2" />
    </svg>
  ),
  conv2d: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="8" y="8" width="4" height="4" fill="currentColor" />
    </svg>
  ),
  maxpool2d: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="7" height="7" />
      <rect x="13" y="4" width="7" height="7" />
      <rect x="4" y="13" width="7" height="7" />
      <rect x="13" y="13" width="7" height="7" />
      <circle cx="16.5" cy="7.5" r="1.5" fill="currentColor" />
    </svg>
  ),
  flatten: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="6" height="6" />
      <rect x="4" y="14" width="6" height="6" />
      <line x1="14" y1="12" x2="20" y2="12" />
      <circle cx="17" cy="12" r="2" />
    </svg>
  ),
  dropout: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="8" cy="8" r="2" opacity="0.3" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="8" cy="16" r="2" />
      <circle cx="16" cy="16" r="2" opacity="0.3" />
    </svg>
  ),
  batchnorm: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 18 L12 6 L20 18" />
      <line x1="4" y1="12" x2="20" y2="12" strokeDasharray="2 2" />
    </svg>
  ),
  lstm: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="12" y1="6" x2="12" y2="18" />
    </svg>
  ),
  embedding: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6" cy="12" r="2" />
      <rect x="12" y="6" width="8" height="12" rx="1" />
      <line x1="8" y1="12" x2="12" y2="12" />
    </svg>
  ),
  attention: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2 L12 5" />
      <path d="M12 19 L12 22" />
      <path d="M2 12 L5 12" />
      <path d="M19 12 L22 12" />
      <path d="M4.93 4.93 L7.05 7.05" />
      <path d="M16.95 16.95 L19.07 19.07" />
      <path d="M4.93 19.07 L7.05 16.95" />
      <path d="M16.95 7.05 L19.07 4.93" />
    </svg>
  )
};

export default function LeftSidebar() {
  const { 
    ui, 
    currentArchitecture, 
    layers,
    setArchitecture, 
    addLayer,
    removeLayer,
    toggleLeftPanel 
  } = useNetworkStore();
  
  const architectures: { id: ArchitectureType; name: string; desc: string }[] = [
    { id: 'perceptron', name: 'Perceptron', desc: 'Single layer classifier' },
    { id: 'mlp', name: 'MLP', desc: 'Multi-Layer Perceptron' },
    { id: 'cnn', name: 'CNN', desc: 'Convolutional Network' },
    { id: 'rnn', name: 'RNN/LSTM', desc: 'Recurrent Network' },
    { id: 'transformer', name: 'Transformer', desc: 'Attention-based NLP' },
    { id: 'gan', name: 'GAN', desc: 'Generative Adversarial' },
    { id: 'autoencoder', name: 'Autoencoder', desc: 'Encoder-Decoder' },
  ];
  
  const availableLayers = [
    { type: 'dense', name: 'Dense' },
    { type: 'conv2d', name: 'Conv2D' },
    { type: 'maxpool2d', name: 'MaxPool2D' },
    { type: 'flatten', name: 'Flatten' },
    { type: 'dropout', name: 'Dropout' },
    { type: 'batchnorm', name: 'BatchNorm' },
    { type: 'lstm', name: 'LSTM' },
    { type: 'attention', name: 'Attention' },
  ];

  return (
    <AnimatePresence>
      {ui.leftPanelOpen && (
        <motion.aside
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -320, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed left-0 top-0 h-full w-80 glass-strong z-40 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h1 className="font-display text-xl font-bold gradient-text">
                AI Visualizer
              </h1>
              <button
                onClick={toggleLeftPanel}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Neural Network Architecture Explorer
            </p>
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {/* Architecture Selection */}
          <div className="p-4 border-b border-white/10">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Architecture
            </h2>
            <div className="space-y-2">
              {architectures.map((arch) => (
                <motion.button
                  key={arch.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setArchitecture(arch.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    currentArchitecture === arch.id
                      ? 'bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    currentArchitecture === arch.id ? 'bg-neon-blue/20 text-neon-blue' : 'bg-white/5 text-gray-400'
                  }`}>
                    {icons[arch.id] || icons.custom}
                  </div>
                  <div className="text-left">
                    <div className={`font-medium ${currentArchitecture === arch.id ? 'text-white' : 'text-gray-300'}`}>
                      {arch.name}
                    </div>
                    <div className="text-xs text-gray-500">{arch.desc}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Layer Builder */}
          <div className="p-4 border-b border-white/10">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Add Layer
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {availableLayers.map((layer) => (
                <motion.button
                  key={layer.type}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addLayer(layer.type as any)}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 
                           border border-white/5 hover:border-neon-purple/30 transition-all text-sm"
                >
                  <span className="text-neon-purple">
                    {layerIcons[layer.type] || layerIcons.dense}
                  </span>
                  <span className="text-gray-300">{layer.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Current Network Layers */}
          <div className="flex-1 overflow-y-auto p-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Network Layers ({layers.length})
            </h2>
            <div className="space-y-2">
              {layers.map((layer, index) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="layer-card p-3 rounded-lg bg-void-lighter flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-gray-500 w-4">{index}</span>
                    <div className="text-neon-blue/70">
                      {layerIcons[layer.type] || layerIcons.dense}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-200">{layer.name}</div>
                      <div className="text-xs text-gray-500">
                        {layer.type === 'dense' && `${layer.params.units} units`}
                        {layer.type === 'conv2d' && `${layer.params.filters} filters`}
                        {layer.type === 'dropout' && `${((layer.params.rate as number) * 100).toFixed(0)}%`}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeLayer(layer.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 
                             text-gray-500 hover:text-red-400 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Theme Selector */}
          <div className="p-4 border-t border-white/10">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Theme
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'dark', color: 'bg-gray-900', label: 'Dark' },
                { id: 'light', color: 'bg-gray-100', label: 'Light' },
                { id: 'midnight', color: 'bg-indigo-950', label: 'Midnight' },
                { id: 'ocean', color: 'bg-cyan-950', label: 'Ocean' }
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => useNetworkStore.getState().setTheme(theme.id as any)}
                  className={`aspect-square rounded-lg ${theme.color} border-2 transition-all
                    ${ui.theme === theme.id ? 'border-neon-blue scale-110' : 'border-white/10 hover:border-white/30'}`}
                  title={theme.label}
                />
              ))}
            </div>
          </div>
          </div>
          
          {/* Start Tour Button - Fixed at bottom */}
          <div className="p-4 border-t border-white/10 shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => useNetworkStore.getState().startTour()}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple
                       text-white font-medium btn-neon flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Start Interactive Tour
            </motion.button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

