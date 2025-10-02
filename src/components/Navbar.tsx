import { HiMenu, HiChevronDown } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import type { UserProfile } from "../interfaces/Profile.model";
import { getInitials } from "../utils/constant";

interface NavbarProps {
  onMenuClick: () => void;
  title?: string;
  data: UserProfile | null;
}

export default function Navbar({
  onMenuClick,
  title = "INVOICE",
  data,
}: NavbarProps) {
  const initials = getInitials(data?.contact_name ?? "--");

  return (
    <header className="sticky top-0 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 z-[1000]">
        <button onClick={onMenuClick} className="lg:hidden text-secondary">
          <HiMenu className="w-6 h-6" />
        </button>

        <div className="flex-1 max-w-2xl mx-4">
          <p className="text-secondary text-[1.75rem]">{title}</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-3 text-primary bg-white rounded-full">
            <IoNotificationsOutline className="w-6 h-6" />
          </button>
          <div className="p-3 bg-white rounded-full cursor-pointer">
            <button className="flex items-center gap-3 w-full">
              <div className="w-7 h-7 rounded-full bg-[#003EFF] flex items-center justify-center text-white font-semibold text-sm p-4">
                {initials}
              </div>
              <HiChevronDown className="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
