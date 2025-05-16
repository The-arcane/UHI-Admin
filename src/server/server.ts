import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import labRoutes from './routes/labRoutes';
import medicineRoutes from './routes/medicineRoutes';
import ambulanceRoutes from './routes/ambulanceRoutes';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/lab', labRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/ambulance', ambulanceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});