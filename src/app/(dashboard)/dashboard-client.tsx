"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";

type ChartProps = {
    appointmentTrend: { name: string; appointments: number }[];
    doctorStatus: { name: string; value: number; fill: string }[];
}

export function DashboardClient({ appointmentTrend, doctorStatus }: ChartProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle>Appointment Trends</CardTitle>
                    <CardDescription>Monthly appointment overview.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ChartContainer config={{}} className="h-[300px] w-full">
                        <LineChart data={appointmentTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <RechartsTooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="appointments" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--accent))" }} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card className="col-span-4 lg:col-span-3 shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle>Doctor Application Status</CardTitle>
                    <CardDescription>Current status of doctor applications.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[300px] w-full">
                        <PieChart>
                            <Pie data={doctorStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                {doctorStatus.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                            <ChartLegend content={<ChartLegendContent />} />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
