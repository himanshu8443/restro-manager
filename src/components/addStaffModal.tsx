"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Edit2 } from "lucide-react";
import { addStaff, getStaffById, updateStaff } from "@/services/api";
import { toast } from "react-toastify";

export function AddStaffModal({
  setStaff,
  isEdit,
}: {
  setStaff: any;
  isEdit?: string;
}) {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("default");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isEdit) {
      const loadingToast = toast.loading("Adding staff...");
      const token =
        (typeof window !== "undefined" && localStorage.getItem("TOKEN")) || "";
      const data = await addStaff(
        firstName,
        lastName,
        email,
        role,
        password,
        token
      );
      toast.dismiss(loadingToast);
      if (data.error) {
        console.error(data.error);
        return;
      }
      setStaff((prev: any) => [...prev, data.data]);
      toast.success("Staff member added successfully!");
      // Reset form and close modal
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("");
      setOpen(false);
    } else {
      const loadingToast = toast.loading("Updating staff...");
      const token =
        (typeof window !== "undefined" && localStorage.getItem("TOKEN")) || "";
      const data = await updateStaff(
        isEdit,
        firstName,
        lastName,
        email,
        role,
        token
      );
      toast.dismiss(loadingToast);
      if (data.error) {
        console.error(data.error);
        return;
      }
      // update staff in state
      setStaff((prev: any) => {
        const staffIndex = prev.findIndex((staff: any) => staff._id === isEdit);
        prev[staffIndex] = data.data;
        return [...prev];
      });
      toast.success("Staff member updated successfully!");
      // Reset form and close modal
      setFirstName("");
      setLastName("");
      setEmail("");
      setRole("");
      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchStaff = async () => {
      if (!isEdit || isEdit === undefined) return;
      const token =
        (typeof window !== "undefined" && localStorage.getItem("TOKEN")) || "";
      const data = await getStaffById(isEdit, token);
      setFirstName(data.data.firstName);
      setLastName(data.data.lastName);
      setEmail(data.data.email);
      setRole(data.data.role);
    };

    if (isEdit && isEdit !== undefined) {
      fetchStaff();
    }
  }, [isEdit]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <button className="p-2 rounded-full bg-blue-600 text-white">
            <Edit2 />
          </button>
        ) : (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Staff
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Staff Member</DialogTitle>
            <DialogDescription>
              Enter the details of the new staff member here. Click save when
              you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            {!isEdit && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Create Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  {/* <SelectItem value="waiter">Waiter</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Staff Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
