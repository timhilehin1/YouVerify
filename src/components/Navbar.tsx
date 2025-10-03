import { HiMenu, HiChevronDown } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import type { UserProfile } from "../interfaces/Profile.model";
import { getInitials } from "../utils/constant";
import { useState } from "react";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

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
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

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

          <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <div className="p-3 bg-white rounded-full cursor-pointer">
              <button className="flex items-center gap-3 w-full">
                <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white font-semibold text-sm p-4">
                  {initials}
                </div>
                <HiChevronDown
                  className={`w-4 h-4 text-primary transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-coal">
                    {data?.contact_name || "User"}
                  </p>
                  <p className="text-xs text-primary">
                    {data?.email || "user@example.com"}
                  </p>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors">
                    <FiUser className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary">My Profile</span>
                  </button>

                  <button className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors">
                    <FiSettings className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary">Settings</span>
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 pt-2">
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-red-50 transition-colors group"
                  >
                    <FiLogOut className="w-4 h-4 text-primary group-hover:text-red-600" />
                    <span className="text-sm text-primary group-hover:text-red-600 ">
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
