import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Users, Calendar, Activity } from 'lucide-react';

function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Users className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Calendar className="w-8 h-8 text-green-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Appointments Today</h3>
          <p className="text-3xl font-bold">48</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Activity className="w-8 h-8 text-purple-500 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Active Doctors</h3>
          <p className="text-3xl font-bold">56</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Users</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">User {i}</p>
                    <p className="text-sm text-gray-500">Registered today</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Appointments</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-semibold">Dr. Smith with Patient {i}</p>
                  <p className="text-sm text-gray-500">Today at {9 + i}:00 AM</p>
                </div>
                <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;