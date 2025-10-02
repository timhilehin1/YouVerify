import { useState } from "react";
import Layout from "../components/Layout";
import { ActivityItem } from "../components/ui/ActivityItem";
import { Button } from "../components/ui/Button";
import { ActionCard, OverviewCard } from "../components/ui/Card";
import MoneyIcon from "../components/ui/icons/MoneyIcon";
import ProfileIcon from "../components/ui/icons/ProfileIcon";
import SettingsIcon from "../components/ui/icons/SetttingsIcon";
import { InvoiceItem } from "../components/ui/InvoiceItem";
import { Modal } from "../components/ui/Modal";
import CheckIcon from "../components/ui/icons/checkIcon";
import logo from "../assets/Logo.png";
import { Tabs } from "../components/ui/Tab";

const Invoice = () => {
  const [fullscreenModal, setFullscreenModal] = useState(false);
  const handleInvoiceAction = () => {};
  const handleInvoiceDetails = () => {
    setFullscreenModal(true);
  };
  const invoiceItems = [
    {
      id: 1,
      description: "Email Marketing",
      quantity: 10,
      rate: 1500,
      amount: 15000.0,
    },
    {
      id: 2,
      description: "Video Production",
      quantity: 5,
      rate: 2000,
      amount: 10000.0,
    },
    {
      id: 3,
      description: "Social Media Management",
      quantity: 8,
      rate: 800,
      amount: 6400.0,
    },
    {
      id: 4,
      description: "Website Design",
      quantity: 1,
      rate: 5000,
      amount: 5000.0,
    },
  ];
  const [items, _] = useState(invoiceItems);

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const discountRate = 0.025; // 2.5%
  const discount = subtotal * discountRate;
  const totalAmountDue = subtotal - discount;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

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
                  onClick={handleInvoiceDetails}
                  key={item}
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
            {[1, 2, 354, 8484, 7, 8].map((item) => (
              <ActivityItem
                key={item}
                description="Created Invoice"
                actorName="Olaniyi Ojo Adewale"
                actionTitle="Invoice creation"
                timestamp="Yesterday, 12:05 PM"
                invoiceId="00239434"
                adminName="Olaniyi Ojo Adewale"
              />
            ))}
          </main>
        </div>

        {/* Fullscreen Modal */}
        <Modal
          isOpen={fullscreenModal}
          onClose={() => setFullscreenModal(false)}
          position="fullscreen"
        >
          <div className="h-full flex flex-col">
            <header className="flex flex-col mb-6 space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2 lg:space-y-1">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-coal break-words">
                  Invoice - 1023494 - 2304
                </h2>
                <p className="text-primary text-sm lg:text-base">
                  View the details and activity of this invoice
                </p>
                <div className="pt-1">
                  <span className="text-[#F5A623] bg-[#FFF8E6] border border-[#F5A623]/20 px-3 py-1.5 rounded-full font-medium capitalize text-[.625rem] inline-flex">
                    pending
                  </span>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3 flex-col sm:flex-row lg:flex-row w-full sm:w-auto">
                <Button
                  className="w-full sm:w-auto whitespace-nowrap"
                  variant="tertiary"
                >
                  DOWNLOAD AS PDF
                </Button>
                <Button className="w-full sm:w-auto">SEND INVOICE</Button>
                <Button variant="secondary" className="w-full sm:w-auto">
                  MORE
                </Button>
              </div>
            </header>

            <section className="reminders w-full p-5 rounded-[2rem] border border-[#E3E6EF] flex items-center gap-3 mb-6 flex-wrap">
              <p className="text-xs text-primary">REMINDERS</p>
              {[1, 2, 3, 4, 5].map((item) => (
                <span
                  key={item}
                  className="text-coal bg-[#E6FFF0] border border-[#129043]/20 px-3 py-2 rounded-full font-medium capitalize text-[.625rem] flex items-center gap-3"
                >
                  14 days before due date
                  <CheckIcon className="w-2 h-2 text-[#2DB260]" />
                </span>
              ))}
            </section>

            {/* Desktop: Side by side layout */}
            <div className="hidden lg:flex gap-6 flex-col lg:flex-row">
              <section className="w-full lg:w-[60%] shadow-sm rounded-[2.5rem] p-6 lg:p-8 bg-white border border-[#E3E6EF]">
                <div className="p-6 lg:p-8 rounded-[2.5rem] bg-[#FCDDEC] mb-6">
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-6">
                    <div className="space-y-1">
                      <p className="text-primary text-xs">SENDER</p>
                      <div className="flex gap-4 flex-row-reverse lg:flex-row mt-3">
                        <img
                          className="self-start w-15 h-15 object-cover flex-shrink-0"
                          src={logo}
                          alt="logo"
                        />
                        <div className="space-y-1">
                          <p className="text-coal font-normal mt-1">
                            Fabulous Enterprise
                          </p>
                          <p className="text-primary text-xs">0000000000</p>
                          <p className="text-primary text-xs">
                            1331 Hart Ridge Road 48436 Gaines, MI
                          </p>
                          <p className="text-primary text-xs">
                            info@fabulousenterise.co
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-primary text-xs">CUSTOMER</p>
                      <div className="space-y-1">
                        <p className="text-coal font-normal mt-1">
                          Olaniyi Ojo Adewale
                        </p>
                        <p className="text-primary text-xs">0000000000</p>
                        <p className="text-primary text-xs">
                          info@fabulousenterise.co
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-primary text-xs capitalize mb-2">
                      INVOICE DETAILS
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      <div>
                        <p className="text-[#666f77] text-[10px]">INVOICE NO</p>
                        <p className="text-coal text-xs">10000000</p>
                      </div>
                      <div>
                        <p className="text-[#666f77] text-[10px]">ISSUE DATE</p>
                        <p className="text-coal text-xs">March 30th, 2023</p>
                      </div>
                      <div>
                        <p className="text-[#666f77] text-[10px]">DUE DATE</p>
                        <p className="text-coal text-xs">4th April, 2023</p>
                      </div>
                      <div>
                        <p className="text-[#666f77] text-[10px]">
                          BILLING CURRENCY
                        </p>
                        <p className="text-coal text-xs">USD ($)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-6">
                    <p className="text-coal text-xl">Items</p>
                    <span className="flex-1 h-px bg-[#E3E6EF]"></span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                      <tbody className="divide-y divide-[#E3E6EF]">
                        {items.map((item) => (
                          <tr
                            key={item.id}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-coal font-medium text-sm sm:text-base">
                              {item.description}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-coal text-sm sm:text-base">
                              {item.quantity}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-right text-coal text-sm sm:text-base">
                              {formatCurrency(item.rate)}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-semibold text-coal text-sm sm:text-base">
                              {formatCurrency(item.amount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="border-t-4 border-white">
                        <tr>
                          <td
                            colSpan={3}
                            className="px-3 sm:px-6 py-3 sm:py-4 text-right font-medium text-[#B7BDCF] text-sm sm:text-base"
                          >
                            Subtotal:
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-semibold text-coal text-sm sm:text-base">
                            {formatCurrency(subtotal)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            className="px-3 sm:px-6 py-3 sm:py-4 text-right font-medium text-[#B7BDCF] text-sm sm:text-base"
                          >
                            Discount (2.5%):
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-semibold text-coal text-sm sm:text-base">
                            -{formatCurrency(discount)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={3}
                            className="px-3 sm:px-6 py-4 sm:py-5 text-right font-bold text-coal text-lg sm:text-lg"
                          >
                            TOTAL AMOUNT DUE:
                          </td>
                          <td className="px-3 sm:px-6 py-4 sm:py-5 text-right font-bold text-coal text-2xl sm:text-xl">
                            {formatCurrency(totalAmountDue)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <div className="w-full p-5 rounded-[2rem] border border-[#E3E6EF] mb-6">
                  <p className="text-primary text-xs mb-4">
                    PAYMENT INFORMATION
                  </p>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-[#666f77] text-[10px]">ACCOUNT NAME</p>
                      <p className="text-coal text-xs font-[600]">ITESIWAJU</p>
                    </div>
                    <div>
                      <p className="text-[#666f77] text-[10px]">
                        ACCOUNT NUMBER
                      </p>
                      <p className="text-coal text-xs font-[600]">
                        1111111111111111
                      </p>
                    </div>
                    <div>
                      <p className="text-[#666f77] text-[10px]">
                        ACH ROUTING NUMBER
                      </p>
                      <p className="text-coal text-xs font-[600]">
                        20893438484
                      </p>
                    </div>
                    <div>
                      <p className="text-[#666f77] text-[10px]">BANK NAME</p>
                      <p className="text-coal text-xs font-[600]">GTB</p>
                    </div>
                    <div>
                      <p className="text-[#666f77] text-[10px]">BANK ADDRESS</p>
                      <p className="text-coal text-xs font-[600]">YABA</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-[1rem] bg-[#F6F8FA] mt-2 w-full min-h-[60px]">
                  <span className="text-primary">NOTE</span>
                  <p className="text-[#666f77]">Thank you for your patronage</p>
                </div>
              </section>

              <div className="w-full lg:w-[40%] rounded-[2.5rem] p-5 lg:p-8 bg-white border border-[#E3E6EF]">
                <p className="text-coal font-medium text-xl mb-6">
                  Invoice Activities
                </p>
                <div className="space-y-6">
                  {[1, 2, 354, 8484, 7, 8].map((item) => (
                    <ActivityItem
                      key={item}
                      actorName="Olaniyi Ojo Adewale"
                      description="You manually confirmed a partial payment of $503,000.00"
                      actionTitle="You"
                      timestamp="Yesterday, 12:05 PM"
                      invoiceId="00239434"
                      adminName="Olaniyi Ojo Adewale"
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Mobile: Tabs */}
            <div className="lg:hidden">
              <Tabs
                tabs={[
                  {
                    id: "details",
                    label: "Invoice Details",
                    content: (
                      <section className="shadow-sm rounded-[2.5rem] p-6 bg-white border border-[#E3E6EF]">
                        <div className="p-6 rounded-[2.5rem] bg-[#FCDDEC] mb-6">
                          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-6">
                            <div className="space-y-1">
                              <p className="text-primary text-xs">SENDER</p>
                              <div className="flex gap-4 flex-row-reverse lg:flex-row mt-3">
                                <img
                                  className="self-start w-15 h-15 object-cover flex-shrink-0"
                                  src={logo}
                                  alt="logo"
                                />
                                <div className="space-y-1">
                                  <p className="text-coal font-normal mt-1">
                                    Fabulous Enterprise
                                  </p>
                                  <p className="text-primary text-xs">
                                    0000000000
                                  </p>
                                  <p className="text-primary text-xs">
                                    1331 Hart Ridge Road 48436 Gaines, MI
                                  </p>
                                  <p className="text-primary text-xs">
                                    info@fabulousenterise.co
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <p className="text-primary text-xs">CUSTOMER</p>
                              <div className="space-y-1">
                                <p className="text-coal font-normal mt-1">
                                  Olaniyi Ojo Adewale
                                </p>
                                <p className="text-primary text-xs">
                                  0000000000
                                </p>
                                <p className="text-primary text-xs">
                                  info@fabulousenterise.co
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-primary text-xs capitalize mb-2">
                              INVOICE DETAILS
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-[#666f77] text-[10px]">
                                  INVOICE NO
                                </p>
                                <p className="text-coal text-xs">10000000</p>
                              </div>
                              <div>
                                <p className="text-[#666f77] text-[10px]">
                                  ISSUE DATE
                                </p>
                                <p className="text-coal text-xs">
                                  March 30th, 2023
                                </p>
                              </div>
                              <div>
                                <p className="text-[#666f77] text-[10px]">
                                  DUE DATE
                                </p>
                                <p className="text-coal text-xs">
                                  4th April, 2023
                                </p>
                              </div>
                              <div>
                                <p className="text-[#666f77] text-[10px]">
                                  BILLING CURRENCY
                                </p>
                                <p className="text-coal text-xs">USD ($)</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="flex items-center gap-4 mb-6">
                            <p className="text-coal text-xl">Items</p>
                            <span className="divider w-full flex-1 h-px bg-[#E3E6EF]"></span>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full min-w-[500px]">
                              <tbody className="divide-y divide-[#E3E6EF]">
                                {items.map((item) => (
                                  <tr
                                    key={item.id}
                                    className="hover:bg-gray-50 transition-colors"
                                  >
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-coal font-medium text-sm sm:text-base">
                                      {item.description}
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-center text-coal text-sm sm:text-base">
                                      {item.quantity}
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right text-coal text-sm sm:text-base">
                                      {formatCurrency(item.rate)}
                                    </td>
                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-semibold text-coal text-sm sm:text-base">
                                      {formatCurrency(item.amount)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot className="border-t-4 border-white">
                                <tr>
                                  <td
                                    colSpan={3}
                                    className="px-3 sm:px-6 py-3 sm:py-4 text-right font-medium text-[#B7BDCF] text-sm sm:text-base"
                                  >
                                    Subtotal:
                                  </td>
                                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-semibold text-coal text-sm sm:text-base">
                                    {formatCurrency(subtotal)}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    colSpan={3}
                                    className="px-3 sm:px-6 py-3 sm:py-4 text-right font-medium text-[#B7BDCF] text-sm sm:text-base"
                                  >
                                    Discount (2.5%):
                                  </td>
                                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-semibold text-coal text-sm sm:text-base">
                                    -{formatCurrency(discount)}
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    colSpan={3}
                                    className="px-3 sm:px-6 py-4 sm:py-5 text-right font-bold text-coal text-lg sm:text-lg"
                                  >
                                    TOTAL AMOUNT DUE:
                                  </td>
                                  <td className="px-3 sm:px-6 py-4 sm:py-5 text-right font-bold text-coal text-2xl sm:text-xl">
                                    {formatCurrency(totalAmountDue)}
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>

                        <div className="w-full p-5 rounded-[2rem] border border-[#E3E6EF] mb-6">
                          <p className="text-primary text-xs mb-4">
                            PAYMENT INFORMATION
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-[#666f77] text-[10px]">
                                ACCOUNT NAME
                              </p>
                              <p className="text-coal text-xs font-[600]">
                                ITESIWAJU
                              </p>
                            </div>
                            <div>
                              <p className="text-[#666f77] text-[10px]">
                                ACCOUNT NUMBER
                              </p>
                              <p className="text-coal text-xs font-[600]">
                                1111111111111111
                              </p>
                            </div>
                            <div>
                              <p className="text-[#666f77] text-[10px]">
                                ACH ROUTING NUMBER
                              </p>
                              <p className="text-coal text-xs font-[600]">
                                20893438484
                              </p>
                            </div>
                            <div>
                              <p className="text-[#666f77] text-[10px]">
                                BANK NAME
                              </p>
                              <p className="text-coal text-xs font-[600]">
                                GTB
                              </p>
                            </div>
                            <div>
                              <p className="text-[#666f77] text-[10px]">
                                BANK ADDRESS
                              </p>
                              <p className="text-coal text-xs font-[600]">
                                YABA
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-[1rem] bg-[#F6F8FA] mt-2 w-full min-h-[60px]">
                          <span className="text-primary">NOTE</span>
                          <p className="text-[#666f77]">
                            Thank you for your patronage
                          </p>
                        </div>
                      </section>
                    ),
                  },
                  {
                    id: "activity",
                    label: "Recent Activity",
                    content: (
                      <div className="rounded-[2.5rem] p-5 bg-white border border-[#E3E6EF]">
                        <p className="text-coal font-medium text-xl mb-6">
                          Invoice Activities
                        </p>
                        <div className="space-y-6">
                          {[1, 2, 354, 8484, 7, 8].map((item) => (
                            <ActivityItem
                              key={item}
                              actorName="Olaniyi Ojo Adewale"
                              description="You manually confirmed a partial payment of $503,000.00"
                              actionTitle="You"
                              timestamp="Yesterday, 12:05 PM"
                              invoiceId="00239434"
                              adminName="Olaniyi Ojo Adewale"
                            />
                          ))}
                        </div>
                      </div>
                    ),
                  },
                ]}
                defaultTab="details"
              />
            </div>
          </div>
        </Modal>
      </section>
    </Layout>
  );
};

export default Invoice;
