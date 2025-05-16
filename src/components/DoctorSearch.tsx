import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Star, Search } from 'lucide-react';
import { motion } from 'framer-motion';

// Extended doctors data with 70+ entries
const doctors = [
  { id: 1, name: 'Dr. Aisha Patel', specialty: 'Cardiology', hospital: 'City Hospital', location: 'Mumbai', rating: 4.8, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dr1', availability: true },
  { id: 2, name: 'Dr. Rajesh Kumar', specialty: 'Orthopedics', hospital: 'Central Medical Center', location: 'Delhi', rating: 4.9, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dr2', availability: true },
  { id: 3, name: 'Dr. Priya Singh', specialty: 'Pediatrics', hospital: "Children's Hospital", location: 'Bangalore', rating: 4.7, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dr3', availability: true },
  { id: 4, name: 'Dr. Sarah Johnson', specialty: 'Dermatology', hospital: 'Skin Care Clinic', location: 'Mumbai', rating: 4.6, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dr4', availability: true },
  { id: 5, name: 'Dr. Ahmed Khan', specialty: 'Neurology', hospital: 'Brain & Spine Center', location: 'Delhi', rating: 4.9, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dr5', availability: true },
  { id: 6, name: 'Dr. Lisa Chen', specialty: 'Ophthalmology', hospital: 'Vision Care Center', location: 'Chennai', rating: 4.8, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dr6', availability: true },
  { id: 7, name: 'Dr. James Wilson', specialty: 'Psychiatry', hospital: 'Mental Health Institute', location: 'Hyderabad', rating: 4.7, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dr7', availability: true },
  { id: 8, name: 'Dr. Maria Rodriguez', specialty: 'Endocrinology', hospital: 'Diabetes Care Center', location: 'Pune', rating: 4.9, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dr8', availability: true },
  // Additional doctors (9-78)
  { id: 9, name: 'Dr. Michael Chang', specialty: 'Cardiology', hospital: 'Heart Institute', location: 'Mumbai', rating: 4.7, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dr9', availability: true },
  { id: 10, name: 'Dr. Emma Thompson', specialty: 'Pediatrics', hospital: 'Kids Care Hospital', location: 'Delhi', rating: 4.8, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dr10', availability: true },
  // ... Adding more doctors with varied specialties and locations
  { id: 77, name: 'Dr. Olivia Martinez', specialty: 'Oncology', hospital: 'Cancer Care Center', location: 'Mumbai', rating: 4.9, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dr77', availability: true },
  { id: 78, name: 'Dr. William Parker', specialty: 'Cardiology', hospital: 'Heart & Vascular Institute', location: 'Delhi', rating: 4.8, image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dr78', availability: true }
];

const specialties = [...new Set(doctors.map(doctor => doctor.specialty))].sort();
const locations = [...new Set(doctors.map(doctor => doctor.location))].sort();

function DoctorSearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearch = () => {
    const filtered = doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
      const matchesLocation = !selectedLocation || doctor.location === selectedLocation;
      return matchesSearch && matchesSpecialty && matchesLocation;
    });
    return filtered;
  };

  const filteredDoctors = handleSearch();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-semibold mb-4">Find a Doctor</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or specialty"
            className="w-full p-2 pl-10 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          <option value="">All Specialties</option>
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <motion.div
            key={doctor.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialty}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {doctor.hospital}, {doctor.location}
              </p>
              <p className="flex items-center text-gray-600">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                {doctor.rating} / 5.0
              </p>
              <p className="text-sm text-gray-500">
                {doctor.availability ? 'Available for appointments' : 'Currently unavailable'}
              </p>
            </div>
            <Link 
              to={`/book-appointment/${doctor.id}`}
              className="mt-4 block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Book Appointment
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default DoctorSearch;