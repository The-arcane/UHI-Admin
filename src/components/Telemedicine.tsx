import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Calendar, Clock } from 'lucide-react';

function Telemedicine() {
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold mb-4">Telemedicine Consultations</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Upcoming Consultation</h3>
        <div className="flex items-center space-x-4 mb-4">
          <Calendar className="text-blue-500" />
          <span>May 20, 2024</span>
          <Clock className="text-blue-500" />
          <span>10:00 AM</span>
        </div>
        <p className="mb-4">Dr. Anjali Desai - General Physician</p>
        <Link to="/video-call/456" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 inline-flex items-center">
          <Video className="mr-2" />
          Join Video Call
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Book a New Consultation</h3>
        <button 
          onClick={() => setShowBookingForm(!showBookingForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
        >
          {showBookingForm ? 'Cancel' : 'Book New Consultation'}
        </button>
        {showBookingForm && (
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Specialty</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>General Physician</option>
                <option>Dermatologist</option>
                <option>Psychiatrist</option>
                <option>Nutritionist</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Preferred Date</label>
              <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block mb-1">Preferred Time</label>
              <input type="time" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <Link 
              to="/appointment-confirmation"
              className="inline-block bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Confirm Booking
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}

export default Telemedicine;