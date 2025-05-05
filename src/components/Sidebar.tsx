// src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UserIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  DocumentIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navItems = [
  { label: "Dashboard", path: "/dashboard", Icon: UserIcon },
  {
    label: "Roles & Permissions",
    path: "/dashboard/roles",
    Icon: ShieldCheckIcon,
  },
  { label: "Activity Logs", path: "/dashboard/logs", Icon: DocumentIcon },
  // { label: "Settings", path: "/dashboard/settings", Icon: Cog6ToothIcon },
];

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const path = usePathname();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-black/30 z-40
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          md:hidden
        `}
        onClick={toggleSidebar}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg p-4
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:shadow-none
        `}
      >
        {/* Close button on mobile */}
        <button
          className="md:hidden mb-6 self-end text-gray-600"
          onClick={toggleSidebar}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h1 className="text-2xl font-bold text-blue-900 mb-4 md:mb-10 border-b border-[#F3F3F3] pb-4">
          UserWise
        </h1>

        <nav className="space-y-4">
          {navItems.map(({ label, path: href, Icon }) => {
            const active = path === href;
            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition
                  ${active ? "bg-[#BFCCD9]" : ""}
                `}
                onClick={() => {
                  if (isOpen) toggleSidebar();
                }}
              >
                <Icon className="h-6 w-6" />
                <span className="text-[16px] text-black">{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
