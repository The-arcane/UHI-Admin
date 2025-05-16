import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  type: { type: String, enum: ['video', 'inPerson'], required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  symptoms: String,
  diagnosis: String,
  prescription: String,
  followUp: Date
}, {
  timestamps: true
});

export default mongoose.model('Appointment', appointmentSchema);