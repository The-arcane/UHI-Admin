import mongoose from 'mongoose';

const labTestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  requirements: [String],
  duration: String,
  reportTime: String,
  category: String
});

const labBookingSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LabTest' }],
  date: { type: Date, required: true },
  time: String,
  type: { type: String, enum: ['home', 'lab'], required: true },
  address: String,
  labLocation: String,
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  totalAmount: Number
}, {
  timestamps: true
});

export const LabTest = mongoose.model('LabTest', labTestSchema);
export const LabBooking = mongoose.model('LabBooking', labBookingSchema);