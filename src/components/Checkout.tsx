import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalAmount, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically process the payment and create the order
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/order-confirmation');
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Address</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">PIN Code</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                />
                <span>UPI</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.type}-${item.id}`} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="w-full mt-6 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
          >
            Place Order
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;