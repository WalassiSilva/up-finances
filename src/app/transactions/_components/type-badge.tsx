import { Badge } from "@/components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";
import React from "react";

type TransactionTypeBadgeProps = {
  transaction: Transaction;
};
export default function TransactionTypeBadge({
  transaction,
}: TransactionTypeBadgeProps) {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="bg-primary/10 font-bold text-primary hover:bg-primary/15">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Depósito
      </Badge>
    );
  }

  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-danger/10 font-bold text-danger hover:bg-danger/15">
        <CircleIcon className="mr-2 fill-danger" size={10} />
        Despesa
      </Badge>
    );
  }

  return (
    <Badge className="bg-white/10 font-bold text-white hover:bg-white/15">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Investimento
    </Badge>
  );
}
