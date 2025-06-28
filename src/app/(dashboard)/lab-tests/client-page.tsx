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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { LabTest } from "@/lib/types";

export function LabTestsClientPage({ initialLabTests }: { initialLabTests: LabTest[] }) {
  const [labTests, setLabTests] = React.useState<LabTest[]>(initialLabTests);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredLabTests = labTests.filter(test => {
      const search = searchTerm.toLowerCase();
      const nameMatch = test.name && test.name.toLowerCase().includes(search);
      const testsMatch = Array.isArray(test.tests) && test.tests.join(', ').toLowerCase().includes(search);
      return nameMatch || testsMatch;
    }
  );

  return (
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Lab Test Orders</CardTitle>
          <CardDescription>
            View all lab test orders.
          </CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by patient name or test..."
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
                <TableHead>Tests</TableHead>
                <TableHead>Ordered At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLabTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.name || 'N/A'}</TableCell>
                  <TableCell>{Array.isArray(test.tests) ? test.tests.join(', ') : 'No tests'}</TableCell>
                  <TableCell>
                    {test.created_at
                      ? new Date(test.created_at).toLocaleString()
                      : 'No date'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  );
}
