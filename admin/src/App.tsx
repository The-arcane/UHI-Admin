import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';  
import Home from './components/home';  
import About from './components/about';  
import DoctorVerification from './components/DoctorVerification';  
import UserManagement from './components/UserManagement';
import AppointmentManagement from './components/AppointmentManagement';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-blue-600">UHI Admin</h1>
          </div>
          <ul className="mt-4 space-y-2">
            {/* Home Link */}
            <li>
              <NavLink
                to="/#/"
                className={({ isActive }) =>
                  `block py-2 px-4 text-gray-700 ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'} rounded`
                }
              >
                Home
              </NavLink>
            </li>

            {/* About Link */}
            <li>
              <NavLink
                to="/#/about"
                className={({ isActive }) =>
                  `block py-2 px-4 text-gray-700 ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'} rounded`
                }
              >
                About
              </NavLink>
            </li>

            {/* Doctor Verification Link */}
            <li>
              <NavLink
                to="/#/doctor-verification"
                className={({ isActive }) =>
                  `block py-2 px-4 text-gray-700 ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'} rounded`
                }
              >
                Doctor Verification
              </NavLink>
            </li>

            {/* Other Sections */}
            <li>
              <NavLink
                to="/#/users"
                className={({ isActive }) =>
                  `block py-2 px-4 text-gray-700 ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'} rounded`
                }
              >
                User Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/#/appointments"
                className={({ isActive }) =>
                  `block py-2 px-4 text-gray-700 ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'} rounded`
                }
              >
                Appointment Management
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/#/" element={<Home />} />
            <Route path="/#/about" element={<About />} />
            <Route path="/#/doctor-verification" element={<DoctorVerification />} />
            <Route path="/#/users" element={<UserManagement />} />
            <Route path="/#/appointments" element={<AppointmentManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
