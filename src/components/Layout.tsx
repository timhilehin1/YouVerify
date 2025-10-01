import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX, HiOutlineUsers } from "react-icons/hi";
import { RiHome5Line, RiSettingsLine } from "react-icons/ri";
import { TbCategory2, TbHelpSquare } from "react-icons/tb";
import { MdOutlineReceiptLong } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="min-h-screen">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[17.5rem] bg-white border-none transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <span className="text-xl text-primary">MyApp</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto ">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`block rounded-[32px] p-2 transition-colors ${
                    isActive ? "bg-[#F8F8FB]" : "hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`flex items-center gap-4 px-4 py-4 text-sm font-normal rounded-[28px] bg-white  ${
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

          {/* User profile */}
          {/* <div className="p-4 border-t border-gray-200">
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                JD
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
              <HiChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div> */}
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-68">
        {/* Top navbar */}
        <header className="sticky top-0   border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 z-[1000]">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-secondary"
            >
              <HiMenu className="w-6 h-6" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-4">
              <p className="text-secondary text-[1.75rem]">INVOICE</p>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <IoNotificationsOutline className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Page content - Children render here */}
        <main className="p-4 sm:p-8 lg:p-10 -z-50">{children}</main>
      </div>
    </div>
  );
}
