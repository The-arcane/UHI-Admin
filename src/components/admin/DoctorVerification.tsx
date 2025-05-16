import React, { useState } from 'react';
import { Check, X, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  registrationNumber: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: {
    type: string;
    url: string;
  }[];
}

const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Arun Kumar',
    specialization: 'Cardiology',
    registrationNumber: 'MCI123456',
    submissionDate: '2024-05-01',
    <boltAction type="file" filePath="src/components/admin/DoctorVerification.tsx">    status: 'pending',
    documents: [
      { type: 'Medical Degree', url: 'https://example.com/degree.pdf' },
      { type: 'Registration Certificate', url: 'https://example.com/registration.pdf' },
      { type: 'Experience Certificate', url: 'https://example.com/experience.pdf' }
    ]
  },
  {
    id: 2,
    name: 'Dr. Priya Singh',
    specialization: 'Pediatrics',
    registrationNumber: 'MCI789012',
    submissionDate: '2024-04-28',
    status: 'pending',
    documents: [
      { type: 'Medical Degree', url: 'https://example.com/degree2.pdf' },
      { type: 'Registration Certificate', url: 'https://example.com/registration2.pdf' },
      { type: 'Experience Certificate', url: 'https://example.com/experience2.pdf' }
    ]
  }
];

function DoctorVerification() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showDocuments, setShowDocuments] = useState(false);

  const handleVerification = (doctorId: number, status: 'approved' | 'rejected') => {
    setDoctors(doctors.map(doctor => {
      if (doctor.id === doctorId) {
        return { ...doctor, status };
      }
      return doctor;
    }));

    toast.success(`Doctor ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
  };

  const viewDocuments = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowDocuments(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Doctor Verification</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.specialization}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.registrationNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.submissionDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    doctor.status === 'approved' ? 'bg-green-100 text-green-800' :
                    doctor.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => viewDocuments(doctor)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    {doctor.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleVerification(doctor.id, 'approved')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleVerification(doctor.id, 'rejected')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDocuments && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4"
          >
            <h3 className="text-xl font-semibold mb-4">Documents - {selectedDoctor.name}</h3>
            <div className="space-y-4">
              {selectedDoctor.documents.map((doc, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span>{doc.type}</span>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Document
                  </a>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowDocuments(false)}
              className="mt-6 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default DoctorVerification;