"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
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
import { Utensils, ArrowLeft, LogIn } from "lucide-react";
import { login } from "@/services/api";
import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Logging in...");
    const data = await login(email, password);
    toast.dismiss(loadingToast);
    if (data.error) {
      toast.error(data.error);
    } else {
      if (typeof window !== "undefined") {
        {
          toast.success("Logged in successfully");
          localStorage.setItem("PROFILE", JSON.stringify(data.data));
          localStorage.setItem("ROLE", role);
          localStorage.setItem("TOKEN", data.token);
          router.push(`/dashboard`);
        }
      }
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
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Login to Restro-Manager
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="space-y-2 flex flex-row align-center gap-2">
                <Label>Role</Label>
                <button
                  type="button"
                  className={`${
                    role === "staff" ? "bg-primary text-white" : "bg-gray-200"
                  } py-2 rounded-md w-24`}
                  onClick={() => setRole("staff")}
                >
                  Employee
                </button>
                <button
                  type="button"
                  className={`${
                    role === "owner" ? "bg-primary text-white" : "bg-gray-200"
                  } w-24 py-2 rounded-md`}
                  onClick={() => setRole("owner")}
                >
                  Employer
                </button>
              </div>
              <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" /> Log In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot your password?
            </Link>
            <div className="text-sm text-center">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-semibold hover:underline"
              >
                Register here
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

export default LoginPage;
