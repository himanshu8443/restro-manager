import { getStaff } from "@/services/api";
import { Button } from "@/components/ui/button";
import { deleteStaff } from "@/services/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User2, Trash2, Edit2 } from "lucide-react";
import { AddStaffModal } from "./addStaffModal";

export function StaffContent() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      const token =
        (typeof window !== "undefined" && localStorage.getItem("TOKEN")) || "";
      const data = await getStaff(token);
      console.log(data);
      if (data.data) {
        setStaff(data?.data);
      }
      setLoading(false);
    };
    fetchStaff();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900">Staff Management</h2>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className=" flex flex-col gap-4 mt-4">
          {staff?.map((staff: any) => (
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
          {staff?.length === 0 && loading === false && (
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
    const loadingToast = toast.loading("Deleting staff...");
    const token =
      (typeof window !== "undefined" && localStorage.getItem("TOKEN")) || "";
    const response = await deleteStaff(staffId, token);
    toast.dismiss(loadingToast);
    if (response.error) {
      toast.error(response.error);
      return;
    }
    setStaff((prev: any) => prev.filter((staff: any) => staff._id !== staffId));
    toast.success("Staff deleted successfully!");
  };

  return (
    <Card className="group flex flex-row items-center">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <User2 className="h-8 w-8" />
          <CardTitle className="text-lg font-bold">
            {firstName} {lastName}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-row mt-4 flex justify-around items-center gap-3 w-[60%]">
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
