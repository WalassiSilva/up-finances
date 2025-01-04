"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

export async function upsertTransaction(
  params: Omit<Prisma.TransactionCreateInput, "userId">,
) {
  upsertTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.transaction.upsert({
    where: {
      id: params.id ?? "",
    },
    update: { ...params, userId },
    create: { ...params, userId },
  });
  revalidatePath("/transactions");
}
