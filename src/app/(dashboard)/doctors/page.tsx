import { fetchDoctors } from "@/lib/actions";
import { DoctorsClientPage } from "./client-page";

export default async function DoctorsPage() {
  const initialDoctors = await fetchDoctors();

  return (
    <div className="fade-in">
      <DoctorsClientPage initialDoctors={initialDoctors} />
    </div>
  );
}
