import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function Feedback() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your feedback!');
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-8"
    >
      <h2 className="text-2xl font-semibold mb-6">How was your consultation?</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <p className="mb-2">Rate your experience:</p>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRating(star)}
                className={`p-1 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                <Star className="w-8 h-8" fill={rating >= star ? 'currentColor' : 'none'} />
              </motion.button>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-2">Additional comments:</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit Feedback
        </motion.button>
      </form>
    </motion.div>
  );
}

export default Feedback;