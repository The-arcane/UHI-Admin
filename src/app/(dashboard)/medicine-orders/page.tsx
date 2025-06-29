import { fetchMedicineOrders } from "@/lib/actions";
import { MedicineOrdersClientPage } from "./client-page";

export const revalidate = 0;

export default async function MedicineOrdersPage() {
  const orders = await fetchMedicineOrders();

  return (
    <div className="fade-in">
        <MedicineOrdersClientPage initialOrders={orders} />
    </div>
  );
}
