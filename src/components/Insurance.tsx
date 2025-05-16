import React, { useState } from 'react';
import { Shield, Check, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const insurancePlans = [
  {
    id: 1,
    name: 'Basic Care',
    price: 999,
    coverage: 100000,
    features: [
      'Hospitalization coverage',
      'Accident coverage',
      'Basic health checkups',
      '24/7 teleconsultation'
    ]
  },
  {
    id: 2,
    name: 'Premium Care',
    price: 1999,
    coverage: 500000,
    features: [
      'All Basic Care features',
      'Critical illness coverage',
      'Dental & vision care',
      'International coverage',
      'Family floater option'
    ]
  },
  {
    id: 3,
    name: 'Elite Care',
    price: 4999,
    coverage: 1000000,
    features: [
      'All Premium Care features',
      'Zero deductible',
      'Pre-existing conditions covered',
      'Maternity coverage',
      'Mental health support',
      'Wellness programs'
    ]
  }
];

function Insurance() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const handlePlanSelection = (planId: number) => {
    setSelectedPlan(planId);
    toast.success('Plan selected! Proceeding to enrollment...');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Health Insurance Plans</h2>
        <p className="text-gray-600">Protect yourself and your loved ones with our comprehensive health coverage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {insurancePlans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ scale: 1.02 }}
            className={`bg-white rounded-lg shadow-md overflow-hidden ${
              selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="p-6">
              <Shield className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">₹{plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-4">Coverage up to ₹{plan.coverage.toLocaleString()}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePlanSelection(plan.id)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Select Plan
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 p-6 rounded-lg">
        <div className="flex items-start space-x-4">
          <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-semibold mb-2">Why Choose Our Insurance?</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Cashless treatment at 5000+ hospitals</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>No claim bonus up to 50%</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Quick claim settlement</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Lifetime renewability</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insurance;