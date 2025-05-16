import React, { useState } from 'react';
import { Calendar, Clock, User, FileText, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

function DoctorDashboard() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointments = [
    {
      id: 1,
      patientName: 'John Doe',
      time: '10:00 AM',
      type: 'Video Consultation',
      status: 'upcoming'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      time: '11:30 AM',
      type: 'In-Person',
      status: 'upcoming'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Doctor Dashboard</h2>
        <div className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
          Verification Status: Pending
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <Calendar className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Today's Appointments</h3>
          <p className="text-3xl font-bold">{appointments.length}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <Clock className="w-8 h-8 text-green-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Next Appointment</h3>
          <p className="font-semibold">10:00 AM - John Doe</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <User className="w-8 h-8 text-purple-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Total Patients</h3>
          <p className="text-3xl font-bold">45</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{appointment.patientName}</p>
                  <p className="text-sm text-gray-600">{appointment.time} - {appointment.type}</p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Patient Records</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-blue-500 mr-2" />
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-gray-600">Last visit: May 1, 2024</p>
                </div>
              </div>
              <button className="text-blue-500 hover:text-blue-700">View</button>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-blue-500 mr-2" />
                <div>
                  <p className="font-semibold">Jane Smith</p>
                  <p className="text-sm text-gray-600">Last visit: April 28, 2024</p>
                </div>
              </div>
              <button className="text-blue-500 hover:text-blue-700">View</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Consultation Hours</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Mon-Fri, 9 AM - 5 PM"
            />
          </div>
          <div>
            <label className="block mb-1">Consultation Fee</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter amount in ₹"
            />
          </div>
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Update Settings
        </button>
      </div>
    </div>
  );
}

export default DoctorDashboard;