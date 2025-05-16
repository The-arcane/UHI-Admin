import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', users: 400, appointments: 240 },
  { name: 'Feb', users: 300, appointments: 139 },
  { name: 'Mar', users: 200, appointments: 980 },
  { name: 'Apr', users: 278, appointments: 390 },
  { name: 'May', users: 189, appointments: 480 },
];

function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Total Doctors</h3>
          <p className="text-3xl font-bold">56</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Appointments Today</h3>
          <p className="text-3xl font-bold">28</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">User and Appointment Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" />
            <Bar dataKey="appointments" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;