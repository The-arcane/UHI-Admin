import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { fetchDashboardStats, fetchRecentMedicineOrders, fetchChartData } from "@/lib/actions";
import { HeartPulse, CalendarDays, Beaker, Tablet } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardClient } from './dashboard-client';


export default async function DashboardPage() {
  const stats = await fetchDashboardStats();
  const recentOrders = await fetchRecentMedicineOrders();
  const { appointmentTrend, doctorStatus } = await fetchChartData();

  return (
    <div className="flex flex-col gap-6 fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
            <HeartPulse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.doctors}</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointments}</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lab Tests</CardTitle>
            <Beaker className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.labTests}</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medicine Orders</CardTitle>
            <Tablet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.medicineOrders}</div>
          </CardContent>
        </Card>
      </div>

      <DashboardClient appointmentTrend={appointmentTrend} doctorStatus={doctorStatus} />

      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Recent Medicine Orders</CardTitle>
          <CardDescription>A quick look at the most recent medicine orders.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>First Medicine</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentOrders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.patient}</TableCell>
                            <TableCell>{order.medicine}</TableCell>
                            <TableCell>{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
