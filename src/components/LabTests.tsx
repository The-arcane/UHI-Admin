import React, { useState } from 'react';
import { Home, Building2, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

const bookedData = {
  name: 'Yajat Prabhakar',
  age: 28,
  gender: 'Male',
  location: 'home',
  address: '123, Green Avenue, Delhi',
  date: '2025-05-15',
  time: '10:00 AM',
  selectedLab: null,
  tests: [
    { id: 1, name: 'Complete Blood Count (CBC)', price: 500 },
    { id: 3, name: 'Thyroid Profile', price: 1200 },
  ],
};

const LabTests: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const totalPrice = bookedData.tests.reduce((sum, test) => sum + test.price, 0);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Booking data is up to date!');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Lab Test Booking</h2>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          <RefreshCw className={`animate-spin ${loading ? 'inline-block' : 'hidden'}`} />
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <div
            className={`flex items-center px-4 py-2 rounded-md ${
              bookedData.location === 'lab' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            <Building2 className="mr-2" />
            Lab Visit
          </div>
          <div
            className={`flex items-center px-4 py-2 rounded-md ${
              bookedData.location === 'home' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            <Home className="mr-2" />
            Home Collection
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="font-medium">Name:</p>
            <p>{bookedData.name}</p>
          </div>
          <div>
            <p className="font-medium">Age:</p>
            <p>{bookedData.age}</p>
          </div>
          <div>
            <p className="font-medium">Gender:</p>
            <p>{bookedData.gender}</p>
          </div>
        </div>

        {bookedData.location === 'home' && (
          <div className="mb-4">
            <p className="font-medium">Home Collection Address:</p>
            <p>{bookedData.address}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-medium">Date:</p>
            <p>{bookedData.date}</p>
          </div>
          <div>
            <p className="font-medium">Time Slot:</p>
            <p>{bookedData.time}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Booked Tests</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {bookedData.tests.map((test) => (
            <div key={test.id} className="p-4 border rounded-lg border-blue-500 bg-blue-50">
              <h4 className="font-medium">{test.name}</h4>
              <p className="text-gray-700">Price: ₹{test.price}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xl font-semibold mt-6">
        Total Price: ₹{totalPrice}
      </div>
    </div>
  );
};

export default LabTests;
