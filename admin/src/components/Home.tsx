import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, Video, FileText, Activity, Heart, Shield, Users, ArrowRight, Building2, BookOpen, Award, Ambulance, Pill } from 'lucide-react';
import { motion } from 'framer-motion';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/doctors', { 
      state: { searchTerm, selectedLocation } 
    });
  };

  const features = [
    {
      icon: Video,
      title: "24/7 Video Consultations",
      description: "Connect with doctors instantly through secure video calls"
    },
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Book appointments with top specialists in just a few clicks"
    },
    {
      icon: FileText,
      title: "Digital Health Records",
      description: "Access your medical history anytime, anywhere securely"
    },
    {
      icon: Activity,
      title: "Health Tracking",
      description: "Monitor your vital signs and health metrics in real-time"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Patient",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      text: "The telemedicine service saved me so much time. I got expert medical advice from home!"
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Cardiologist",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
      text: "This platform helps me reach more patients and provide better care with digital tools."
    },
    {
      name: "Amit Patel",
      role: "Patient",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit",
      text: "Managing my family's health records has never been easier. Highly recommended!"
    }
  ];

  const featuredHospitals = [
    {
      name: "Apollo Hospitals",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=500&q=60",
      specialties: ["Cardiology", "Neurology", "Oncology"]
    },
    {
      name: "Fortis Healthcare",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=500&q=60",
      specialties: ["Orthopedics", "Pediatrics", "Surgery"]
    },
    {
      name: "Max Healthcare",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=500&q=60",
      specialties: ["Cardiology", "Gastroenterology", "Dermatology"]
    }
  ];

  const blogs = [
    {
      title: "Understanding Preventive Healthcare",
      author: "Dr. Sarah Johnson",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=500&q=60",
      preview: "Learn why preventive healthcare is crucial for long-term wellness..."
    },
    {
      title: "Mental Health in the Digital Age",
      author: "Dr. Michael Chen",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=60",
      preview: "Exploring the impact of technology on mental well-being..."
    },
    {
      title: "Nutrition Myths Debunked",
      author: "Dr. Emily Brown",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=500&q=60",
      preview: "Common nutrition myths and the science behind healthy eating..."
    }
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Health, Our Priority
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Access quality healthcare services anytime, anywhere
          </p>
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex gap-4 mb-8">
            <input
              type="text"
              placeholder="Search doctors, specialties..."
              className="flex-1 p-3 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              className="w-1/3 p-3 border border-gray-300 rounded-lg"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>

        {/* Quick Access Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Link to="/doctors" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <span>Find Doctors</span>
          </Link>
          <Link to="/lab-tests" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <span>Lab Tests</span>
          </Link>
          <Link to="/medicines" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <Pill className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <span>Order Medicines</span>
          </Link>
          <Link to="/ambulance" className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <Ambulance className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <span>Emergency Services</span>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Featured Doctor Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Meet Our Leading Expert</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=60"
                  alt="Dr. Arun Gupta"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex items-center mb-4">
                  <h3 className="text-2xl font-bold">Dr. Arun Gupta</h3>
                  <Award className="w-6 h-6 text-yellow-500 ml-2" />
                </div>
                <p className="text-gray-600 mb-4">Chief of Cardiology, 25+ Years Experience</p>
                <p className="text-gray-700 mb-6">
                  "Throughout my career, I've witnessed the transformation of healthcare through technology. 
                  The UHI platform represents the future of healthcare delivery, making quality medical care 
                  accessible to all. I'm proud to be part of this revolution in patient care."
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Harvard Medical School</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">500+ Surgeries</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Research Pioneer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Hospitals Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Partner Hospitals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredHospitals.map((hospital, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img 
                  src={hospital.image} 
                  alt={hospital.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{hospital.name}</h3>
                  <p className="text-gray-600 mb-4">
                    <Building2 className="inline-block w-4 h-4 mr-1" />
                    {hospital.location}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Health Blog Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">Health & Wellness Blog</h2>
            <Link to="/blog" className="text-blue-600 hover:text-blue-700 flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4">By {blog.author}</p>
                  <p className="text-gray-700 mb-4">{blog.preview}</p>
                  <Link 
                    to={`/blog/${blog.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;