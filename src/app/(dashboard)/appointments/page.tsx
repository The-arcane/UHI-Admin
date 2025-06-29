import { fetchAppointments } from "@/lib/actions";
import { AppointmentsClientPage } from "./client-page";

export const revalidate = 0;

export default async function AppointmentsPage() {
  const appointments = await fetchAppointments();

  return (
    <div className="fade-in">
      <AppointmentsClientPage initialAppointments={appointments} />
    </div>
  );
}
