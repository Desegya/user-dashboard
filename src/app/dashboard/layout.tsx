"use client";

import { ReactNode, useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((open) => !open);

  return (
    <div className="h-screen flex flex-row">
      {/* Top header */}

      {/* Main: sidebar + content */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 bg-gray-50">
        <Header onHamburgerClick={toggleSidebar} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
