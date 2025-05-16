import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Add items to your cart to proceed with checkout.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {cartItems.map((item) => (
          <motion.div
            key={`${item.type}-${item.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between py-4 border-b"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">₹{item.price} each</p>
            </div>
            <div className="flex items-center space-x-4">
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
              </div>
              <span className="font-semibold">₹{item.price * item.quantity}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}

        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total Amount:</span>
            <span className="text-2xl font-bold">₹{totalAmount}</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;