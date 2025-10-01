import Layout from "../components/Layout";
import { ActivityItem } from "../components/ui/ActivityItem";
import { Button } from "../components/ui/Button";
import { ActionCard, OverviewCard } from "../components/ui/Card";
import MoneyIcon from "../components/ui/icons/MoneyIcon";
import ProfileIcon from "../components/ui/icons/ProfileIcon";
import SettingsIcon from "../components/ui/icons/SetttingsIcon";
import { InvoiceItem } from "../components/ui/InvoiceItem";

const Invoice = () => {
  const handleInvoiceAction = () => {};
  const invoiceData = [
    {
      id: "1023494-2304",
      dueDate: "May 19th, 2023",
      amount: "$1,311,750.12",
      status: "paid" as const,
    },
    {
      id: "1023495-2305",
      dueDate: "June 1st, 2023",
      amount: "$5,500.00",
      status: "pending" as const,
    },
    {
      id: "1023496-2306",
      dueDate: "April 10th, 2023",
      amount: "$1,000.00",
      status: "overdue" as const,
    },
    {
      id: "1023497-2307",
      dueDate: "July 15th, 2023",
      amount: "$2,345.67",
      status: "draft" as const,
    },
  ];
  return (
    <Layout>
      <div className="flex flex-col gap-4 lg:flex-row items-start lg:items-center justify-between mb-[1.25rem] lg:mb-[2.5rem]">
        <p className="font-medium text-coal text-[2rem]">Invoice</p>
        <div className="flex gap-4  rounded-[2.5rem] w-full lg:justify-end">
          <Button variant="secondary">SEE WHAT'S NEW</Button>
          <Button>CREATE</Button>
        </div>
      </div>
      {/* //overview cards */}
      <section className="flex w-full flex-wrap md:flex-nowrap gap-6 lg:gap-8 justify-between mb-[1.25rem] lg:mb-[2.5rem]">
        <OverviewCard
          title="TOTAL OVERDUE"
          amount="120000"
          status="overdue"
          count={128}
        />
        <OverviewCard
          title="TOTAL UNPAID"
          amount="5400.02"
          status="unpaid"
          count={454676}
        />
        <OverviewCard
          title="TOTAL PAID"
          amount="777733.3"
          status="paid"
          count={8}
        />
        <OverviewCard
          title="TOTAL DRAFT"
          amount="5400"
          status="draft"
          count={3}
        />
      </section>

      {/* action cards */}
      <section className="mb-[1.25rem] lg:mb-[2.5rem]">
        <p className="text-coal font-medium text-xl mb-4">Invoice Actions</p>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-6 lg:gap-8 justify-between mb-[1.25rem] lg:mb-[2.5rem]">
          <ActionCard
            icon={<MoneyIcon className="w-20 h-20" />}
            title="Create New Invoice"
            description="Create new invoices easily "
            onAction={handleInvoiceAction}
            bgClass="bg-[#003EFF] shadow-sm"
            titleClass="text-white"
            descriptionClass="text-[#F6F8FA]"
          />
          <ActionCard
            icon={<SettingsIcon className="w-20 h-20" />}
            title="Change Invoice settings"
            description="Customise your invoices "
            onAction={handleInvoiceAction}
          />
          <ActionCard
            icon={<ProfileIcon className="w-20 h-20" />}
            title="Manage Customer list"
            description="Add and remove customers"
            onAction={handleInvoiceAction}
          />
        </div>
      </section>

      <section className="flex gap-6 flex-col lg:flex-row">
        <div className=" w-full lg:w-[60%] shadow-sm rounded-[2.5rem] p-6 lg:p-8 bg-white">
          <header className="flex gap-4 justify-between items-center mb-6">
            <p className="text-coal font-medium text-xl">Recent Invoices</p>
            <Button variant="tertiary">VIEW ALL INVOICES</Button>
          </header>
          <main>
            <p className="text-coal font-medium uppercase mb-4">
              Today - 27th November, 2022
            </p>
            <div className="space-y-6 w-full">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <InvoiceItem
                  id="1023494-2304"
                  dueDate="May 19th, 2023"
                  amount="$1,311,750.12"
                  status="draft" // Try 'overdue', 'pending', or 'draft'
                />
              ))}
            </div>
          </main>
        </div>
        <div className="w-full lg:w-[40%] rounded-[2.5rem] p-6 lg:p-8 bg-white">
          <header className="flex gap-4 justify-between items-center mb-6">
            <p className="text-coal font-medium text-xl">Recent Activities</p>
            <Button variant="tertiary">VIEW ALL</Button>
          </header>
          <main className="space-y-6">
            {[1, 2, 354, 8484].map((item) => (
              <ActivityItem />
            ))}
          </main>
        </div>
      </section>
    </Layout>
  );
};

export default Invoice;
