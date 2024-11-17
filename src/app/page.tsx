"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Utensils,
  Calendar,
  ClipboardList,
  BarChart2,
  ArrowRight,
} from "lucide-react";
import resturantImage from "../assets/restaurant.svg";
import { useEffect, useLayoutEffect, useState } from "react";
import NavBar from "@/components/NavBar";

export default function Page() {
  const [isLogged, setIsLogged] = useState(false);
  useLayoutEffect(() => {
    const checkLoggedIn = async () => {
      const loggedIn = localStorage.getItem("TOKEN");
      setIsLogged(loggedIn ? true : false);
    };
    checkLoggedIn();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">
                  Welcome to Restro-Manager
                </CardTitle>
                <CardDescription className="text-xl mt-2">
                  Streamline your restaurant operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Manage your restaurant efficiently with our powerful tool.
                  From reservations to analytics, we've got you covered.
                </p>
                {!isLogged && (
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                    <Button asChild size="lg">
                      <Link href="/login">
                        Login <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                )}
                {isLogged && (
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
                    <Button asChild size="lg">
                      <Link href="/dashboard">
                        Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src={resturantImage}
                alt="Restaurant interior"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Calendar className="h-10 w-10 text-primary" />}
            title="Reservation Management"
            description="Efficiently manage bookings and table assignments"
          />
          <FeatureCard
            icon={<ClipboardList className="h-10 w-10 text-primary" />}
            title="Inventory Tracking"
            description="Keep track of your stock and supplies in real-time"
          />
          <FeatureCard
            icon={<Utensils className="h-10 w-10 text-primary" />}
            title="Menu Planning"
            description="Create and update your menu with ease"
          />
          <FeatureCard
            icon={<BarChart2 className="h-10 w-10 text-primary" />}
            title="Performance Analytics"
            description="Gain insights into your restaurant's performance"
          />
        </div>
      </main>

      <footer className="bg-muted py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2023 Restro-Manager. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            {" | "}
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
