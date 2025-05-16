import React, { useState } from 'react';
import { MapPin, Phone, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function Ambulance() {
  const [location, setLocation] = useState('');
  const [emergency, setEmergency] = useState(false);
  const [destination, setDestination] = useState('');

  const handleEmergencyRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Emergency services have been notified. Help is on the way!');
    // In a real app, this would trigger emergency services
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex items-center">
          <AlertTriangle className="text-red-500 mr-2" />
          <p className="text-red-700">
            For immediate medical emergencies, please call 102 or your local emergency number.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Request Emergency Ambulance</h2>
          <form onSubmit={handleEmergencyRequest} className="space-y-4">
            <div>
              <label className="block mb-1">Your Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your current address"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">Destination Hospital (Optional)</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Preferred hospital name"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={emergency}
                  onChange={(e) => setEmergency(e.target.checked)}
                  className="form-checkbox"
                />
                <span>This is an emergency situation</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Request Ambulance Now
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Emergency Contacts</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="text-red-500" />
                <div>
                  <p className="font-semibold">Emergency Ambulance</p>
                  <p className="text-xl font-bold">102</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-red-500" />
                <div>
                  <p className="font-semibold">Police</p>
                  <p className="text-xl font-bold">100</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-red-500" />
                <div>
                  <p className="font-semibold">Fire Department</p>
                  <p className="text-xl font-bold">101</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Nearest Hospitals</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="text-blue-500" />
                <div>
                  <p className="font-semibold">City Hospital</p>
                  <p className="text-sm text-gray-600">2.5 km away</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-blue-500" />
                <div>
                  <p className="font-semibold">Apollo Emergency Care</p>
                  <p className="text-sm text-gray-600">3.8 km away</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-blue-500" />
                <div>
                  <p className="font-semibold">Max Healthcare</p>
                  <p className="text-sm text-gray-600">4.2 km away</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Ambulance;