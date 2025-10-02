import clsx from "clsx";
import CategoryIcon from "./icons/categoryIcon";

type Status = "paid" | "overdue" | "draft" | "unpaid";

type OverviewCardProps = {
  icon?: React.ReactNode;
  title: string;
  amount: number;
  status: Status;
  count: number;
  className?: string;
};

const statusStyles: Record<Status, string> = {
  paid: "bg-[#B6FDD3] text-secondary font-medium",
  overdue: "bg-[#FFBABA] text-secondary font-medium",
  draft: "bg-[#D9D9E0] text-secondary font-medium",
  unpaid: "bg-[#F8E39B] text-secondary font-medium",
};

export function OverviewCard({
  title,
  amount,
  status,
  count,
  className = "",
}: OverviewCardProps) {
  const [whole = "0", cents] = amount.toString().split(".");
  const formattedWhole = Number(whole).toLocaleString();

  return (
    <div
      className={clsx(
        "bg-white shadow-sm rounded-3xl py-6 px-8 w-full flex flex-col gap-4",
        className
      )}
    >
      <div className="flex justify-start">
        <CategoryIcon className="w-10 h-10" />
      </div>
      <div className="flex items-center gap-3">
        <h3 className="text-xs font-normal text-primary">{title}</h3>
        <span
          className={clsx(
            "px-3 py-2 rounded-full text-xs font-medium capitalize",
            statusStyles[status]
          )}
        >
          {count}
        </span>
      </div>

      <p className="text-[1.75rem] font-medium text-coal">
        ${formattedWhole}
        {cents && (
          <>
            .
            <span className="ml-0.5 text-sm text-primary align-baseline">
              {cents}
            </span>
          </>
        )}
      </p>
    </div>
  );
}

// ActionCard
type ActionCardProps = {
  icon?: React.ReactNode;
  title: string;
  description: string;
  onAction: () => void;
  className?: string;
  bgClass?: string;
  titleClass?: string;
  descriptionClass?: string;
};

export function ActionCard({
  icon,
  title,
  description,
  onAction,
  className = "",
  bgClass = "bg-white shadow-sm",
  titleClass = "text-secondary",
  descriptionClass = "text-primary",
}: ActionCardProps) {
  return (
    <div
      onClick={onAction}
      className={clsx(
        "rounded-3xl py-6 px-8 w-full flex flex-col gap-4 cursor-pointer",
        bgClass,
        className
      )}
    >
      <div className="flex justify-start">{icon}</div>
      <div>
        <h3 className={clsx("text-[1.375rem] font-medium", titleClass)}>
          {title}
        </h3>
        <p className={clsx("text-sm mt-1", descriptionClass)}>{description}</p>
      </div>
    </div>
  );
}
