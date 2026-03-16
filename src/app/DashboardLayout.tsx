"use client";

import { usePathname } from "next/navigation";
import AppSidebar from "@/components/common/AppSidebar";
import Navbar from "@/components/common/Navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [defaultOpen, setDefaultOpen] = useState(true);

  // Check if current route is an auth route
  const isAuthRoute =
    pathname.startsWith("/login") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/verify-otp");

  useEffect(() => {
    // Get sidebar state from cookie
    const sidebarState = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sidebar_state="))
      ?.split("=")[1];
    setDefaultOpen(sidebarState === "true");
  }, []);

  // If auth route, render children without sidebar/navbar
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // Otherwise, render with sidebar and navbar
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset className="ml-5 px-5">
        <Navbar />
        <div className="">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
