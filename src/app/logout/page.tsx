"use client";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default async function isLoggedIn() {
  const router = useRouter();
  useLayoutEffect(() => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("PROFILE");
    localStorage.removeItem("ROLE");
    router.push("/login");
  }, []);
}
