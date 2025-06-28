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
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Doctor } from "@/lib/types";
import { updateDoctorStatus } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DetailItem = ({ label, value, isLink = false }: { label: string, value?: string | null, isLink?: boolean }) => {
    if (!value) return null;
    return (
        <div className="space-y-1 flex flex-col">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            {isLink ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate block">{value}</a>
            ) : (
                <p className="text-sm">{value}</p>
            )}
        </div>
    );
};


export function DoctorsClientPage({ initialDoctors }: { initialDoctors: Doctor[] }) {
  const [doctors, setDoctors] = React.useState<Doctor[]>(initialDoctors);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [loadingStates, setLoadingStates] = React.useState<{[key: string]: boolean}>({});
  const [selectedDoctor, setSelectedDoctor] = React.useState<Doctor | null>(null);
  const { toast } = useToast();

  const handleStatusChange = async (id: string, status: "Approved" | "Rejected") => {
    setLoadingStates(prev => ({ ...prev, [id]: true }));
    const result = await updateDoctorStatus(id, status);
    
    if (result.success) {
      setDoctors(
        doctors.map((doc) => (doc.id === id ? { ...doc, verified: status } : doc))
      );
      toast({
        title: "Status Updated",
        description: `Doctor application has been ${status.toLowerCase()}.`,
      });
    } else {
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: result.message || "Could not update doctor status.",
        });
    }
    setLoadingStates(prev => ({ ...prev, [id]: false }));
  };

  const filteredDoctors = doctors.filter(doc => {
    const searchTermLower = searchTerm.toLowerCase();
    return (doc.full_name?.toLowerCase().includes(searchTermLower)) ||
           (doc.email?.toLowerCase().includes(searchTermLower)) ||
           (doc.specialization?.toLowerCase().includes(searchTermLower))
  });

  return (
    <>
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Doctor Management</CardTitle>
          <CardDescription>
            Approve or reject new doctor applications. Click a row for details.
          </CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, email, specialization..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id} onClick={() => setSelectedDoctor(doctor)} className="cursor-pointer">
                  <TableCell className="font-medium">{doctor.full_name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                        <span>{doctor.email}</span>
                        <span className="text-xs text-muted-foreground">{doctor.contact_number}</span>
                    </div>
                  </TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        doctor.verified === "Approved"
                          ? "default"
                          : doctor.verified === "Pending"
                          ? "secondary"
                          : "destructive"
                      }
                      className={
                        doctor.verified === "Approved" ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" 
                        : doctor.verified === "Pending" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300" 
                        : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                      }
                    >
                      {doctor.verified}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    {doctor.verified === 'Pending' && (
                        <div className="flex gap-2 justify-end">
                            <Button variant="outline" size="sm" onClick={() => handleStatusChange(doctor.id, 'Approved')} disabled={loadingStates[doctor.id]}>
                                {loadingStates[doctor.id] ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <CheckCircle2 className="mr-2 h-4 w-4"/>}
                                Approve
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleStatusChange(doctor.id, 'Rejected')} disabled={loadingStates[doctor.id]}>
                                 {loadingStates[doctor.id] ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <XCircle className="mr-2 h-4 w-4"/>}
                                 Reject
                            </Button>
                        </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedDoctor && (
        <Dialog open={!!selectedDoctor} onOpenChange={(isOpen) => !isOpen && setSelectedDoctor(null)}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Doctor Details</DialogTitle>
              <DialogDescription>
                Full information for Dr. {selectedDoctor.full_name}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4 max-h-[70vh] overflow-y-auto p-2">
                <DetailItem label="Full Name" value={selectedDoctor.full_name} />
                <DetailItem label="Email" value={selectedDoctor.email} />
                <DetailItem label="Contact Number" value={selectedDoctor.contact_number} />
                <DetailItem label="Specialization" value={selectedDoctor.specialization} />
                <DetailItem label="Qualifications" value={selectedDoctor.qualifications} />
                <DetailItem label="Registration Number" value={selectedDoctor.registration_number} />
                <DetailItem label="Availability" value={selectedDoctor.availability_status} />
                <DetailItem label="Rating" value={selectedDoctor.rating} />
                <DetailItem label="Application Status" value={selectedDoctor.verified} />
                <div className="md:col-span-2 lg:col-span-3">
                    <DetailItem label="Bio" value={selectedDoctor.bio} />
                </div>
                <DetailItem label="Other Certifications" value={selectedDoctor.other_certifications} />
                <DetailItem label="Certifications URL" value={selectedDoctor.certifications_url} isLink />
                <DetailItem label="Experience Certificates URL" value={selectedDoctor.experience_certificates_url} isLink />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
