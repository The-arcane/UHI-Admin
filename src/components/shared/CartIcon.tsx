import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

function CartIcon() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 left-6 z-50"
    >
      <button
        onClick={() => navigate('/cart')}
        className="relative bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </motion.div>
  );
}

export default CartIcon;