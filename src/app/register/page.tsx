"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Utensils, ArrowLeft, UserPlus } from "lucide-react";
import { register } from "@/services/api";
import { toast } from "react-toastify";
// import IsLoggedIn from "@/lib/IsLoggedIn";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the registration logic
    console.log("Registration attempt with:", {
      firstName,
      lastName,
      email,
      password,
    });
    const loading = toast.loading("Registering...");
    const data = await register(firstName, lastName, email, password);
    toast.dismiss(loading);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Registration successful! Please log in.");
      router.push(`/login`);
    }
  };

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("TOKEN");
      if (token) {
        router.push("/dashboard");
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* <IsLoggedIn /> */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Register for Restro-Manager
            </CardTitle>
            <CardDescription className="text-center">
              Create your account to start managing your restaurant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" /> Register
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-semibold hover:underline"
              >
                Log in here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="bg-muted py-4">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
