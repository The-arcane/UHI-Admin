"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

type AnalyticsClientProps = {
    appointmentTrend: { name: string, appointments: number }[];
    appointmentsByStatus: { name: string, value: number }[];
    doctorSpecializations: { name: string, count: number }[];
}

export function AnalyticsClient({ appointmentTrend, appointmentsByStatus, doctorSpecializations }: AnalyticsClientProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle>Appointment Trends</CardTitle>
                    <CardDescription>Appointments over the last few months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[300px] w-full">
                        <LineChart data={appointmentTrend} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <RechartsTooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="appointments" stroke="hsl(var(--primary))" strokeWidth={2} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle>Appointments by Status</CardTitle>
                    <CardDescription>Distribution of appointment statuses.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[300px] w-full">
                        <PieChart>
                            <Pie
                                data={appointmentsByStatus}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                    return (
                                        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                                            {`${(percent * 100).toFixed(0)}%`}
                                        </text>
                                    );
                                }}
                            >
                                {appointmentsByStatus.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip content={<ChartTooltipContent />} />
                             <ChartLegend content={<ChartLegendContent />} />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="shadow-lg rounded-2xl lg:col-span-2">
                <CardHeader>
                    <CardTitle>Doctor Specializations</CardTitle>
                    <CardDescription>Number of doctors per specialization.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{}} className="h-[350px] w-full">
                        <BarChart data={doctorSpecializations} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" width={80} tickLine={false} axisLine={false} />
                            <RechartsTooltip cursor={{ fill: 'hsl(var(--muted))' }} content={<ChartTooltipContent />} />
                            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
