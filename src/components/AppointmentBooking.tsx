import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { bookAppointment } from '../supabase';
 // ✅ use utility

const doctorList = [
  'Dr. Aisha Patel',
  'Dr. Rajesh Kumar',
  'Dr. Priya Singh',
  'Dr. Sarah Johnson',
  'Dr. Ahmed Khan',
  'Dr. Lisa Chen',
  'Dr. James Wilson',
  'Dr. Maria Rodriguez',
  'Dr. Sunil Mehta',
  'Dr. Anjali Desai',
  'Dr. Ravi Verma',
  'Dr. Neha Sharma'
];

interface FormData {
  name: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  symptoms: string;
  preferredMode: 'video' | 'inPerson';
  doctor_name: string;
}

function AppointmentBooking() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: user?.name || '',
    age: '',
    gender: '',
    email: user?.email || '',
    phone: '',
    date: '',
    time: '',
    symptoms: '',
    preferredMode: 'video',
    doctor_name: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.gender || !formData.phone || !formData.date || !formData.time || !formData.doctor_name) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await bookAppointment({
        full_name: formData.name,
        age: formData.age,
        gender: formData.gender,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        symptoms: formData.symptoms,
        preferred_mode: formData.preferredMode,
        doctor_name: formData.doctor_name,
        status: 'booked'
      });

      toast.success('Appointment booked successfully!');
      navigate('/appointment-confirmation');
    } catch (error: any) {
      toast.error('Failed to book appointment: ' + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4">Book Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Select Doctor *</label>
          <select
            value={formData.doctor_name}
            onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Doctor</option>
            {doctorList.map((doc) => (
              <option key={doc} value={doc}>{doc}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Age *</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Gender *</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Date *</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Time *</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Symptoms/Reason *</label>
          <textarea
            value={formData.symptoms}
            onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Preferred Mode *</label>
          <select
            value={formData.preferredMode}
            onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value as 'video' | 'inPerson' })}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="video">Video Consultation</option>
            <option value="inPerson">In-Person Visit</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Confirm Booking
        </motion.button>
      </form>
    </motion.div>
  );
}

export default AppointmentBooking;
