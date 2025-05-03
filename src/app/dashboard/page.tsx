// src/app/dashboard/page.tsx
"use client";

import { QuickActions } from "@/components/QuickActions";
import { StatCard } from "@/components/StatCard";
import { UsersTable } from "@/components/tables/UserTable";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
// import { UsersTable } from '@/components/UsersTable';

import {
  UsersIcon,
  UserCircleIcon,
  UserIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { ActivityFeed } from "@/components/ActivityFeed";
import { useState } from "react";
import { Modal } from "@/components/Modal";
import { AddUserForm, NewUser } from "@/components/forms/AddUserForm";

const stats = [
  { label: "Total Users", value: 1284, icon: UsersIcon },
  { label: "Active Users", value: 1042, icon: UserCircleIcon },
  { label: "New Sign‑ups (7d)", value: 56, icon: UserIcon },
  { label: "Pending Invites", value: 8, icon: ClockIcon },
];

export default function DashboardPage() {
  const [showAdd, setShowAdd] = useState(false);

  const handleSaveNew = (user: NewUser) => {
    console.log("New user data:", user);
    setShowAdd(false);
  };
  return (
    <div className="space-y-8">
      <QuickActions />

      {/* 2. Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
      {/* Top bar: title + Add User button */}
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-medium ">Users Management</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Users table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UsersTable />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <AddUserForm
            onSave={handleSaveNew}
            onCancel={() => setShowAdd(false)}
          />
        </Modal>
      )}
    </div>
  );
}
