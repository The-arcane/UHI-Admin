import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

function AppointmentConfirmation() {
  return (
    <div className="max-w-md mx-auto text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-semibold mb-4">Appointment Confirmed!</h2>
      <p className="mb-4">Your appointment has been successfully booked. We've sent a confirmation email with all the details.</p>
      <div className="space-y-2">
        <Link to="/dashboard" className="block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Return to Dashboard
        </Link>
        <Link to="/" className="block bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default AppointmentConfirmation;