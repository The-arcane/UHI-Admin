import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: String,
  description: String,
  price: { type: Number, required: true },
  category: String,
  requiresPrescription: { type: Boolean, default: false },
  stock: Number,
  image: String
});

const medicineOrderSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  prescription: String, // URL to uploaded prescription if required
  status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  }
}, {
  timestamps: true
});

export const Medicine = mongoose.model('Medicine', medicineSchema);
export const MedicineOrder = mongoose.model('MedicineOrder', medicineOrderSchema);