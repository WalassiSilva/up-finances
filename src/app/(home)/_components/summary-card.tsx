import AddTransactionButton from "@/components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

type SummaryCardProps = {
  amount: number;
  title: string;
  icon: React.ReactNode;
  size?: "small" | "large";
};
export default function SummaryCard({
  amount,
  title,
  icon,
  size = "small",
}: SummaryCardProps) {
  return (
    <Card className={`${size === "large" ? "bg-white/20" : ""}`}>
      <CardHeader className="flex-row items-center gap-4">
        {icon}
        <p
          className={`font-bold ${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p
          className={`${size === "small" ? "text-2xl" : "text-4xl"} "text-2xl font-bold"`}
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>
        {size === "large" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
}
