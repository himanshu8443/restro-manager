import { getStaff } from "@/services/api";
import { Button } from "@/components/ui/button";
import { deleteStaff } from "@/services/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Trash2, Edit2 } from "lucide-react";
import { AddStaffModal } from "./addStaffModal";

export function StaffContent() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      const data = await getStaff();
      console.log(data);
      setStaff(data?.data);
      setLoading(false);
    };
    fetchStaff();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">Staff Management</h2>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {staff.map((staff: any) => (
            <StaffCard
              key={staff._id}
              firstName={staff.firstName}
              lastName={staff.lastName}
              email={staff.email}
              role={staff.accountType}
              id={staff._id}
              setStaff={setStaff}
            />
          ))}
          {staff.length === 0 && loading === false && (
            <>
              <p>No staff found</p>
            </>
          )}
          <AddStaffModal setStaff={setStaff} />
        </div>
      )}
    </div>
  );
}

function StaffCard({
  firstName,
  lastName,
  email,
  role,
  id,
  setStaff,
}: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  id: string;
  setStaff: any;
}) {
  const handleDeleteStaff = (staffId: string) => async () => {
    const loadingToast = toast.info("Deleting staff...");
    const response = await deleteStaff(staffId);
    toast.dismiss(loadingToast);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    setStaff((prev: any) => prev.filter((staff: any) => staff._id !== staffId));
    toast.success("Staff deleted successfully!");
  };

  return (
    <Card className="group">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <ClipboardList className="h-6 w-6" />
          <CardTitle>
            {firstName} {lastName}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-col  items-start gap-3">
        <p>{email}</p>
        <p>{role}</p>
        <p className="font-bold text-gray-500">ID: {id}</p>
      </CardContent>
      <div className="flex justify-end gap-2 p-4 group-hover:opacity-100 opacity-0 transition-opacity">
        <button
          onClick={handleDeleteStaff(id)}
          className="p-2 rounded-full bg-red-500 text-white"
        >
          <Trash2 className="h-6 w-6" />
        </button>
        <AddStaffModal setStaff={setStaff} isEdit={id} />
      </div>
    </Card>
  );
}
