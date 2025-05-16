import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ambulance } from 'lucide-react';
import { motion } from 'framer-motion';

function EmergencyButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => navigate('/ambulance')}
      className="fixed bottom-6 right-6 bg-red-500 text-white p-4 rounded-full shadow-lg hover:bg-red-600 z-50"
      aria-label="Emergency"
    >
      <Ambulance className="w-6 h-6" />
    </motion.button>
  );
}

export default EmergencyButton;