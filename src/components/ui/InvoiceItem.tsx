import clsx from "clsx";
import { formatCurrency } from "../../utils/constant";

type InvoiceStatus = "draft" | "overdue" | "paid" | "pending" | "unpaid";

 export interface InvoiceItemProps {
  id: string;
  dueDate: string;
  amount: string;
  status: InvoiceStatus;
  className?: string;
  onClick: () => void;
}

const statusClasses: Record<InvoiceStatus, string> = {
  paid: "text-[#129043] bg-[#E6FFF0] border border-[#129043]/20",
  pending: "text-[#F5A623] bg-[#FFF8E6] border border-[#F5A623]/20",
  overdue: "text-[#D0021B] bg-[#FFEDED] border border-[#D0021B]/20",
  draft: "text-[#666F77] bg-[#F2F3F5] border border-[#666F77]/20",
  unpaid: "text-[#B54708] bg-[#FFF4E5] border border-[#B54708]/20",
};
export function InvoiceItem({
  id,
  dueDate,
  amount,
  status,
  className,
  onClick,
}: InvoiceItemProps) {
  const statusClassName = statusClasses[status];
  const formattedStatus = status.toUpperCase();
  const formattedAmount = formatCurrency(Number(amount));

  return (
    <div
      onClick={onClick}
      className={clsx(
        "p-4 sm:p-6 cursor-pointer   w-full hover:bg-primary/5 transition",

        "flex items-center justify-between",

        "md:grid md:grid-cols-3 md:items-start md:justify-items-start",
        className
      )}
    >
      <div className="flex flex-col gap-1 md:col-span-1">
        <p className="text-coal text-sm font-medium">{`${id}`}</p>

        <p className="font-medium text-coal text-sm md:hidden">
          {formattedAmount}
        </p>
      </div>

      <div className="hidden md:flex flex-col gap-2 items-start md:col-span-1">
        <p className="text-[#666F77] font-normal text-[10px] capitalize">
          DUE DATE
        </p>
        <p className="text-primary text-sm font-normal">{dueDate}</p>
      </div>

      <div className="flex flex-col gap-2 items-end md:col-span-1   md:justify-self-end">
        <p className="font-medium text-coal md:text-sm hidden md:block">
          {formattedAmount}
        </p>

        <span
          className={clsx(
            "px-3 py-2 rounded-full font-medium capitalize text-[.625rem]",
            statusClassName
          )}
        >
          {formattedStatus}
        </span>
      </div>
    </div>
  );
}
