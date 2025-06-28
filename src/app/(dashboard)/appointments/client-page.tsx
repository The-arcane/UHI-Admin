"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import type { Appointment } from "@/lib/types";
import { updateAppointmentStatus } from "@/lib/actions";
import { useRouter } from "next/navigation";

export function AppointmentsClientPage({ initialAppointments }: { initialAppointments: Appointment[] }) {
  const [appointments, setAppointments] = React.useState<Appointment[]>(initialAppointments);
  const [searchTerm, setSearchTerm] = React.useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleStatusChange = async (appointmentToUpdate: Appointment, status: Appointment["status"]) => {
    const originalAppointments = [...appointments];
    
    // Optimistically update UI
    setAppointments(
      appointments.map((apt) => (apt.id === appointmentToUpdate.id ? { ...apt, status } : apt))
    );

    if (!appointmentToUpdate.full_name || !appointmentToUpdate.doctor_name || !appointmentToUpdate.date || !appointmentToUpdate.time) {
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: "Cannot update appointment with missing information.",
        });
        setAppointments(originalAppointments);
        return;
    }

    const identifier = {
      full_name: appointmentToUpdate.full_name,
      doctor_name: appointmentToUpdate.doctor_name,
      date: appointmentToUpdate.date,
      time: appointmentToUpdate.time,
    };

    const result = await updateAppointmentStatus(identifier, status);

    if (result.success) {
      toast({
        title: "Status Updated",
        description: `Appointment has been marked as ${status}.`,
      });
      // Refresh from server to get latest data
      router.refresh(); 
    } else {
      // Revert UI on failure
      setAppointments(originalAppointments);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: result.message || "Could not update appointment status.",
      });
    }
  };

  const filteredAppointments = appointments.filter(apt =>
    (apt.full_name && apt.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (apt.doctor_name && apt.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle>Appointment Management</CardTitle>
        <CardDescription>
          View and manage all patient appointments.
        </CardDescription>
        <div className="relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by patient or doctor..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.full_name || "N/A"}</TableCell>
                <TableCell>{appointment.doctor_name || "N/A"}</TableCell>
                <TableCell>
                  {appointment.date 
                    ? `${new Date(appointment.date).toLocaleDateString()} at ${appointment.time || ''}`
                    : 'No date'}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      appointment.status === "Completed" ? "default" :
                      appointment.status === "Scheduled" ? "secondary" : "destructive"
                    }
                    className={
                      appointment.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" :
                      appointment.status === "Scheduled" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300" :
                      "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                    }
                  >
                    {appointment.status || "N/A"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleStatusChange(appointment, 'Completed')}>
                        Mark as Completed
                      </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => handleStatusChange(appointment, 'Scheduled')}>
                        Mark as Scheduled
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(appointment, 'Cancelled')}>
                        Mark as Cancelled
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
