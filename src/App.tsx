import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from 'react-router-dom';
import { Menu, User, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Cart from './components/Cart';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorSearch from './components/DoctorSearch';
import DoctorVerification from './components/DoctorVerification';
import Telemedicine from './components/Telemedicine';
import MedicalRecords from './components/MedicalRecords';
import HealthInsights from './components/HealthInsights';
import AppointmentBooking from './components/AppointmentBooking';
import AppointmentConfirmation from './components/AppointmentConfirmation';
import VideoCall from './components/VideoCall';
import Feedback from './components/Feedback';
import LabTests from './components/LabTests';
import Medicines from './components/Medicines';
import Insurance from './components/Insurance';
import Ambulance from './components/Ambulance';
import EmergencyContacts from './components/EmergencyContacts';
import SignIn from './components/SignIn';
import AdminDashboard from './components/admin/AdminDashboard';
import CartIcon from './components/shared/CartIcon';
import EmergencyButton from './components/shared/EmergencyButton';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Checkout from './components/Checkout';
import BookingConfirmation from './components/BookingConfirmation';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    return user ? children : <Navigate to="/signin" />;
  };

  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    return user?.role === 'admin' ? children : <Navigate to="/" />;
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <ToastContainer position="top-right" autoClose={3000} />
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              UHI Open Healthcare
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <Menu />
            </button>
            <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block`}>
              <ul className="md:flex space-y-2 md:space-y-0 md:space-x-6">
                <li>
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/doctor-verification"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Verify as Doctor
                  </Link>
                </li>
                <li>
                  <a
                    href="http://localhost:5174/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    HealthBot
                  </a>
                </li>
                {user && (
                  <>
                    <li>
                      <Link
                        to={
                          user.role === 'doctor'
                            ? '/doctor-dashboard'
                            : '/dashboard'
                        }
                        className="text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/doctors"
                        className="text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        Find Doctors
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/medicines"
                        className="text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        Medicines
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/lab-tests"
                        className="text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        Lab Tests
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/insurance"
                        className="text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        Insurance
                      </Link>
                    </li>
                  </>
                )}
                {user ? (
                  <li className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span>{user.name}</span>
                    </div>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Admin
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/signin"
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Sign In
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog/*" element={<Blog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/doctor-verification" element={<DoctorVerification />} />
            <Route path="/dashboard" element={<PrivateRoute><PatientDashboard /></PrivateRoute>} />
            <Route path="/doctor-dashboard" element={<PrivateRoute><DoctorDashboard /></PrivateRoute>} />
            <Route path="/doctors" element={<PrivateRoute><DoctorSearch /></PrivateRoute>} />
            <Route path="/telemedicine" element={<PrivateRoute><Telemedicine /></PrivateRoute>} />
            <Route path="/records" element={<PrivateRoute><MedicalRecords /></PrivateRoute>} />
            <Route path="/insights" element={<PrivateRoute><HealthInsights /></PrivateRoute>} />
            <Route path="/book-appointment/:doctorId" element={<PrivateRoute><AppointmentBooking /></PrivateRoute>} />
            <Route path="/appointment-confirmation" element={<PrivateRoute><AppointmentConfirmation /></PrivateRoute>} />
            <Route path="/video-call/:appointmentId" element={<PrivateRoute><VideoCall /></PrivateRoute>} />
            <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />
            <Route path="/lab-tests" element={<PrivateRoute><LabTests /></PrivateRoute>} />
            <Route path="/medicines" element={<PrivateRoute><Medicines /></PrivateRoute>} />
            <Route path="/insurance" element={<PrivateRoute><Insurance /></PrivateRoute>} />
            <Route path="/ambulance" element={<PrivateRoute><Ambulance /></PrivateRoute>} />
            <Route path="/emergency-contacts" element={<PrivateRoute><EmergencyContacts /></PrivateRoute>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 UHI Open Healthcare Platform. All rights reserved.</p>
          </div>
        </footer>

        {user && (
          <>
            <CartIcon />
            <EmergencyButton />
          </>
        )}
      </div>
    </CartProvider>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}

export default AppWrapper;
