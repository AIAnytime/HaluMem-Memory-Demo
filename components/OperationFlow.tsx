'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Database, Edit, RefreshCw, CheckCircle, XCircle,
  ArrowRight, MessageSquare, Brain, AlertTriangle, Play, Pause
} from 'lucide-react';

interface Operation {
  id: string;
  type: 'extract' | 'store' | 'update' | 'retrieve';
  status: 'pending' | 'processing' | 'success' | 'error';
  input: string;
  output: string;
  error?: string;
}

export default function OperationFlow() {
  const [operations, setOperations] = useState<Operation[]>([
    { id: '1', type: 'extract', status: 'pending', input: '', output: '' },
    { id: '2', type: 'store', status: 'pending', input: '', output: '' },
    { id: '3', type: 'update', status: 'pending', input: '', output: '' },
    { id: '4', type: 'retrieve', status: 'pending', input: '', output: '' },
  ]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const scenarios = {
    success: {
      name: 'Successful Flow',
      steps: [
        { type: 'extract', input: 'User: "I work at OpenAI as an engineer"', output: 'Extracted: workplace=OpenAI, role=engineer', success: true },
        { type: 'store', input: 'workplace=OpenAI, role=engineer', output: 'Stored with ID: mem_001', success: true },
        { type: 'update', input: 'User: "Got promoted to senior engineer"', output: 'Updated: role=senior engineer', success: true },
        { type: 'retrieve', input: 'Query: "What is my job?"', output: 'Retrieved: senior engineer at OpenAI', success: true }
      ]
    },
    failure: {
      name: 'Failure Cascade',
      steps: [
        { type: 'extract', input: 'User: "I love science fiction books"', output: 'Extracted: dislikes=science fiction ❌', success: false, error: 'Fabrication: Inverted preference' },
        { type: 'store', input: 'dislikes=science fiction', output: 'Stored incorrect data', success: false },
        { type: 'update', input: 'User: "Just finished reading Dune"', output: 'Failed to update: conflicting memory', success: false, error: 'Update omission: 74% failure rate' },
        { type: 'retrieve', input: 'Query: "Book preferences?"', output: 'Retrieved: User dislikes sci-fi ❌', success: false, error: 'Hallucinated response' }
      ]
    }
  };

  const runScenario = (scenarioKey: 'success' | 'failure') => {
    setIsPlaying(true);
    setCurrentStep(-1);
    
    // Reset operations
    setOperations(operations.map(op => ({ ...op, status: 'pending', input: '', output: '', error: undefined })));
    
    const scenario = scenarios[scenarioKey];
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      if (stepIndex < scenario.steps.length) {
        const step = scenario.steps[stepIndex];
        setCurrentStep(stepIndex);
        
        setOperations(prev => prev.map((op, idx) => {
          if (idx === stepIndex) {
            return {
              ...op,
              status: 'processing',
              input: step.input,
            };
          }
          return op;
        }));
        
        // Simulate processing delay
        setTimeout(() => {
          setOperations(prev => prev.map((op, idx) => {
            if (idx === stepIndex) {
              return {
                ...op,
                status: step.success ? 'success' : 'error',
                output: step.output,
                error: step.error
              };
            }
            return op;
          }));
        }, 1000);
        
        stepIndex++;
      } else {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 2500);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'extract': return Search;
      case 'store': return Database;
      case 'update': return Edit;
      case 'retrieve': return RefreshCw;
      default: return MessageSquare;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400 border-green-400 bg-green-400/10';
      case 'error': return 'text-red-400 border-red-400 bg-red-400/10';
      case 'processing': return 'text-blue-400 border-blue-400 bg-blue-400/10 animate-pulse';
      default: return 'text-gray-400 border-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => runScenario('success')}
          disabled={isPlaying}
          className="glass px-6 py-3 rounded-lg flex items-center gap-2 text-white hover:bg-white/20 transition-all disabled:opacity-50"
        >
          <CheckCircle className="w-5 h-5" />
          Run Success Flow
        </button>
        <button
          onClick={() => runScenario('failure')}
          disabled={isPlaying}
          className="glass px-6 py-3 rounded-lg flex items-center gap-2 text-white hover:bg-white/20 transition-all disabled:opacity-50"
        >
          <XCircle className="w-5 h-5" />
          Run Failure Flow
        </button>
      </div>

      {/* Operation Pipeline */}
      <div className="glass rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-8 text-center">Memory Operation Pipeline</h3>
        
        <div className="flex items-center justify-between">
          {operations.map((operation, index) => {
            const Icon = getIcon(operation.type);
            const isActive = index === currentStep;
            
            return (
              <div key={operation.id} className="flex items-center flex-1">
                <motion.div
                  className="flex-1"
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    opacity: operation.status !== 'pending' ? 1 : 0.5
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`
                    border-2 rounded-xl p-6 transition-all
                    ${getStatusColor(operation.status)}
                  `}>
                    <div className="flex items-center justify-center mb-3">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-center capitalize mb-2">{operation.type}</h4>
                    
                    {operation.status !== 'pending' && (
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-xs space-y-2"
                        >
                          {operation.input && (
                            <div className="bg-black/30 rounded p-2">
                              <div className="font-semibold mb-1">Input:</div>
                              <div className="text-white/80">{operation.input}</div>
                            </div>
                          )}
                          {operation.output && (
                            <div className="bg-black/30 rounded p-2">
                              <div className="font-semibold mb-1">Output:</div>
                              <div className="text-white/80">{operation.output}</div>
                            </div>
                          )}
                          {operation.error && (
                            <div className="bg-red-900/30 rounded p-2 border border-red-500/50">
                              <div className="flex items-start gap-1">
                                <AlertTriangle className="w-3 h-3 mt-0.5" />
                                <div className="text-red-300">{operation.error}</div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    )}
                    
                    {/* Status indicator */}
                    <div className="flex justify-center mt-3">
                      {operation.status === 'success' && <CheckCircle className="w-6 h-6 text-green-400" />}
                      {operation.status === 'error' && <XCircle className="w-6 h-6 text-red-400" />}
                      {operation.status === 'processing' && (
                        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      )}
                    </div>
                  </div>
                </motion.div>
                
                {index < operations.length - 1 && (
                  <ArrowRight className={`
                    w-8 h-8 mx-4 transition-all
                    ${index < currentStep ? 'text-white' : 'text-white/30'}
                  `} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            How Memory Operations Work
          </h4>
          <div className="space-y-3 text-sm text-white/90">
            <div>
              <span className="font-semibold text-blue-400">1. Extract:</span> Identify and pull out key information from user conversations.
            </div>
            <div>
              <span className="font-semibold text-green-400">2. Store:</span> Save extracted information as structured memory points with metadata.
            </div>
            <div>
              <span className="font-semibold text-yellow-400">3. Update:</span> Modify existing memories when new, contradictory information arrives.
            </div>
            <div>
              <span className="font-semibold text-purple-400">4. Retrieve:</span> Fetch relevant memories to provide context for responses.
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Common Failure Points
          </h4>
          <div className="space-y-3 text-sm text-white/90">
            <div>
              <span className="font-semibold text-red-400">Extraction Errors:</span> 43% recall rate means over half of important info is missed.
            </div>
            <div>
              <span className="font-semibold text-orange-400">Storage Corruption:</span> 40% of stored memories contain fabricated or wrong details.
            </div>
            <div>
              <span className="font-semibold text-yellow-400">Update Failures:</span> 74%+ omission rate when updating existing memories.
            </div>
            <div>
              <span className="font-semibold text-purple-400">Retrieval Issues:</span> Cascading errors from upstream failures affect final output.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
