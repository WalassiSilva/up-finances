import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";
import { Transaction, TransactionType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type LastTransactionsProps = {
  lastTransactions: Transaction[];
};

export default function LastTransactions({
  lastTransactions,
}: LastTransactionsProps) {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.EXPENSE) return "text-danger";
    if (transaction.type === TransactionType.DEPOSIT) return "text-primary";
    return "text-white";
  };
  const getAmountSign = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+";
    }
    return "-";
  };
  return (
    <ScrollArea className="rounded-md border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Útimas Transações</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.map((transaction) => (
          <div
            className="flex items-center justify-between"
            key={transaction.id}
          >
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-3">
                <Image
                  src={
                    TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]
                  }
                  width={20}
                  height={20}
                  alt="PiX"
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div>
              <p className={`text-bold font-sm ${getAmountColor(transaction)}`}>
                {getAmountSign(transaction)}
                {formatCurrency(Number(transaction.amount))}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
}
