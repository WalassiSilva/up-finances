import { MAX_TRANSACTIONS_FREE_PLAN } from "@/app/_constants/transactions";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-month-transaction";

export async function canUserAddTransaction() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await clerkClient().users.getUser(userId);
  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }

  const currentMonthTransaction = await getCurrentMonthTransactions();
  if (currentMonthTransaction >= MAX_TRANSACTIONS_FREE_PLAN) {
    return false;
  }

  return true;
}
