"use client";
import { useRouter } from "next/router";
import { useEffect } from "react";

function IsLoggedIn() {
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = () => {
      // Only run on client-side
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("TOKEN");
        if (!token) {
          router.push("/login");
        }
      }
    };
    checkLoggedIn();
  }, [router]); // Add router to dependencies

  return null;
}

export default IsLoggedIn;
