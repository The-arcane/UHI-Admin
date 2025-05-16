import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, MapPin, Clock, Home, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  tests: string[];
  type: 'home' | 'lab';
  location?: string;
  address?: string;
  totalAmount: number;
}

function BookingConfirmation() {
  const location = useLocation();
  const booking = location.state?.booking as BookingDetails;

  if (!booking) {
    return (
      <div className="max-w-md mx-auto text-center mt-8">
        <h2 className="text-2xl font-semibold mb-4">Booking Information Not Found</h2>
        <Link to="/lab-tests" className="text-blue-500 hover:underline">
          Return to Lab Tests
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-semibold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600">
          Your lab test booking has been successfully confirmed. A confirmation email has been sent to {booking.email}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-blue-500 mt-1" />
            <div>
              <p className="font-semibold">Date & Time</p>
              <p className="text-gray-600">{new Date(booking.date).toLocaleDateString()}</p>
              <p className="text-gray-600">{booking.time}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            {booking.type === 'home' ? (
              <Home className="w-5 h-5 text-blue-500 mt-1" />
            ) : (
              <Building2 className="w-5 h-5 text-blue-500 mt-1" />
            )}
            <div>
              <p className="font-semibold">{booking.type === 'home' ? 'Home Collection' : 'Lab Location'}</p>
              <p className="text-gray-600">
                {booking.type === 'home' ? booking.address : booking.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Tests Booked</h3>
        <div className="space-y-2">
          {booking.tests.map((test, index) => (
            <div key={index} className="flex justify-between py-2 border-b">
              <span>{test}</span>
            </div>
          ))}
          <div className="flex justify-between pt-4 font-semibold">
            <span>Total Amount</span>
            <span>₹{booking.totalAmount}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Important Instructions</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {booking.type === 'home' ? (
            <>
              <li>Our phlebotomist will arrive at your address during the selected time slot</li>
              <li>Please keep your valid ID proof ready</li>
              <li>Ensure someone is available at the provided address</li>
              <li>Maintain fasting if required for your tests</li>
            </>
          ) : (
            <>
              <li>Please arrive 10 minutes before your appointment time</li>
              <li>Bring a valid ID proof</li>
              <li>Maintain fasting if required for your tests</li>
              <li>Follow any specific test preparations as communicated</li>
            </>
          )}
        </ul>
      </div>

      <div className="flex justify-center space-x-4">
        <Link 
          to="/dashboard"
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Go to Dashboard
        </Link>
        <Link 
          to="/"
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </motion.div>
  );
}

export default BookingConfirmation;