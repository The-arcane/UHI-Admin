'use server';

import { supabase } from './supabase';
import type { Doctor, Appointment, LabTest, MedicineOrder } from './types';
import { revalidatePath } from 'next/cache';

// ========== FETCH ACTIONS ==========

export async function fetchDoctors(): Promise<Doctor[]> {
  const { data, error } = await supabase.from('doctors').select('*');

  if (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
  if (!data) {
    return [];
  }
  if (data.length === 0) {
    console.warn("Warning: fetchDoctors returned 0 rows. This could be an empty table or a Row Level Security (RLS) policy blocking access.");
  }


  return data.map(doctor => ({
    ...doctor,
    verified: doctor.verified === 'true' ? 'Approved' : (doctor.verified === 'false' ? 'Pending' : 'Rejected'),
  }));
}

export async function fetchAppointments(): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from('Appointments')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) {
    console.error('FATAL: Error fetching appointments from Supabase:', error);
    throw new Error(`Supabase query failed for 'Appointments': ${error.message}. Hint: ${error.hint || 'None'}. Details: ${error.details || 'None'}`);
  }

  if (!data) {
    return [];
  }
  if (data.length === 0) {
    console.warn("Warning: fetchAppointments returned 0 rows. This could be an empty table or a Row Level Security (RLS) policy blocking access.");
  }

  return (data || []).map((appointment, index) => ({
      ...appointment,
      id: index, // synthetic id required for UI key
  }));
}


export async function fetchLabTests(): Promise<LabTest[]> {
    const { data, error } = await supabase.from('Lab_Test').select('*').order('date', { ascending: false });

    if (error) {
        console.error('FATAL: Error fetching lab tests from Supabase:', error);
        throw new Error(`Supabase query failed for 'Lab_Test': ${error.message}. Hint: ${error.hint || 'None'}. Details: ${error.details || 'None'}`);
    }
    if (!data) {
        return [];
    }
    if (data.length === 0) {
      console.warn("Warning: fetchLabTests returned 0 rows. This could be an empty table or a Row Level Security (RLS) policy blocking access.");
    }
    
    return data.map((test, index) => {
        let parsedTests: string[] = [];
        if (typeof test.tests === 'string' && test.tests.length > 0) {
            parsedTests = test.tests.split(',').map(t => t.trim()).filter(t => t);
        }

        return {
            ...test,
            id: index, // synthetic id
            tests: parsedTests,
        };
    });
}


export async function fetchMedicineOrders(): Promise<MedicineOrder[]> {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    
    if (error) {
        console.error('FATAL: Error fetching medicine orders from Supabase:', error);
        throw new Error(`Supabase query failed for 'orders': ${error.message}. Hint: ${error.hint || 'None'}. Details: ${error.details || 'None'}`);
    }
    if (!data) {
        return [];
    }
     if (data.length === 0) {
      console.warn("Warning: fetchMedicineOrders returned 0 rows from 'orders' table. This could be an empty table or a Row Level Security (RLS) policy blocking access.");
    }
    
    return data.map(order => {
      return {
        ...order,
        items: Array.isArray(order.items) ? order.items : [],
        status: order.status || 'Pending',
      };
    });
}


export async function fetchDashboardStats() {
    const [
      { count: doctorsCount, error: dError },
      { count: appointmentsCount, error: aError },
      { count: labTestsCount, error: lError },
      { count: medicineOrdersCount, error: mError }
    ] = await Promise.all([
      supabase.from('doctors').select('*', { count: 'exact', head: true }),
      supabase.from('Appointments').select('*', { count: 'exact', head: true }),
      supabase.from('Lab_Test').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true })
    ]);

    if(dError) console.error("Error counting doctors", dError);
    if(aError) console.error("Error counting appointments", aError);
    if(lError) console.error("Error counting lab tests", lError);
    if(mError) console.error("Error counting medicine orders", mError);

    return {
      doctors: doctorsCount ?? 0,
      appointments: appointmentsCount ?? 0,
      labTests: labTestsCount ?? 0,
      medicineOrders: medicineOrdersCount ?? 0,
    };
}

export async function fetchRecentMedicineOrders() {
    const { data, error } = await supabase
        .from('orders')
        .select('id, name, items, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error('Error fetching recent orders:', error);
        return [];
    }
    
    if (!data) {
        return [];
    }
    if (data.length === 0) {
        console.warn("Warning: fetchRecentMedicineOrders returned 0 rows from 'orders' table. This could be an empty table or a Row Level Security (RLS) policy blocking access.");
    }

    return data.map(order => {
        let firstMedicine = 'N/A';
        if (Array.isArray(order.items) && order.items.length > 0) {
            firstMedicine = order.items[0]?.name || 'N/A';
        }

        return {
            id: order.id,
            patient: order.name,
            medicine: firstMedicine,
            created_at: order.created_at,
        }
    });
}

export async function fetchChartData() {
    const { data: appointments, error: aptError } = await supabase.from('Appointments').select('date, status');
    const { data: doctors, error: docError } = await supabase.from('doctors').select('verified, specialization');

    if (aptError || docError) {
        console.error('Chart data fetch error:', aptError || docError);
        return { appointmentTrend: [], doctorStatus: [], appointmentsByStatus: [], doctorSpecializations: [] };
    }

    const safeAppointments = appointments || [];
    const safeDoctors = doctors || [];

    const appointmentTrend = safeAppointments.reduce((acc, apt) => {
        if (!apt.date) return acc;
        const month = new Date(apt.date).toLocaleString('default', { month: 'short' });
        const existing = acc.find(item => item.name === month);
        if (existing) {
            existing.appointments++;
        } else {
            acc.push({ name: month, appointments: 1 });
        }
        return acc;
    }, [] as {name: string, appointments: number}[]);

    const doctorStatus = safeDoctors.reduce((acc, doc) => {
        const status = doc.verified === 'true' ? 'Approved' : (doc.verified === 'false' ? 'Pending' : 'Rejected');
        const existing = acc.find(item => item.name === status);
        if(existing) {
            existing.value++;
        } else {
            const fill = status === 'Approved' ? 'hsl(var(--chart-2))' : status === 'Pending' ? 'hsl(var(--chart-1))' : 'hsl(var(--chart-3))';
            acc.push({ name: status, value: 1, fill });
        }
        return acc;
    }, [] as { name: string, value: number, fill: string }[]);

    const appointmentsByStatus = safeAppointments.reduce((acc, apt) => {
        const status = apt.status || 'Scheduled';
        const existing = acc.find(item => item.name === status);
        if (existing) {
            existing.value++;
        } else {
            acc.push({ name: status, value: 1 });
        }
        return acc;
    }, [] as { name: string, value: number }[]);

    const doctorSpecializations = safeDoctors.reduce((acc, doc) => {
        const spec = doc.specialization || 'General';
        const existing = acc.find(item => item.name === spec);
        if (existing) {
            existing.count++;
        } else {
            acc.push({ name: spec, count: 1 });
        }
        return acc;
    }, [] as { name: string, count: number }[]);


    return { appointmentTrend, doctorStatus, appointmentsByStatus, doctorSpecializations };
}


// ========== MUTATION ACTIONS ==========

export async function updateDoctorStatus(id: string, status: 'Approved' | 'Rejected') {
  const dbValue = status === 'Approved' ? 'true' : 'rejected';
  const { error } = await supabase.from('doctors').update({ verified: dbValue }).eq('id', id);
  if (error) {
    console.error('Error updating doctor status:', error);
    return { success: false, message: error.message };
  }
  revalidatePath('/doctors');
  return { success: true, message: `Doctor status updated to ${status}` };
}

export async function updateAppointmentStatus(identifier: { full_name: string, doctor_name: string, date: string, time: string }, status: Appointment['status']) {
  if (!identifier.full_name || !identifier.doctor_name || !identifier.date || !identifier.time) {
    return { success: false, message: "Cannot update appointment with missing identifying information." };
  }
  const { error } = await supabase.from('Appointments')
    .update({ status })
    .match({
        full_name: identifier.full_name,
        doctor_name: identifier.doctor_name,
        date: identifier.date,
        time: identifier.time,
    });
  if (error) {
    console.error('Error updating appointment status:', error);
    return { success: false, message: error.message };
  }
  revalidatePath('/appointments');
  return { success: true };
}

export async function updateOrderStatus(id: number, status: MedicineOrder['status']) {
  const { error } = await supabase.from('orders').update({ status }).eq('id', id);
  if (error) {
    console.error('Error updating order status:', error);
    return { success: false, message: error.message };
  }
  revalidatePath('/medicine-orders');
  return { success: true };
}


// ========== AUTH ACTIONS ==========

export async function verifyAdmin(email: string, pass: string): Promise<{ success: boolean; user?: any; error?: string }> {
  // This is insecure. Passwords should be hashed.
  // This is a simple check for demonstration purposes based on the provided table structure.
  const { data, error } = await supabase.from('admin').select('email, password').eq('email', email).single();

  if (error || !data) {
    return { success: false, error: 'User not found.' };
  }

  if (data.password === pass) {
    const adminUser = {
      name: 'Admin User',
      email: data.email,
      role: 'admin',
      avatar: '/avatar.png',
    };
    return { success: true, user: adminUser };
  }

  return { success: false, error: 'Invalid password.' };
}
