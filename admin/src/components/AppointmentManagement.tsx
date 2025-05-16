import React, { useState } from 'react';

const mockAppointments = [
  { id: 1, patientName: 'Alice Johnson', doctorName: 'Dr. Sarah Lee', date: '2024-05-15', time: '10:00 AM' },
  { id: 2, patientName: 'Bob Smith', doctorName: 'Dr. Michael Chen', date: '2024-05-16', time: '2:30 PM' },
  { id: 3, patientName: 'Carol Brown', doctorName: 'Dr. Emily Brown', date: '2024-05-17', time: '11:15 AM' },
];

function AppointmentManagement() {
  const [appointments, setAppointments] = useState(mockAppointments);

  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Appointment Management</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Patient Name</th>
            <th className="py-2 px-4 border-b">Doctor Name</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td className="py-2 px-4 border-b">{appointment.patientName}</td>
              <td className="py-2 px-4 border-b">{appointment.doctorName}</td>
              <td className="py-2 px-4 border-b">{appointment.date}</td>
              <td className="py-2 px-4 border-b">{appointment.time}</td>
              <td className="py-2 px-4 border-b">
                <button 
                  onClick={() => handleDeleteAppointment(appointment.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentManagement;