import avatar from "../../assets/avatar.png";
export function ActivityItem() {
  return (
    <div className="flex gap-6">
      <img
        className="rounded-full self-start grow-0"
        src={avatar}
        alt="avatar"
      />
      <div className="flex flex-col gap-[0.5]">
        <p className="text-[#000000] font-medium text-lg">Invoice creation</p>
        <p className="text-primary text-sm  font-normal">Yesterday, 12:05 PM</p>
        <div className="p-4 rounded-[16px] bg-[#F6F8FA] mt-3">
          <p className="text-primary">
            Created Invoice{" "}
            <span className="text-[#000000] font-medium">
              00239434/Olaniyi Ojo Adewale
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
