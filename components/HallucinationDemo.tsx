'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Bot, AlertTriangle, XCircle, RefreshCw, AlertCircle,
  Play, RotateCcw, ArrowRight, CheckCircle, Brain, MessageSquare
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  memory?: string;
  hallucination?: 'fabrication' | 'error' | 'conflict' | 'omission';
}

interface Memory {
  id: string;
  fact: string;
  correct: boolean;
  timestamp: Date;
  status: 'active' | 'outdated' | 'conflicted';
}

export default function HallucinationDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentDemo, setCurrentDemo] = useState<string>('');
  
  const demos = {
    fabrication: {
      title: 'Fabrication Demo',
      icon: AlertTriangle,
      color: 'text-red-400',
      scenario: [
        { type: 'user', text: "I recently started liking parrots. They're amazing birds!" },
        { type: 'ai', text: "I understand you dislike parrots. I'll remember that.", memory: "User dislikes parrots ❌", hallucination: 'fabrication' },
        { type: 'user', text: "Wait, what? I said I like them!" },
        { type: 'ai', text: "I apologize for the confusion. Based on my memory, you mentioned you dislike parrots.", hallucination: 'fabrication' }
      ]
    },
    error: {
      title: 'Error Demo',
      icon: XCircle,
      color: 'text-orange-400',
      scenario: [
        { type: 'user', text: "My friend Joseph just got promoted to senior engineer." },
        { type: 'ai', text: "That's great news about Mark's promotion!", memory: "Friend Mark promoted ❌", hallucination: 'error' },
        { type: 'user', text: "It's Joseph, not Mark." },
        { type: 'ai', text: "You're right, I apologize. Mark is now a senior engineer according to my notes.", hallucination: 'error' }
      ]
    },
    conflict: {
      title: 'Conflict Demo',
      icon: RefreshCw,
      color: 'text-yellow-400',
      scenario: [
        { type: 'user', text: "I'm feeling much better now after recovering from the flu." },
        { type: 'ai', text: "Glad to hear your health has improved!", memory: "Health: Good ✓ | Health: Poor ✓", hallucination: 'conflict' },
        { type: 'user', text: "How's my health status?" },
        { type: 'ai', text: "According to my records, you're both in good health and poor health. There seems to be conflicting information.", hallucination: 'conflict' }
      ]
    },
    omission: {
      title: 'Omission Demo',
      icon: AlertCircle,
      color: 'text-purple-400',
      scenario: [
        { type: 'user', text: "I got promoted to Senior Research Scientist yesterday!" },
        { type: 'ai', text: "Congratulations on your promotion!", memory: "Promotion recorded ✓" },
        { type: 'user', text: "What's my current job title?" },
        { type: 'ai', text: "I don't have information about your current job title. Could you tell me what you do?", hallucination: 'omission' }
      ]
    }
  };

  const runDemo = (demoType: string) => {
    setIsRunning(true);
    setCurrentDemo(demoType);
    setMessages([]);
    setMemories([]);
    
    const demo = demos[demoType as keyof typeof demos];
    let messageIndex = 0;
    
    const interval = setInterval(() => {
      if (messageIndex < demo.scenario.length) {
        const msg = demo.scenario[messageIndex];
        const newMessage: Message = {
          id: Date.now().toString(),
          type: msg.type as 'user' | 'ai',
          text: msg.text,
          memory: msg.memory,
          hallucination: msg.hallucination as 'fabrication' | 'error' | 'conflict' | 'omission' | undefined
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        // Update memory bank if AI message with memory
        if (msg.type === 'ai' && msg.memory) {
          const newMemory: Memory = {
            id: Date.now().toString(),
            fact: msg.memory,
            correct: !msg.hallucination,
            timestamp: new Date(),
            status: msg.hallucination === 'conflict' ? 'conflicted' : 
                   msg.hallucination === 'omission' ? 'outdated' : 'active'
          };
          setMemories(prev => [...prev, newMemory]);
        }
        
        messageIndex++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 2000);
  };

  const reset = () => {
    setMessages([]);
    setMemories([]);
    setCurrentDemo('');
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Demo Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(demos).map(([key, demo]) => {
          const Icon = demo.icon;
          return (
            <button
              key={key}
              onClick={() => !isRunning && runDemo(key)}
              disabled={isRunning}
              className={`
                glass rounded-xl p-4 transition-all text-center
                ${currentDemo === key ? 'ring-2 ring-white scale-105' : ''}
                ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}
              `}
            >
              <Icon className={`w-8 h-8 ${demo.color} mx-auto mb-2`} />
              <h3 className="font-bold text-white">{demo.title}</h3>
            </button>
          );
        })}
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-4">
        {!isRunning && currentDemo && (
          <button
            onClick={() => runDemo(currentDemo)}
            className="glass px-6 py-3 rounded-lg flex items-center gap-2 text-white hover:bg-white/20 transition-all"
          >
            <Play className="w-5 h-5" />
            Replay Demo
          </button>
        )}
        <button
          onClick={reset}
          className="glass px-6 py-3 rounded-lg flex items-center gap-2 text-white hover:bg-white/20 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>

      {/* Main Demo Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversation */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Conversation
          </h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex gap-3 ${msg.type === 'ai' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${msg.type === 'user' ? 'bg-blue-500' : 'bg-purple-500'}
                  `}>
                    {msg.type === 'user' ? <User className="w-6 h-6 text-white" /> : <Bot className="w-6 h-6 text-white" />}
                  </div>
                  <div className={`
                    flex-1 p-4 rounded-xl
                    ${msg.type === 'user' ? 'bg-blue-500/20' : 'bg-purple-500/20'}
                  `}>
                    <p className="text-white">{msg.text}</p>
                    {msg.hallucination && (
                      <div className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        Hallucination: {msg.hallucination}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {messages.length === 0 && (
              <div className="text-center text-white/50 py-8">
                Select a demo above to see memory hallucinations in action
              </div>
            )}
          </div>
        </div>

        {/* Memory Bank */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            AI Memory Bank
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {memories.map((memory, index) => (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    p-3 rounded-lg border
                    ${memory.correct 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : 'bg-red-500/10 border-red-500/30'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-white flex-1">{memory.fact}</p>
                    {memory.correct ? (
                      <CheckCircle className="w-5 h-5 text-green-400 ml-2" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 ml-2" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`
                      text-xs px-2 py-1 rounded-full
                      ${memory.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        memory.status === 'conflicted' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'}
                    `}>
                      {memory.status}
                    </span>
                    <span className="text-xs text-white/50">
                      {memory.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {memories.length === 0 && (
              <div className="text-center text-white/50 py-8">
                Memory bank will populate during demo
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explanation */}
      {currentDemo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-3">What happened?</h3>
          <p className="text-white/90">
            {currentDemo === 'fabrication' && "The AI created a false memory that was never mentioned. The user said they liked parrots, but the system stored the opposite."}
            {currentDemo === 'error' && "The AI retrieved the memory but got key details wrong. It confused 'Joseph' with 'Mark', corrupting the stored information."}
            {currentDemo === 'conflict' && "The AI failed to update old memories, resulting in contradictory information coexisting in the memory bank."}
            {currentDemo === 'omission' && "The AI completely failed to retrieve crucial information that was previously stored, showing immediate memory loss."}
          </p>
        </motion.div>
      )}
    </div>
  );
}
