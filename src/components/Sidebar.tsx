import { Link } from "react-router-dom";
import { HiX, HiOutlineUsers } from "react-icons/hi";
import { RiHome5Line, RiSettingsLine } from "react-icons/ri";
import { TbCategory2, TbHelpSquare } from "react-icons/tb";
import { MdOutlineReceiptLong } from "react-icons/md";
import companyLogo from "../assets/company_logo.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigation = [
    { name: "Getting Started", icon: RiHome5Line, href: "/dashboard" },
    { name: "Overview", icon: TbCategory2, href: "/overview" },
    { name: "Accounts", icon: RiHome5Line, href: "/accounts" },
    { name: "Invoice", icon: MdOutlineReceiptLong, href: "/invoice" },
    {
      name: "Beneficiary Management",
      icon: HiOutlineUsers,
      href: "/beneficiary",
    },
    { name: "Help Center", icon: TbHelpSquare, href: "/help" },
    { name: "Settings", icon: RiSettingsLine, href: "/settings" },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[17.5rem] bg-white border-none transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <img src={companyLogo} alt="company logo" />
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`block rounded-[32px] p-2 transition-colors ${
                    isActive ? "bg-[#F8F8FB]" : "hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`flex items-center gap-4 px-4 py-4 text-sm font-normal rounded-[28px] bg-white ${
                      isActive ? "text-[#4F4F4F]" : "text-primary"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
