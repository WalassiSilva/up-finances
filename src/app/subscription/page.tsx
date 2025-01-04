import Navbar from "@/components/nav-bar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function SubscriptionPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  return (
    <main>
      <Navbar />
    </main>
  );
}
