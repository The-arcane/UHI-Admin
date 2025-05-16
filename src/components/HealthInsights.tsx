import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertCircle, Heart, Activity, Brain, Apple, Moon, Battery } from 'lucide-react';

const healthMetrics = {
  overall: 85,
  sleep: 75,
  nutrition: 80,
  activity: 70,
  stress: 65,
  heart: 90
};

function HealthInsights() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const MetricCard = ({ title, value, icon: Icon, color }: { title: string, value: number, icon: any, color: string }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white p-6 rounded-lg shadow-md cursor-pointer ${
        selectedMetric === title ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => setSelectedMetric(title)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Icon className={`w-8 h-8 ${color} mr-3`} />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <span className="text-2xl font-bold">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${color.replace('text-', 'bg-')}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">AI-Powered Health Insights</h2>
        <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          Updated Today
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard title="Overall Health" value={healthMetrics.overall} icon={Activity} color="text-blue-500" />
        <MetricCard title="Heart Health" value={healthMetrics.heart} icon={Heart} color="text-red-500" />
        <MetricCard title="Sleep Quality" value={healthMetrics.sleep} icon={Moon} color="text-purple-500" />
        <MetricCard title="Nutrition" value={healthMetrics.nutrition} icon={Apple} color="text-green-500" />
        <MetricCard title="Physical Activity" value={healthMetrics.activity} icon={TrendingUp} color="text-orange-500" />
        <MetricCard title="Stress Levels" value={healthMetrics.stress} icon={Brain} color="text-indigo-500" />
      </div>

      {selectedMetric && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-md mt-6"
        >
          <h3 className="text-xl font-semibold mb-4">Detailed Analysis: {selectedMetric}</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              <div>
                <h4 className="font-semibold">Trends</h4>
                <p className="text-gray-600">Your {selectedMetric.toLowerCase()} metrics have improved by 15% over the last month.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
              <div>
                <h4 className="font-semibold">Recommendations</h4>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Maintain consistent sleep schedule</li>
                  <li>Increase water intake</li>
                  <li>Consider adding meditation to your routine</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Battery className="w-6 h-6 text-green-500" />
              <div>
                <h4 className="font-semibold">Goals</h4>
                <p className="text-gray-600">You're on track to reach your monthly health goals. Keep up the good work!</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Upcoming Health Goals</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Daily Steps</p>
              <p className="text-sm text-gray-600">Goal: 10,000 steps</p>
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Sleep Duration</p>
              <p className="text-sm text-gray-600">Goal: 8 hours</p>
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2.5">
              <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Water Intake</p>
              <p className="text-sm text-gray-600">Goal: 2.5L daily</p>
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthInsights;