import { fetchDoctors } from "@/lib/actions";
import { DoctorsClientPage } from "./client-page";

export const revalidate = 0;

export default async function DoctorsPage() {
  const initialDoctors = await fetchDoctors();

  return (
    <div className="fade-in">
      <DoctorsClientPage initialDoctors={initialDoctors} />
    </div>
  );
}
