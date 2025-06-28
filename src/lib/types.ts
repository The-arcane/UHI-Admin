// These types are based on your database schema and UI needs.
// Assumed 'id' and 'status' columns where not specified in the schema.

export type Appointment = {
  id: number; // synthetic id
  full_name: string;
  doctor_name: string;
  date: string;
  time: string;
  status: "Scheduled" | "Completed" | "Cancelled" | string;
  age?: number;
  email?: string;
  phone?: string;
  symptoms?: string;
  preferred_mode?: string;
  gender?: string;
};

export type Doctor = {
  id: string; // uuid
  full_name: string;
  email: string;
  contact_number: string;
  specialization: string;
  verified: "Pending" | "Approved" | "Rejected" | string;
  created_at?: string;
  registration_number?: string | null;
  bio?: string | null;
  experience_certificates_url?: string | null;
  availability_status?: string | null;
  rating?: string | null;
  qualifications?: string | null;
  other_certifications?: string | null;
  certifications_url?: string | null;
};

export type LabTest = {
  id: number; // synthetic id
  name: string; // Patient Name
  tests: string[];
  date: string | null;
  time: string | null;
  created_at: string;
  total_price?: number;
  age?: number;
  gender?: string;
  location?: string;
};

export type MedicineOrder = {
  id: number;
  name: string;
  email: string;
  phone: string;
  items: { name: string; quantity: number; [key: string]: any }[];
  total_amount: number;
  address: string;
  city: string;
  pincode: string;
  payment_method: string;
  created_at: string | null;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | string;
};
