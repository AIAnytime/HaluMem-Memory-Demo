'use client';

import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line
} from 'recharts';
import { TrendingDown, AlertTriangle, Database } from 'lucide-react';

export default function MetricsChart() {
  // Performance metrics data
  const performanceData = [
    { system: 'Mem0', recall: 43.01, accuracy: 60.8, updateAccuracy: 25.5, omissionRate: 74.02 },
    { system: 'Mem0-Graph', recall: 42.24, accuracy: 61.37, updateAccuracy: 17.01, omissionRate: 81.47 },
    { system: 'Memobase', recall: 14.51, accuracy: 70.20, updateAccuracy: 0.65, omissionRate: 98.51 },
    { system: 'Supermemory', recall: 53.02, accuracy: 60.79, updateAccuracy: 17.01, omissionRate: 82.43 }
  ];

  // Hallucination types distribution
  const hallucinationTypes = [
    { type: 'Fabrication', count: 35, severity: 'high' },
    { type: 'Error', count: 28, severity: 'medium' },
    { type: 'Conflict', count: 22, severity: 'medium' },
    { type: 'Omission', count: 15, severity: 'low' }
  ];

  // Performance over context length
  const contextLengthData = [
    { context: '1k', mem0: 43, supermemory: 53, memobase: 14 },
    { context: '10k', mem0: 35, supermemory: 48, memobase: 10 },
    { context: '50k', mem0: 20, supermemory: 35, memobase: 5 },
    { context: '100k', mem0: 8, supermemory: 25, memobase: 2 },
    { context: '1M', mem0: 3.2, supermemory: 15, memobase: 0.5 }
  ];

  // Radar chart data for multi-metric comparison
  const radarData = [
    { metric: 'Recall', mem0: 43, memobase: 14, supermemory: 53 },
    { metric: 'Accuracy', mem0: 61, memobase: 70, supermemory: 61 },
    { metric: 'Update', mem0: 25, memobase: 1, supermemory: 17 },
    { metric: 'Resistance', mem0: 26, memobase: 35, supermemory: 21 },
    { metric: 'Q&A', mem0: 54, memobase: 48, supermemory: 52 }
  ];

  return (
    <div className="space-y-8">
      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-6 text-center"
        >
          <TrendingDown className="w-10 h-10 text-red-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-red-400">50%+</div>
          <p className="text-white/90 text-sm">Failure Rate</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-6 text-center"
        >
          <AlertTriangle className="w-10 h-10 text-orange-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-400">43%</div>
          <p className="text-white/90 text-sm">Max Recall</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-6 text-center"
        >
          <Database className="w-10 h-10 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-400">74%+</div>
          <p className="text-white/90 text-sm">Update Omission</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-6 text-center"
        >
          <AlertTriangle className="w-10 h-10 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-400">96.8%</div>
          <p className="text-white/90 text-sm">Degradation at 1M tokens</p>
        </motion.div>
      </div>

      {/* System Performance Comparison */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-white mb-6">System Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="system" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}
              labelStyle={{ color: '#ffffff' }}
            />
            <Legend />
            <Bar dataKey="recall" fill="#10b981" name="Recall %" />
            <Bar dataKey="accuracy" fill="#3b82f6" name="Accuracy %" />
            <Bar dataKey="updateAccuracy" fill="#f59e0b" name="Update Accuracy %" />
            <Bar dataKey="omissionRate" fill="#ef4444" name="Omission Rate %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Degradation with Context Length */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-white mb-6">Performance vs Context Length</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={contextLengthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="context" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}
              labelStyle={{ color: '#ffffff' }}
            />
            <Legend />
            <Line type="monotone" dataKey="mem0" stroke="#8b5cf6" strokeWidth={2} name="Mem0" />
            <Line type="monotone" dataKey="supermemory" stroke="#10b981" strokeWidth={2} name="Supermemory" />
            <Line type="monotone" dataKey="memobase" stroke="#f59e0b" strokeWidth={2} name="Memobase" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Multi-Metric Radar Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Multi-Metric Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis dataKey="metric" stroke="#ffffff" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#ffffff" />
              <Radar name="Mem0" dataKey="mem0" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              <Radar name="Memobase" dataKey="memobase" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
              <Radar name="Supermemory" dataKey="supermemory" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Hallucination Distribution */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Hallucination Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hallucinationTypes} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="#ffffff" />
              <YAxis dataKey="type" type="category" stroke="#ffffff" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)' }}
                labelStyle={{ color: '#ffffff' }}
              />
              <Bar dataKey="count" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Findings */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Key Findings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <h4 className="font-bold text-red-400 mb-2">Critical Failure</h4>
            <p className="text-white/90 text-sm">
              All systems fail to retrieve over 50% of important memories, with Memobase performing worst at 14.5% recall.
            </p>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-bold text-orange-400 mb-2">Update Crisis</h4>
            <p className="text-white/90 text-sm">
              Memory update accuracy is below 26% for all systems, with omission rates exceeding 74%.
            </p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="font-bold text-yellow-400 mb-2">Context Collapse</h4>
            <p className="text-white/90 text-sm">
              Performance degrades catastrophically with long contexts. Mem0 drops from 43% to 3.2% recall at 1M tokens.
            </p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <h4 className="font-bold text-purple-400 mb-2">Cascading Errors</h4>
            <p className="text-white/90 text-sm">
              Extraction errors lead to update failures, which compound into Q&A hallucinations, creating a cascade of failures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
