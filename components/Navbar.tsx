"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Navbar as CatalystNavbar,
  NavbarSection,
  NavbarSpacer,
  NavbarItem,
  NavbarLabel,
} from "@/components/catalyst/navbar";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-950/10 bg-white dark:border-white/10 dark:bg-zinc-950">
      <div className="mx-auto flex w-full max-w-7xl items-center px-6">
        <CatalystNavbar>
          {/* Logo */}
          <NavbarSection>
            <NavbarLabel className="text-lg font-bold">
              Student Portal
            </NavbarLabel>
          </NavbarSection>

          <NavbarSpacer />

          {/* Navigation */}
          <NavbarSection>
            <NavbarItem
              href="/"
              current={pathname === "/"}
            >
              Home
            </NavbarItem>

            <NavbarItem
              href="/about"
              current={pathname === "/about"}
            >
              About
            </NavbarItem>

            <NavbarItem
              href="/context"
              current={pathname === "/context"}
            >
              Contact
            </NavbarItem>

            <NavbarItem
              href="/student"
              current={pathname.startsWith("/student")}
            >
              Student
            </NavbarItem>
          </NavbarSection>
        </CatalystNavbar>
      </div>
    </header>
  );
}