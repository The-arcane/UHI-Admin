import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../supabase';

// Types
interface DoctorData {
  id: string;
  full_name: string;
  email: string;
  contact_number: string;
  password?: string; // Optional, as we are not displaying it
  specialization: string;
  registration_number: string;
  bio?: string; // Optional, as it can be null
  created_at?: string; // Optional, to match table structure
  availability_status?: string; // Optional
  rating?: string; // Optional
  verified: boolean;
  qualifications?: string; // New field
  other_certifications?: string; // New field
  certifications_url?: string; // New field
  experience_certificates_url?: string; // New field
}

function DoctorVerification() {
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState<DoctorData | null>(null);

  // Fetch doctor data from Supabase
  const fetchDoctor = async () => {
    setLoading(true);
    setDoctor(null);

    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;

      // Map DB fields to DoctorData
      const fetchedDoctor: DoctorData = {
        id: data.id,
        full_name: data.full_name,
        email: data.email,
        contact_number: data.contact_number,
        specialization: data.specialization,
        registration_number: data.registration_number,
        bio: data.bio ?? '', // Default to empty string if null
        created_at: data.created_at ?? '', // Default to empty string if null
        availability_status: data.availability_status ?? 'Available', // Default to 'Available' if null
        rating: data.rating ?? '0', // Default to '0' if null
        verified: data.verified === 'true', // Convert text to boolean
        qualifications: data.qualifications ?? '', // Handle qualifications
        other_certifications: data.other_certifications ?? '', // Handle other certifications
        certifications_url: data.certifications_url ?? '', // Handle certifications URL
        experience_certificates_url: data.experience_certificates_url ?? '', // Handle experience certificates URL
      };

      setDoctor(fetchedDoctor);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle doctor verification (updating the database)
  const handleVerify = async () => {
    if (doctor) {
      try {
        const { error } = await supabase
          .from('doctors')
          .update({ verified: 'true' })
          .eq('id', doctor.id);

        if (error) throw error;

        // Update local state to reflect the change
        setDoctor({ ...doctor, verified: true });
      } catch (error) {
        console.error('Error updating doctor verification:', error);
      }
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Doctor Verification</h2>
        <button
          onClick={fetchDoctor}
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Fetching doctor data...</p>
      ) : doctor ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="border p-6 rounded-xl shadow-md space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><strong>Full Name:</strong> {doctor.full_name}</div>
              <div><strong>Email:</strong> {doctor.email}</div>
              <div><strong>Phone:</strong> {doctor.contact_number}</div>
              <div><strong>Specialization:</strong> {doctor.specialization}</div>
              <div><strong>Registration No:</strong> {doctor.registration_number}</div>
              <div className="md:col-span-2"><strong>Bio:</strong> {doctor.bio}</div>
              <div><strong>Availability Status:</strong> {doctor.availability_status}</div>
              <div><strong>Rating:</strong> {doctor.rating}</div>
              <div><strong>Created At:</strong> {doctor.created_at}</div>
              <div><strong>Qualifications:</strong> {doctor.qualifications}</div> {/* New field */}
              <div><strong>Other Certifications:</strong> {doctor.other_certifications}</div> {/* New field */}
              <div><strong>Certifications URL:</strong> <a href={doctor.certifications_url} target="_blank" rel="noopener noreferrer">{doctor.certifications_url}</a></div> {/* New field */}
              <div><strong>Experience Certificates URL:</strong> <a href={doctor.experience_certificates_url} target="_blank" rel="noopener noreferrer">{doctor.experience_certificates_url}</a></div> {/* New field */}
            </div>

            <div>
              <button
                onClick={handleVerify}
                disabled={doctor.verified}
                className={`px-6 py-2 rounded-md text-white ${doctor.verified ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {doctor.verified ? 'Verified' : 'Confirm Verification'}
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <p className="text-gray-600">No doctor data available.</p>
      )}
    </div>
  );
}

export default DoctorVerification;
