"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/data/get-dashboard/types";
import PercentageItem from "./percentage-item";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },

  [TransactionType.DEPOSIT]: {
    label: "Despesas",
    color: "#55B02D",
  },

  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#e93030",
  },
} satisfies ChartConfig;

type TransactionPieChartProps = {
  typesPercentage: TransactionPercentagePerType;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
};

export default function TransactionsPieChart({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionPieChartProps) {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#FFFFFF",
    },
  ];

  return (
    <ScrollArea className="mb-2 md:mb-0">
      <Card className="flex h-auto flex-col">
        <CardContent className="flex-1 sm:flex sm:items-center lg:block">
          <ChartContainer
            config={chartConfig}
            className="lg:max-h[250px] mx-auto aspect-square w-[240px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="type"
                innerRadius={80}
              />
            </PieChart>
          </ChartContainer>

          <div className="mb-3 flex-1 space-y-3">
            <PercentageItem
              icon={<TrendingUpIcon size={16} className="text-primary" />}
              title="Receita"
              value={typesPercentage[TransactionType.DEPOSIT]}
            />

            <PercentageItem
              icon={<TrendingDownIcon size={16} className="text-danger" />}
              title="Despesas"
              value={typesPercentage[TransactionType.EXPENSE]}
            />

            <PercentageItem
              icon={
                <PiggyBankIcon size={16} className="text-muted-foreground" />
              }
              title="Investido"
              value={typesPercentage[TransactionType.INVESTMENT]}
            />
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
