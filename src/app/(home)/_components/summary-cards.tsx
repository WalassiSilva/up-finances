import React from "react";
import SummaryCard from "./summary-card";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { db } from "@/lib/prisma";

export default async function SummaryCards({ month }: { month: string }) {
  const where = {
    date: {
      gte: new Date(`2025-${month}-01`),
      lt: new Date(`2025-${month}-31`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const investimetsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const balance = depositsTotal - investimetsTotal - expensesTotal;
  return (
    <div className="space-y-6">
      <SummaryCard
        amount={balance}
        title="Saldo"
        icon={<WalletIcon size={16} />}
        size="large"
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          amount={investimetsTotal}
          title="Investido"
          icon={<PiggyBankIcon size={16} />}
        />
        <SummaryCard
          amount={depositsTotal}
          title="Receitas"
          icon={<TrendingUpIcon size={16} className="text-primary" />}
        />
        <SummaryCard
          amount={expensesTotal}
          title="Despesas"
          icon={<TrendingDownIcon size={16} className="text-danger" />}
        />
      </div>
    </div>
  );
}
