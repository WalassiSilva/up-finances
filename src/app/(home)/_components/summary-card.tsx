import AddTransactionButton from "@/components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

export type SummaryCardProps = {
  amount: number;
  title: string;
  icon: React.ReactNode;
  size?: "small" | "large";
  userCanAddTransaction?: boolean;
};
export default function SummaryCard({
  amount,
  title,
  icon,
  size = "small",
  userCanAddTransaction,
}: SummaryCardProps) {
  return (
    <Card className="flex flex-row items-center justify-between lg:flex-col lg:items-start">
      <CardHeader className={`small flex-row items-center gap-2 px-3 lg:gap-4`}>
        {icon}
        <p className={`font-bold text-muted-foreground`}>{title}</p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className={`text-sm font-bold xl:text-xl`}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>
        {size === "large" && (
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        )}
      </CardContent>
    </Card>
  );
}
