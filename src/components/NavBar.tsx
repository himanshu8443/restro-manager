"use client";
import Link from "next/link";
import { Utensils } from "lucide-react";
import { Button } from "./ui/button";
import { useLayoutEffect, useState } from "react";

export default function NavBar() {
  const [isLogged, setIsLogged] = useState(false);
  useLayoutEffect(() => {
    const checkLoggedIn = async () => {
      const loggedIn = localStorage.getItem("TOKEN");
      setIsLogged(loggedIn ? true : false);
    };
    checkLoggedIn();
  }, []);
  return (
    <header className="bg-primary text-primary-foreground py-4 flex items-center justify-between">
      <div className="container mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Utensils className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Restro-Manager</h1>
        </Link>
      </div>
      {!isLogged && (
        <nav className="flex items-center space-x-4">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </nav>
      )}
      {isLogged && (
        <nav className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant={"secondary"}>Dashboard</Button>
          </Link>
          <Link href="/logout">
            <Button variant={"destructive"}>Logout</Button>
          </Link>
        </nav>
      )}
    </header>
  );
}
