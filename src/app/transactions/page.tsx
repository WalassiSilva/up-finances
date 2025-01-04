import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/prisma";
import React from "react";
import { transactionsColumns } from "./_columns";
import AddTransactionButton from "@/components/add-transaction-button";

export default async function TransactionsPage() {
  const transactions = await db.transaction.findMany({});

  return (
    <main className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>

      <DataTable
        columns={transactionsColumns}
        data={JSON.parse(JSON.stringify(transactions))}
      />
    </main>
  );
}
