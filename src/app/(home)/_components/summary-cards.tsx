import React from "react";
import SummaryCard from "./summary-card";
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import BalanceCard from "./balance-card";

type SummaryCardsProps = {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  userCanAddTransaction?: boolean;
};
export default async function SummaryCards({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  userCanAddTransaction,
}: SummaryCardsProps) {
  return (
    <div className="space-y-6">
      <BalanceCard
        amount={balance}
        title="Saldo"
        icon={<WalletIcon size={16} />}
        userCanAddTransaction={userCanAddTransaction}
      />

      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-2 lg:*:flex-1">
        <SummaryCard
          amount={investmentsTotal}
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
