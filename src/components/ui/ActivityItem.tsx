
import clsx from "clsx";
import defaultAvatar from "../../assets/avatar.png";

interface ActivityItemProps {
  actorName: string;
  actorAvatarSrc?: string;
  actionTitle: string;
  timestamp: string;
  className?: string;
  invoiceId: string; // e.g., "00239434"
  adminName: string;
  description: string;
}

export function ActivityItem({
  actorName,
  actorAvatarSrc,
  actionTitle,
  timestamp,
  className,
  invoiceId,
  description,
  adminName,
}: ActivityItemProps) {
  const avatarSource = actorAvatarSrc || defaultAvatar;
  const activityDetail = (
    <p className="text-primary">
      {description}{" "}
      <span className="text-[#000000] font-medium">
        {`${invoiceId}/${adminName}`}
      </span>
    </p>
  );

  return (
    <div className={clsx("flex gap-4 sm:gap-6", className)}>
      <img
        className="rounded-full self-start w-10 h-10 object-cover flex-shrink-0"
        src={avatarSource}
        alt={`${actorName}'s avatar`}
      />

      <div className="flex flex-col gap-[0.125rem] w-full">
        {" "}
        <p className="text-[#000000] font-medium text-lg">{actionTitle}</p>
        <p className="text-primary text-sm font-normal">{timestamp}</p>
        <div className="p-4 rounded-[1rem] bg-[#F6F8FA] mt-2 w-full">
          {activityDetail}
        </div>
      </div>
    </div>
  );
}
