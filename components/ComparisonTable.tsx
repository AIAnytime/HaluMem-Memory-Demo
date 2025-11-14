'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function ComparisonTable() {
  const systems = [
    {
      name: 'Mem0',
      metrics: {
        recall: { value: 43.01, rating: 'poor' },
        accuracy: { value: 60.86, rating: 'moderate' },
        updateAccuracy: { value: 25.50, rating: 'critical' },
        falseMemoryResistance: { value: 25.95, rating: 'critical' },
        omissionRate: { value: 74.02, rating: 'critical' },
        longContext: { value: 3.2, rating: 'critical' }
      }
    },
    {
      name: 'Mem0-Graph',
      metrics: {
        recall: { value: 42.24, rating: 'poor' },
        accuracy: { value: 61.37, rating: 'moderate' },
        updateAccuracy: { value: 1.41, rating: 'critical' },
        falseMemoryResistance: { value: 20.31, rating: 'critical' },
        omissionRate: { value: 98.01, rating: 'critical' },
        longContext: { value: 2.8, rating: 'critical' }
      }
    },
    {
      name: 'Memobase',
      metrics: {
        recall: { value: 14.51, rating: 'critical' },
        accuracy: { value: 70.20, rating: 'good' },
        updateAccuracy: { value: 0.65, rating: 'critical' },
        falseMemoryResistance: { value: 34.20, rating: 'poor' },
        omissionRate: { value: 98.51, rating: 'critical' },
        longContext: { value: 0.5, rating: 'critical' }
      }
    },
    {
      name: 'Supermemory',
      metrics: {
        recall: { value: 53.02, rating: 'moderate' },
        accuracy: { value: 60.79, rating: 'moderate' },
        updateAccuracy: { value: 17.01, rating: 'critical' },
        falseMemoryResistance: { value: 20.97, rating: 'critical' },
        omissionRate: { value: 82.43, rating: 'critical' },
        longContext: { value: 15.0, rating: 'poor' }
      }
    }
  ];

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-400';
      case 'moderate': return 'text-yellow-400';
      case 'poor': return 'text-orange-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'good': return CheckCircle;
      case 'moderate': return AlertTriangle;
      case 'poor': return XCircle;
      case 'critical': return XCircle;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="space-y-8">
      {/* Summary Statistics */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-white mb-4">System Performance Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">0</div>
            <p className="text-white/90 text-sm mt-1">Systems with &gt;70% accuracy</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">100%</div>
            <p className="text-white/90 text-sm mt-1">Critical update failure</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">96.8%</div>
            <p className="text-white/90 text-sm mt-1">Avg context degradation</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">43%</div>
            <p className="text-white/90 text-sm mt-1">Best recall rate</p>
          </div>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="glass rounded-2xl p-6 overflow-x-auto">
        <h3 className="text-2xl font-bold text-white mb-6">Detailed System Comparison</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left text-white py-3 px-4">System</th>
              <th className="text-center text-white py-3 px-4">Recall (%)</th>
              <th className="text-center text-white py-3 px-4">Accuracy (%)</th>
              <th className="text-center text-white py-3 px-4">Update Acc (%)</th>
              <th className="text-center text-white py-3 px-4">FMR (%)</th>
              <th className="text-center text-white py-3 px-4">Omission (%)</th>
              <th className="text-center text-white py-3 px-4">Long Context (%)</th>
            </tr>
          </thead>
          <tbody>
            {systems.map((system, index) => (
              <motion.tr 
                key={system.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <td className="py-3 px-4">
                  <span className="font-bold text-white">{system.name}</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`${getRatingColor(system.metrics.recall.rating)} font-semibold`}>
                      {system.metrics.recall.value.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`${getRatingColor(system.metrics.accuracy.rating)} font-semibold`}>
                      {system.metrics.accuracy.value.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`${getRatingColor(system.metrics.updateAccuracy.rating)} font-semibold`}>
                      {system.metrics.updateAccuracy.value.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`${getRatingColor(system.metrics.falseMemoryResistance.rating)} font-semibold`}>
                      {system.metrics.falseMemoryResistance.value.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`${getRatingColor(system.metrics.omissionRate.rating)} font-semibold`}>
                      {system.metrics.omissionRate.value.toFixed(2)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className={`${getRatingColor(system.metrics.longContext.rating)} font-semibold`}>
                      {system.metrics.longContext.value.toFixed(1)}
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-6"
        >
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            Worst Performer
          </h4>
          <p className="text-white/90 text-sm">
            <span className="font-bold text-red-400">Memobase</span> has the worst recall rate at only 14.51%, 
            missing over 85% of important memories.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-xl p-6"
        >
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Best (Relative) Performer
          </h4>
          <p className="text-white/90 text-sm">
            <span className="font-bold text-yellow-400">Supermemory</span> has the best recall at 53%, 
            but still fails nearly half the time and degrades severely with context.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-6"
        >
          <h4 className="font-bold text-white mb-3 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-400" />
            Universal Failure
          </h4>
          <p className="text-white/90 text-sm">
            <span className="font-bold text-red-400">All systems</span> have update accuracy below 26% 
            and omission rates above 74%, indicating systemic architectural flaws.
          </p>
        </motion.div>
      </div>

      {/* Legend */}
      <div className="glass rounded-xl p-4">
        <h4 className="font-bold text-white mb-3">Rating Legend</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-white/90 text-sm">Good (&gt;70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-white/90 text-sm">Moderate (50-70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-orange-400" />
            <span className="text-white/90 text-sm">Poor (30-50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-white/90 text-sm">Critical (&lt;30%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
