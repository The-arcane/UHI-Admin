import React, { useState } from 'react';

const mockDoctors = [
  { id: 1, name: 'Dr. Sarah Lee', specialty: 'Cardiology', hospital: 'City Hospital' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Pediatrics', hospital: 'Children\'s Medical Center' },
  { id: 3, name: 'Dr. Emily Brown', specialty: 'Dermatology', hospital: 'Skin Care Clinic' },
];

function DoctorManagement() {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '', hospital: '' });

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    setDoctors([...doctors, { id: doctors.length + 1, ...newDoctor }]);
    setNewDoctor({ name: '', specialty: '', hospital: '' });
  };

  const handleDeleteDoctor = (id: number) => {
    setDoctors(doctors.filter(doctor => doctor.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Doctor Management</h2>
      <form onSubmit={handleAddDoctor} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={newDoctor.name}
          onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Specialty"
          value={newDoctor.specialty}
          onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Hospital"
          value={newDoctor.hospital}
          onChange={(e) => setNewDoctor({ ...newDoctor, hospital: e.target.value })}
          className="mr-2 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Doctor
        </button>
      </form>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Specialty</th>
            <th className="py-2 px-4 border-b">Hospital</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.id}>
              <td className="py-2 px-4 border-b">{doctor.name}</td>
              <td className="py-2 px-4 border-b">{doctor.specialty}</td>
              <td className="py-2 px-4 border-b">{doctor.hospital}</td>
              <td className="py-2 px-4 border-b">
                <button 
                  onClick={() => handleDeleteDoctor(doctor.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorManagement;