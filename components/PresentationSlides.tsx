'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Play, Maximize2, AlertTriangle, 
  Brain, TrendingDown, Zap, Target, Users, Rocket
} from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "AI's Memory Crisis",
    subtitle: "The Hidden Flaw in Every AI System",
    content: [
      "50%+ of memories are lost or corrupted",
      "AI fabricates false memories about users",
      "Problem worsens with longer conversations",
      "Affects ALL current AI systems"
    ],
    icon: AlertTriangle,
    color: "from-red-500 to-orange-500",
    notes: "Start with shock value - this isn't about general hallucinations, it's about YOUR data"
  },
  {
    id: 2,
    title: "What is Memory Hallucination?",
    subtitle: "4 Types of System Failures",
    content: [
      "🔴 Fabrication: Creating memories that never existed",
      "🟠 Error: Getting key details wrong (names, dates)",
      "🟡 Conflict: Keeping contradictory memories active",
      "🟣 Omission: Completely forgetting crucial information"
    ],
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    notes: "Use examples: 'You like parrots' → 'User dislikes parrots'"
  },
  {
    id: 3,
    title: "The Shocking Numbers",
    subtitle: "HaluMem Research Findings",
    content: [
      "43% - Maximum recall rate (Mem0)",
      "14.5% - Worst recall rate (Memobase)",
      "74%+ - Update omission rate",
      "96.8% - Performance drop at 1M tokens",
      "0 - Systems achieving acceptable accuracy"
    ],
    icon: TrendingDown,
    color: "from-red-500 to-red-700",
    notes: "Pause on each number for emphasis - these are PRODUCTION systems"
  },
  {
    id: 4,
    title: "How Memory Should Work",
    subtitle: "The 4-Stage Pipeline",
    content: [
      "1️⃣ Extract: Identify key information",
      "2️⃣ Store: Save as structured memory",
      "3️⃣ Update: Modify when new info arrives",
      "4️⃣ Retrieve: Fetch relevant context"
    ],
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    notes: "Show the success flow first, then contrast with failure cascade"
  },
  {
    id: 5,
    title: "The Cascade of Failure",
    subtitle: "How Errors Compound",
    content: [
      "❌ Bad extraction → Wrong storage",
      "❌ Wrong storage → Failed updates",
      "❌ Failed updates → Hallucinated responses",
      "Result: Complete system failure"
    ],
    icon: AlertTriangle,
    color: "from-orange-500 to-red-500",
    notes: "Emphasize that one error triggers a cascade - it's architectural"
  },
  {
    id: 6,
    title: "Context Length Catastrophe",
    subtitle: "Performance vs Conversation Length",
    content: [
      "1K tokens: 43% recall",
      "10K tokens: 35% recall",
      "100K tokens: 8% recall",
      "1M tokens: 3.2% recall",
      "Longer conversation = Worse memory"
    ],
    icon: TrendingDown,
    color: "from-yellow-500 to-orange-500",
    notes: "Show the graph - this kills the 'just use longer context' argument"
  },
  {
    id: 7,
    title: "System Comparison",
    subtitle: "All Systems Fail",
    content: [
      "✅ Supermemory: 53% recall (best)",
      "⚠️ Mem0: 43% recall, 25% update accuracy",
      "⚠️ Mem0-Graph: 42% recall, 1.4% update accuracy",
      "❌ Memobase: 14.5% recall (worst)",
      "All have >74% omission rates"
    ],
    icon: Target,
    color: "from-indigo-500 to-purple-500",
    notes: "No system is production-ready - they ALL fail"
  },
  {
    id: 8,
    title: "Why This Matters",
    subtitle: "Impact on AI Development",
    content: [
      "🚫 Can't build reliable AI agents",
      "🚫 Can't maintain user preferences",
      "🚫 Can't track project state",
      "🚫 Can't be trusted with critical tasks",
      "This blocks AGI progress"
    ],
    icon: Brain,
    color: "from-purple-600 to-blue-600",
    notes: "Connect to real-world implications - this affects everyone using AI"
  },
  {
    id: 9,
    title: "Technical Deep Dive",
    subtitle: "For AI Engineers",
    content: [
      "Current architectures lack:",
      "• Reliable correlation between operations",
      "• Constraints on memory formation",
      "• Interpretable memory mechanisms",
      "• Dedicated models for each operation"
    ],
    icon: Zap,
    color: "from-green-500 to-teal-500",
    notes: "Get technical here - explain WHY current approaches fail"
  },
  {
    id: 10,
    title: "The Path Forward",
    subtitle: "Solutions & Next Steps",
    content: [
      "✓ Operational-level evaluation (HaluMem)",
      "✓ Constrained memory mechanisms",
      "✓ User confirmation for memories",
      "✓ Audit trails for modifications",
      "✓ Dedicated models per operation"
    ],
    icon: Rocket,
    color: "from-blue-500 to-indigo-500",
    notes: "End with hope - we can fix this, but need fundamental changes"
  },
  {
    id: 11,
    title: "Call to Action",
    subtitle: "Join the Solution",
    content: [
      "📖 Read the HaluMem paper",
      "🧪 Test your own systems",
      "💡 Contribute solutions",
      "🎯 Demand reliable AI memory",
      "The future of AI depends on solving this"
    ],
    icon: Users,
    color: "from-purple-500 to-pink-500",
    notes: "Engage the audience - they can be part of the solution"
  }
];

export default function PresentationSlides() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'f') setIsFullscreen(!isFullscreen);
  };

  // Add keyboard navigation
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyPress);
  }

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-black p-8' : ''}`}>
      {/* Slide Counter */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-white/70 text-sm">
          Slide {currentSlide + 1} of {slides.length}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="glass px-3 py-1 rounded text-white/70 hover:text-white text-sm"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className={`glass rounded-3xl overflow-hidden ${isFullscreen ? 'h-[calc(100vh-200px)]' : 'min-h-[500px]'}`}
        >
          {/* Gradient Header */}
          <div className={`h-2 bg-gradient-to-r ${slide.color}`} />
          
          <div className="p-12">
            {/* Icon and Title */}
            <div className="flex items-center gap-6 mb-8">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${slide.color} bg-opacity-20`}>
                <Icon className="w-12 h-12 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">{slide.title}</h2>
                <p className="text-xl text-white/80">{slide.subtitle}</p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              {slide.content.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-lg text-white/90 flex items-start gap-3"
                >
                  <div className="mt-1.5 w-2 h-2 bg-white/60 rounded-full flex-shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`glass px-6 py-3 rounded-lg flex items-center gap-2 text-white transition-all
            ${currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        {/* Progress Bar */}
        <div className="flex-1 mx-8">
          <div className="bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`glass px-6 py-3 rounded-lg flex items-center gap-2 text-white transition-all
            ${currentSlide === slides.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20'}`}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="text-center text-white/50 text-sm">
        <span className="inline-flex gap-4">
          <span>← → Navigate</span>
          <span>Space: Next</span>
          <span>F: Fullscreen</span>
        </span>
      </div>
    </div>
  );
}
