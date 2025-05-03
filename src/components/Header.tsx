"use client";

import { ArrowLeftStartOnRectangleIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface HeaderProps {
  onHamburgerClick: () => void;
}

export function Header({ onHamburgerClick }: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <header className="w-full bg-white border border-[#F3F3F3] border-l-0 p-4 flex justify-between items-center">
      <button
        className="md:hidden text-gray-700 mr-4"
        onClick={onHamburgerClick}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      <h1 className="text-2xl font-semibold text-blue-900">Your DashBoard</h1>
      <button
        onClick={handleLogout}
        className="text-sm bg-transparent text-red-500 px-3 py-1 rounded-lg font-medium hover:bg-gray-200 transition flex items-center gap-2 "
      >
        <ArrowLeftStartOnRectangleIcon className="w-5 h-5" />
        <p className="text-lg hidden md:block">Sign Out</p>
      </button>
    </header>
  );
}
