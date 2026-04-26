"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import AuthModal from "@/components/AuthModal";
import { SITE_CONFIG } from "@/data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { currentUser, isReady, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/tours", label: "Tours" },
    { href: "/destinations", label: "Destinations" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <Link href="/" className="navbar-logo">
          {SITE_CONFIG.name}
        </Link>

        <ul className="navbar-links">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className={pathname === l.href ? "active" : ""}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          {isReady && currentUser ? (
            <>
              <span className="nav-user-chip">
                {currentUser.role === "admin" ? "Admin" : "Traveler"}: {currentUser.name.split(" ")[0]}
              </span>
              <Link
                href={currentUser.role === "admin" ? "/admin" : "/dashboard"}
                className="btn-outline nav-dashboard-link"
              >
                {currentUser.role === "admin" ? "Admin Panel" : "My Dashboard"}
              </Link>
              <button type="button" className="btn-primary" onClick={logout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn-outline"
                onClick={() => {
                  setAuthMode("login");
                  setIsAuthOpen(true);
                }}
              >
                Log In
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  setAuthMode("signup");
                  setIsAuthOpen(true);
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      <AuthModal
        initialMode={authMode}
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </>
  );
}
