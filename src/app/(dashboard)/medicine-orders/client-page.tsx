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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal } from "lucide-react";
import type { MedicineOrder } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { updateOrderStatus } from "@/lib/actions";
import { useRouter } from "next/navigation";

export function MedicineOrdersClientPage({ initialOrders }: { initialOrders: MedicineOrder[] }) {
  const [orders, setOrders] = React.useState<MedicineOrder[]>(initialOrders);
  const [searchTerm, setSearchTerm] = React.useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleStatusChange = async (orderId: number, status: MedicineOrder['status']) => {
    const originalOrders = [...orders];

    // Optimistic UI update
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );

    const result = await updateOrderStatus(orderId, status);

    if (result.success) {
      toast({
        title: "Status Updated",
        description: `Order #${orderId} has been marked as ${status}.`,
      });
      router.refresh(); // Re-fetch from server to ensure consistency
    } else {
      // Revert on failure
      setOrders(originalOrders);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: result.message || "Could not update order status.",
      });
    }
  };

  const filteredOrders = orders
    .filter(order => {
        const search = searchTerm.toLowerCase();
        const medicineList = (Array.isArray(order.items) ? order.items.map(i => i.name).join(', ') : "").toLowerCase();
        
        return (order.name && order.name.toLowerCase().includes(search)) ||
               (order.email && order.email.toLowerCase().includes(search)) ||
               medicineList.includes(search) ||
               (order.status && order.status.toLowerCase().includes(search)) ||
               (String(order.id).toLowerCase().includes(search));
    });

  const getStatusVariant = (status: MedicineOrder['status']) => {
    switch (status) {
        case 'Delivered': return 'default';
        case 'Shipped': return 'default';
        case 'Processing': return 'secondary';
        case 'Cancelled': return 'destructive';
        case 'Pending':
        default:
            return 'secondary';
    }
  };

  const getStatusColor = (status: MedicineOrder['status']) => {
      switch (status) {
          case 'Delivered': return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300";
          case 'Shipped': return "bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300";
          case 'Processing': return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300";
          case 'Cancelled': return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300";
          case 'Pending':
          default:
              return "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300";
      }
  };

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle>Medicine Orders</CardTitle>
        <CardDescription>
          View and manage all medicine orders.
        </CardDescription>
        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
              type="search"
              placeholder="Search by name, email, status..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Medicines</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{order.name}</div>
                  <div className="text-sm text-muted-foreground">{order.email}</div>
                </TableCell>
                <TableCell>
                  {Array.isArray(order.items)
                    ? order.items.map(item => `${item.name || 'N/A'} (x${item.quantity || 0})`).join(', ')
                    : 'No items'
                  }
                </TableCell>
                <TableCell>
                  {order.total_amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)} className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'No date'}</TableCell>
                <TableCell>
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Pending')}>
                        Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Processing')}>
                        Processing
                      </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Shipped')}>
                        Shipped
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Delivered')}>
                        Delivered
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Cancelled')}>
                        Cancelled
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
