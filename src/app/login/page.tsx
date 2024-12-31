import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default async function LoginPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }
  return (
    <main className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image
          src="./logo.svg"
          alt="Finance AI"
          className="mb-8"
          width={173}
          height={39}
        />
        <h1 className="mb-3 text-4xl font-bold">Bem Vindo!</h1>
        <p className="mb-8 text-muted-foreground">
          Up Finances é uma plataforma de gestão financeira, onde voce pode
          gerenciar suas financas de forma simples e eficiente.
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>

      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </main>
  );
}
