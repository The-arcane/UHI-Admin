import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Activity, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock appointments data
const appointments = [
  {
    id: 1,
    doctorName: 'Dr. Sharma',
    specialty: 'Cardiology',
    date: '2024-05-15',
    time: '10:00',
    type: 'video',
    status: 'upcoming'
  },
  {
    id: 2,
    doctorName: 'Dr. Patel',
    specialty: 'General Checkup',
    date: '2024-06-02',
    time: '14:30',
    type: 'in-person',
    status: 'upcoming'
  },
  // Add more appointments as needed
];

function PatientDashboard() {
  const [showAppointmentDetails, setShowAppointmentDetails] = React.useState(false);
  const [showHealthSummary, setShowHealthSummary] = React.useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-semibold mb-4">Patient Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <Calendar className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Upcoming Appointments</h3>
          <div className="space-y-4">
            {appointments.map(appointment => (
              <div key={appointment.id} className="border-b pb-2">
                <p className="font-semibold">{appointment.doctorName} - {appointment.specialty}</p>
                <p className="text-sm text-gray-600">
                  {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                </p>
                {appointment.type === 'video' && (
                  <Link 
                    to={`/video-call/${appointment.id}`}
                    className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 text-sm"
                  >
                    Join Video Call
                  </Link>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <Activity className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Recent Activities</h3>
          <ul className="list-disc list-inside">
            <li>Blood test results uploaded (May 1, 2024)</li>
            <li>Telemedicine consultation completed (April 28, 2024)</li>
          </ul>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <FileText className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Health Summary</h3>
          <p className="mb-4">Your overall health status is good. Remember to take your daily medication and stay hydrated.</p>
          <button 
            onClick={() => setShowHealthSummary(!showHealthSummary)}
            className="text-blue-500 hover:text-blue-700"
          >
            {showHealthSummary ? 'Hide Summary' : 'View Detailed Summary'}
          </button>
          {showHealthSummary && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-gray-100 rounded-md"
            >
              <p><strong>Blood Pressure:</strong> 120/80 mmHg (Normal)</p>
              <p><strong>Heart Rate:</strong> 72 bpm (Normal)</p>
              <p><strong>BMI:</strong> 23.5 (Normal)</p>
              <p><strong>Cholesterol:</strong> 180 mg/dL (Desirable)</p>
              <Link to="/insights" className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                View Health Insights
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PatientDashboard;