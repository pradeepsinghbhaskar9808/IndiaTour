"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <AuthProvider>
      {isAdminRoute ? (
        <main className="admin-route-main">{children}</main>
      ) : (
        <>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ScrollTopButton />
        </>
      )}
    </AuthProvider>
  );
}
