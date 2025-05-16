import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase project URL and public anon key
const supabaseUrl = "https://ymqxfnxyacyihvycnqfy.supabase.co";  // e.g., 'https://xyzcompany.supabase.co'
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltcXhmbnh5YWN5aWh2eWNucWZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3OTM2NjgsImV4cCI6MjA2MjM2OTY2OH0.tN4WJ0P0ocNkBkoqJIOe1sSBw46PCZly5T0k7tvzv30";  // e.g., ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ========== Database Functions ==========

// ✅ 1. Fetch Doctor Data (example: from a "doctors" table)
export async function fetchDoctorData() {
  const { data, error } = await supabase.from("doctors").select("*").single(); // Use `.single()` to fetch one doctor

  if (error) {
    throw error;
  }
  return data;
}

// ✅ 2. Book Appointment
export async function bookAppointment(appointmentData: any) {
  const { data, error } = await supabase
    .from("appointments")
    .insert([appointmentData]);
  if (error) throw error;
  return data;
}

// ✅ 3. Get Appointments
export async function fetchAppointments() {
  const { data, error } = await supabase.from("appointments").select("*");
  if (error) throw error;
  return data;
}

// ✅ 4. Register User (Auth)
export async function registerUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

// ✅ 5. Login User (Auth)
export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// ✅ 6. Logout
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// ✅ 7. Add Lab Test
export async function addLabTest(testData: any) {
  const { data, error } = await supabase.from("lab_tests").insert([testData]);
  if (error) throw error;
  return data;
}

// ✅ 8. Fetch Lab Tests
export async function fetchLabTests() {
  const { data, error } = await supabase.from("lab_tests").select("*");
  if (error) throw error;
  return data;
}
