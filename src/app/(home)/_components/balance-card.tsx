import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SummaryCardProps } from "./summary-card";
import AddTransactionButton from "@/components/add-transaction-button";

type BalanceCardProps = Omit<SummaryCardProps, "size">;

export default function BalanceCard({
  icon,
  title,
  amount,
  userCanAddTransaction,
}: BalanceCardProps) {
  return (
    <Card className="bg-white/5">
      <CardHeader className="flex-row items-center gap-4">
        {icon} <p className="text-white opacity-70">{title}</p>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-xl font-bold md:text-2xl lg:text-4xl">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </p>
        <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
      </CardContent>
    </Card>
  );
}
