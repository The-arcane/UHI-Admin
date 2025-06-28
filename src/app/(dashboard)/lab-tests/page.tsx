import { fetchLabTests } from "@/lib/actions";
import { LabTestsClientPage } from "./client-page";

export default async function LabTestsPage() {
  const labTests = await fetchLabTests();

  return (
    <div className="fade-in">
        <LabTestsClientPage initialLabTests={labTests} />
    </div>
  );
}
