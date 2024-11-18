"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Trash2, Receipt } from "lucide-react";
import { generateOrder, getProducts } from "@/services/api";
import { toast } from "react-toastify";

interface BillItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export function GenerateOrder() {
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [status, setStatus] = useState("Paid");
  const [products, setProducts] = useState<any[]>([]);

  const addItem = () => {
    if (!selectedProduct || products.length === 0) return;
    const product = products.find((p) => p._id.toString() === selectedProduct);
    if (product) {
      const newItem: BillItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: parseInt(quantity),
      };
      setBillItems([...billItems, newItem]);
      setSelectedProduct("");
      setQuantity("1");
    }
  };

  const removeItem = (id: number) => {
    setBillItems(billItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return billItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const generateBill = async () => {
    // Here you would typically handle bill generation, e.g., sending to a printer or saving to a database
    console.log("Generating bill:", {
      customerName,
      customerPhone,
      paymentMethod,
      status,
      items: billItems,
      total: calculateTotal(),
    });
    const loadingToast = toast.info("Generating bill...");
    const token =
      (typeof window !== "undefined" && localStorage.getItem("TOKEN")) || "";
    const order = await generateOrder(
      customerName,
      customerPhone,
      paymentMethod,
      status,
      billItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      token
    );
    toast.dismiss(loadingToast);
    if (order.error) {
      console.error(order.error);
      toast.error(order.error);
      return;
    }
    console.log("Order generated:", order.data);
    toast.success("Order generated successfully!");
    setBillItems([]);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const token =
        (typeof window !== "undefined" && localStorage.getItem("TOKEN")) || "";
      const response = await getProducts(token);
      if (response.error) {
        console.error(response.error);
        return;
      }
      setProducts(response.data);
      console.log("Products:", response.data);
    };
    fetchProducts();
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Generate Order</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <Label htmlFor="customerPhone">Customer Phone</Label>
              <Input
                id="customerPhone"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Enter customer phone"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="paymentMethod">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Online">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* <div>
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="product">Product</Label>
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger id="product">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem
                      key={product._id}
                      value={product._id.toString()}
                    >
                      {product.name} - Rs. {product.price.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-24">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addItem} disabled={!selectedProduct}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>Rs. {item.price.toFixed(2)}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-2xl font-bold">Total: Rs. {calculateTotal()}</div>
        <Button
          onClick={generateBill}
          disabled={
            billItems.length === 0 ||
            !customerName ||
            !customerPhone ||
            !paymentMethod ||
            !status
          }
        >
          <Receipt className="mr-2 h-4 w-4" />
          Generate Bill
        </Button>
      </CardFooter>
    </Card>
  );
}
