"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col-reverse justify-between border-b border-solid px-8 py-4 md:flex-row">
      <div className="flex items-center gap-10">
        <Link href="/" className="hidden md:block">
          <Image src="/logo.svg" width={173} height={39} alt="Up finances" />
        </Link>
        <Link
          href="/"
          className={
            pathname === "/"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Dashboard
        </Link>

        <Link
          href="/transactions"
          className={
            pathname === "/transactions"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Transactions
        </Link>

        <Link
          href="/subscription"
          className={
            pathname === "/subscription"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Assinatura
        </Link>
      </div>
      <div className="flex justify-between">
        <Link href="/" className="md:hidden">
          <Image src="/logo.svg" width={173} height={39} alt="Up finances" />
        </Link>
        <UserButton showName />
      </div>
    </nav>
  );
}
