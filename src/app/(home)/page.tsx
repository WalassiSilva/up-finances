import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { getDashboard } from "@/data/get-dashboard";
import TransactionsPieChart from "./_components/transaction-pie-chart";
import Navbar from "@/components/nav-bar";
import { canUserAddTransaction } from "@/data/can-user-add-transaction";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }
  const dashboard = await getDashboard(month);
  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <>
      <Navbar />
      <div className="flex flex-col space-y-6 p-6 lg:h-full lg:overflow-hidden">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        {/* medium and large screen  */}
        <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-[2fr,1fr] lg:overflow-hidden">
          <div className="h-full gap-6 lg:overflow-hidden">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="hidden h-full gap-y-6 sm:grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-6 lg:overflow-hidden 2xl:grid-cols-3">
              <TransactionsPieChart {...dashboard} />

              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          {/* small Mobile */}
          <div className="h-full gap-6 *:mb-4 sm:hidden lg:overflow-hidden">
            <TransactionsPieChart {...dashboard} />

            <ExpensesPerCategory
              expensesPerCategory={dashboard.totalExpensePerCategory}
            />
          </div>

          <LastTransactions
            lastTransactions={JSON.parse(
              JSON.stringify(dashboard.lastTransactions),
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
