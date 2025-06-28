import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { fetchChartData } from "@/lib/actions";
import { AnalyticsClient } from "./analytics-client";

export default async function AnalyticsPage() {
  const { appointmentTrend, appointmentsByStatus, doctorSpecializations } = await fetchChartData();

  return (
    <div className="fade-in space-y-6">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>
            In-depth analysis and reports of hospital activities.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <AnalyticsClient 
        appointmentTrend={appointmentTrend} 
        appointmentsByStatus={appointmentsByStatus}
        doctorSpecializations={doctorSpecializations}
      />
    </div>
  );
}
