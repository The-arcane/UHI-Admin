import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';

const staticDoctorData = {
  fullName: 'Dr. John Smith',
  email: 'john.smith@example.com',
  phone: '+1234567890',
  specialization: 'Cardiology',
  registrationNumber: 'REG-456789',
  bio: 'Experienced cardiologist with over 10 years of clinical practice.',
  degree: 'MBBS, MD',
  institution: 'Harvard Medical School',
  year: '2010',
  certificate: 'Certificate.pdf',
  hospital: 'HeartCare Clinic',
  position: 'Senior Cardiologist',
  from: '01-01-2015',
  to: 'Present',
  experienceCertificate: 'ExperienceCert.pdf',
};

const DoctorVerification = () => {
  const [doctorData, setDoctorData] = useState<any>(null);
  const [verified, setVerified] = useState(false);

  const fetchDoctorData = () => {
    setDoctorData(staticDoctorData);
    setVerified(false);
  };

  const handleVerify = () => {
    setVerified(true);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">Doctor Verification</h2>
        <button
          onClick={fetchDoctorData}
          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <RotateCw className="w-4 h-4 mr-1" />
          Refresh
        </button>
      </div>

      {!doctorData ? (
        <p className="text-gray-500">Click the refresh button to load doctor data.</p>
      ) : (
        <div className="space-y-4">
          <div>
            <strong>Full Name:</strong> {doctorData.fullName}
          </div>
          <div>
            <strong>Email:</strong> {doctorData.email}
          </div>
          <div>
            <strong>Phone:</strong> {doctorData.phone}
          </div>
          <div>
            <strong>Specialization:</strong> {doctorData.specialization}
          </div>
          <div>
            <strong>Medical Registration Number:</strong> {doctorData.registrationNumber}
          </div>
          <div>
            <strong>Professional Bio:</strong> {doctorData.bio}
          </div>
          <div>
            <strong>Degree:</strong> {doctorData.degree}
          </div>
          <div>
            <strong>Institution:</strong> {doctorData.institution}
          </div>
          <div>
            <strong>Year:</strong> {doctorData.year}
          </div>
          <div>
            <strong>Certificate:</strong> {doctorData.certificate}
          </div>
          <div>
            <strong>Hospital/Clinic:</strong> {doctorData.hospital}
          </div>
          <div>
            <strong>Position:</strong> {doctorData.position}
          </div>
          <div>
            <strong>From:</strong> {doctorData.from}
          </div>
          <div>
            <strong>To:</strong> {doctorData.to}
          </div>
          <div>
            <strong>Experience Certificate:</strong> {doctorData.experienceCertificate}
          </div>

          <button
            onClick={handleVerify}
            className={`px-4 py-2 rounded text-white ${
              verified ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {verified ? 'Verified' : 'Verify'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorVerification;
