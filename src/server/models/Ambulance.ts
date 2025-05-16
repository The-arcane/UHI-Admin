import mongoose from 'mongoose';

const ambulanceSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  type: { type: String, enum: ['basic', 'advanced', 'cardiac'], required: true },
  currentLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  isAvailable: { type: Boolean, default: true },
  driver: {
    name: String,
    phone: String,
    license: String
  }
});

const ambulanceRequestSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ambulance: { type: mongoose.Schema.Types.ObjectId, ref: 'Ambulance' },
  pickupLocation: {
    address: String,
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: [Number]
    }
  },
  destination: {
    hospital: String,
    address: String,
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: [Number]
    }
  },
  status: { type: String, enum: ['requested', 'assigned', 'picked', 'completed', 'cancelled'], default: 'requested' },
  requestTime: { type: Date, default: Date.now },
  completionTime: Date
}, {
  timestamps: true
});

ambulanceSchema.index({ currentLocation: '2dsphere' });
ambulanceRequestSchema.index({ 'pickupLocation.coordinates': '2dsphere' });

export const Ambulance = mongoose.model('Ambulance', ambulanceSchema);
export const AmbulanceRequest = mongoose.model('AmbulanceRequest', ambulanceRequestSchema);