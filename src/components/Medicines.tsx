import React, { useState } from 'react';
import { Search, ShoppingCart, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const medicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    manufacturer: "HealthCare Pharma",
    price: 50,
    description: "For fever and pain relief",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80",
    category: "Pain Relief"
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    manufacturer: "MediCure Labs",
    price: 120,
    description: "Antibiotic medication",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=300&q=80",
    category: "Antibiotics"
  },
  {
    id: 3,
    name: "Omeprazole 20mg",
    manufacturer: "PharmaCare",
    price: 85,
    description: "For acid reflux and ulcers",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=300&q=80",
    category: "Gastrointestinal"
  },
  {
    id: 4,
    name: "Cetirizine 10mg",
    manufacturer: "AllergyCare",
    price: 45,
    description: "Antihistamine for allergies",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=300&q=80",
    category: "Allergy"
  },
  {
    id: 5,
    name: "Metformin 500mg",
    manufacturer: "DiaCare",
    price: 75,
    description: "For type 2 diabetes",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=300&q=80",
    category: "Diabetes"
  },
  {
    id: 6,
    name: "Aspirin 75mg",
    manufacturer: "CardioHealth",
    price: 35,
    description: "Blood thinner",
    requiresPrescription: false,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=300&q=80",
    category: "Cardiovascular"
  }
];

function Medicines() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { cartItems, addToCart, updateQuantity } = useCart();

  const categories = Array.from(new Set(medicines.map(m => m.category)));

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (medicine: any) => {
    addToCart({
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      type: 'medicine',
      requiresPrescription: medicine.requiresPrescription
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">Online Pharmacy</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <select
          className="p-2 border border-gray-300 rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map(medicine => (
          <motion.div
            key={medicine.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={medicine.image}
              alt={medicine.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{medicine.name}</h3>
              <p className="text-gray-600 mb-2">{medicine.manufacturer}</p>
              <p className="text-gray-700 mb-2">{medicine.description}</p>
              <p className="text-lg font-bold mb-2">₹{medicine.price}</p>
              <button
                onClick={() => handleAddToCart(medicine)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
          <h3 className="text-lg font-semibold mb-4">Shopping Cart</h3>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span>₹{item.price * item.quantity}</span>
              </div>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>₹{getTotalAmount()}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Medicines;