"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Utensils,
  Home,
  Calendar,
  ClipboardList,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";
import { ProductsContent } from "@/components/ProductContent";
import { StaffContent } from "@/components/StaffContent";
import { GenerateOrder } from "@/components/GenerateOrder";
import { BillingHistory } from "@/components/BillingHistory";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("products");
  const [profile, setProfile] = useState<any | null>(null);
  const router = useRouter();

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("TOKEN");
      const profile = localStorage.getItem("PROFILE");
      if (profile) {
        setProfile(JSON.parse(profile));
      }
      if (!token) {
        router.push("/login");
      }
    }
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 w-full">
        <Sidebar>
          <SidebarHeader>
            <Link href="/" className="flex items-center space-x-2 px-4 py-2">
              <Utensils className="h-6 w-6" />
              <span className="text-xl font-bold">Restro-Manager</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab("products")}
                  isActive={activeTab === "products"}
                >
                  <Home className="mr-2 h-4 w-4" />
                  <span>Products</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {profile?.accountType === "Admin" && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setActiveTab("ManageStaff")}
                    isActive={activeTab === "ManageStaff"}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Manage Staff</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab("generateOrder")}
                  isActive={activeTab === "generateOrder"}
                >
                  <ClipboardList className="mr-2 h-4 w-4" />
                  <span>Generate Order</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab("billingHistory")}
                  isActive={activeTab === "billingHistory"}
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  <span>Billing History</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveTab("settings")}
                  isActive={activeTab === "settings"}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/logout" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <SidebarTrigger />
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="w-full mx-auto py-6 sm:px-6 lg:px-8">
              {activeTab === "products" && <ProductsContent />}
              {activeTab === "ManageStaff" && <StaffContent />}
              {activeTab === "generateOrder" && <GenerateOrder />}
              {activeTab === "billingHistory" && <BillingHistory />}
              {activeTab === "settings" && <SettingsContent />}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function SettingsContent() {
  return <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>;
}
