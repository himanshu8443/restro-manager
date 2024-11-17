"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Printer, Search } from "lucide-react";
import { getOrders } from "@/services/api";
import { toast } from "react-toastify";
import { generateAndOpenPDF } from "@/lib/printBill";

export function BillingHistory() {
  const [bills, setBills] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );

  const handlePrint = (bill: any) => {
    generateAndOpenPDF(bill);
  };

  const filteredBills = bills.filter(
    (bill) =>
      (bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.customerPhone.includes(searchTerm)) &&
      (statusFilter === undefined || bill.status === statusFilter)
  );

  useEffect(() => {
    const fetchBills = async () => {
      // Fetch bills from API
      const loadingToast = toast.info("Loading billing history...");
      const data = await getOrders();
      toast.dismiss(loadingToast);
      if (data.error) {
        toast.error(data.error);
        return;
      }
      setBills(data.data);
    };
    fetchBills();
  }, []);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Billing History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-end mb-4">
          <div className="flex-1 max-w-sm">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name or phone"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="ml-4 w-[180px]">
            <Label htmlFor="status-filter" className="sr-only">
              Filter by status
            </Label>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value || undefined)}
            >
              <SelectTrigger id="status-filter">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBills.map((bill) => (
              <TableRow key={bill._id}>
                <TableCell>
                  <div>{bill.customerName}</div>
                  <div className="text-sm text-muted-foreground">
                    {bill.customerPhone}
                  </div>
                </TableCell>
                <TableCell>${bill.total.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bill.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {bill.status}
                  </span>
                </TableCell>
                <TableCell>{bill.paymentMethod}</TableCell>
                <TableCell>{bill.createdAt.split("T")[0]}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePrint(bill)}
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
