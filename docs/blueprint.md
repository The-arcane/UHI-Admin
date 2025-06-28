# **App Name**: UHIcare Admin Central

## Core Features:

- Secure Authentication: Admin login with Supabase auth.signInWithPassword. Only verified users with role: 'admin' from Supabase table users can access admin dashboard. Use Supabase auth.onAuthStateChange to track session. Protected routes: redirect unauthenticated users to login page. Logout button.
- Intuitive Dashboard Layout: Left sidebar navigation with icons for Dashboard, Doctors, Appointments, Lab Tests, Medicine Orders, Analytics, and Logout. Top nav with admin name & avatar. Responsive grid layout using Tailwind CSS.
- Dashboard Summary Stats: Display summary stats for Total Doctors, Total Appointments, Lab Tests, and Medicine Orders. Animate counts (e.g., count-up effect). Display Recharts pie/line graphs for trends. Optional fallback to dummy data.
- Doctor Approval Panel: Table displaying doctors with fields for Name, Email, Phone, Specialization, Status (Pending, Approved, Rejected). Buttons for Approve/Reject to update Supabase using the update() method. Include search and filter dropdown functionality.
- Appointments Panel: Table displaying appointments with fields for Patient, Doctor, Date, Time, Status. Functionality to update appointment status (Completed / Cancelled).
- Lab Test Orders Panel: Table displaying lab test orders with fields for Test Name, Patient ID, Ordered At, Status. Button to mark tests as Completed.
- Medicine Orders Panel: Table displaying medicine orders with fields for Order ID, Patient, Medicine List, Date, Status (Pending / Delivered). Filter and update delivery status.

## Style Guidelines:

- Primary color: Light blue (#ADD8E6) to maintain consistency with the patient portal theme, promoting a sense of calm and trust. This choice is subtly professional.
- Background color: Very light gray (#F5F5F5) provides a clean and unobtrusive backdrop, ensuring that the data and UI elements stand out.
- Accent color: A slightly darker shade of blue (#77B5FE), used for interactive elements and key actions, providing visual cues without overwhelming the user.
- Font pairing: 'Inter' (sans-serif) for both headlines and body text, to provide a modern, clean, and readable interface.
- Use clear and consistent icons from a library like FontAwesome or Material Icons, adhering to the light theme.
- Utilize a responsive grid layout with rounded cards (rounded-2xl), shadows (shadow-lg), and padding (p-4) as specified, optimizing for different screen sizes.
- Implement subtle fade-in/slide-in effects using Framer Motion for smooth transitions and enhanced user experience.