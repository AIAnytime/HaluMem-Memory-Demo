'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  BarChart3, 
  MessageSquare, 
  Database,
  RefreshCw,
  Search,
  Edit,
  Zap,
  AlertCircle,
  TrendingDown,
  ChevronRight,
  Play
} from 'lucide-react';
import HallucinationDemo from '../components/HallucinationDemo';
import MetricsChart from '../components/MetricsChart';
import OperationFlow from '../components/OperationFlow';
import ComparisonTable from '../components/ComparisonTable';
import PresentationSlides from '../components/PresentationSlides';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Brain },
    { id: 'demo', label: 'Live Demo', icon: Play },
    { id: 'operations', label: 'Operations', icon: Zap },
    { id: 'metrics', label: 'Metrics', icon: BarChart3 },
    { id: 'comparison', label: 'System Comparison', icon: Database },
    { id: 'slides', label: 'Presentation', icon: MessageSquare },
  ];

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">HaluMem</h1>
          </div>
          <p className="text-xl text-white/90">
            Exposing Memory Hallucinations in AI Systems
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-red-400 font-semibold">50%+ Failure Rate</span>
            </div>
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-yellow-400 font-semibold">4 Types of Hallucinations</span>
            </div>
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-green-400 font-semibold">3 Core Operations</span>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="glass rounded-2xl p-2 mb-8">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all
                    ${activeTab === tab.id 
                      ? 'bg-white text-purple-700 shadow-lg' 
                      : 'text-white hover:bg-white/10'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'demo' && <HallucinationDemo />}
            {activeTab === 'operations' && <OperationFlow />}
            {activeTab === 'metrics' && <MetricsChart />}
            {activeTab === 'comparison' && <ComparisonTable />}
            {activeTab === 'slides' && <PresentationSlides />}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-16 text-center pb-8">
          <div className="glass rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-white/90 mb-2">
              Built with ❤️ by <span className="font-bold text-purple-400">AI Anytime</span>
            </p>
            <p className="text-white/70 text-sm">
              Created after going through the HaluMem paper to demonstrate the critical importance of memory systems in AI
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

function OverviewTab() {
  const problems = [
    {
      type: 'Fabrication',
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      description: 'Creating memories that never happened',
      example: 'User: "I like parrots now" → System stores: "User dislikes parrots"'
    },
    {
      type: 'Error',
      icon: XCircle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      description: 'Wrong details in retrieved memories',
      example: 'User: "My friend Joseph..." → System remembers: "Friend Mark..."'
    },
    {
      type: 'Conflict',
      icon: RefreshCw,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      description: 'Contradictory memories coexist',
      example: 'Memory 1: "Good health" + Memory 2: "Poor health" (both active)'
    },
    {
      type: 'Omission',
      icon: AlertCircle,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      description: 'Failing to retrieve crucial information',
      example: 'User mentions promotion → System forgets it in next conversation'
    }
  ];

  const stages = [
    { name: 'Extract', icon: Search, desc: 'Identify key information from conversation' },
    { name: 'Store', icon: Database, desc: 'Save as structured memory points' },
    { name: 'Update', icon: Edit, desc: 'Modify when encountering new info' },
    { name: 'Retrieve', icon: RefreshCw, desc: 'Fetch relevant memories for context' },
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="glass rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-yellow-400" />
          The Memory Crisis in AI
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          Modern AI systems are experiencing a critical memory crisis. When you tell a chatbot you enjoy science fiction, 
          it might later recommend romance novels. Share news about your promotion, and minutes later it asks about your job.
        </p>
        <p className="text-lg leading-relaxed">
          This isn't just forgetfulness—it's <span className="font-bold text-yellow-400">memory hallucination</span>, 
          a fundamental flaw where AI systems fabricate, misremember, and generate contradictory content, 
          contaminating all subsequent reasoning.
        </p>
      </div>

      {/* Four Types of Hallucinations */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">Four Types of Memory Hallucinations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`${problem.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${problem.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-xl font-bold ${problem.color} mb-2`}>
                      {problem.type}
                    </h4>
                    <p className="text-white/90 mb-3">{problem.description}</p>
                    <div className="bg-black/30 rounded-lg p-3">
                      <code className="text-sm text-gray-300">{problem.example}</code>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Memory Operations */}
      <div className="glass rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Core Memory Operations</h3>
        <div className="flex items-center justify-between">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div key={stage.name} className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="bg-white/20 p-4 rounded-xl mb-2">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-white">{stage.name}</h4>
                  <p className="text-sm text-white/70 max-w-[120px] mx-auto mt-1">
                    {stage.desc}
                  </p>
                </motion.div>
                {index < stages.length - 1 && (
                  <ChevronRight className="w-6 h-6 text-white/50 mx-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6 text-center">
          <TrendingDown className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-red-400">43%</div>
          <p className="text-white/90">Max Recall Rate</p>
          <p className="text-sm text-white/70 mt-2">Best systems only retrieve less than half of important memories</p>
        </div>
        <div className="glass rounded-xl p-6 text-center">
          <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-orange-400">62%</div>
          <p className="text-white/90">Max Accuracy</p>
          <p className="text-sm text-white/70 mt-2">Large portion of stored memories are fabricated or incorrect</p>
        </div>
        <div className="glass rounded-xl p-6 text-center">
          <XCircle className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-yellow-400">74%+</div>
          <p className="text-white/90">Update Omission</p>
          <p className="text-sm text-white/70 mt-2">Systems fail to update memories when new info arrives</p>
        </div>
      </div>
    </div>
  );
}
