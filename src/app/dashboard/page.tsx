// src/app/dashboard/page.tsx
"use client";

import { QuickActions } from "@/components/QuickActions";
import { StatCard } from "@/components/StatCard";
import { UsersTable } from "@/components/tables/UserTable";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  UsersIcon,
  UserCircleIcon,
  UserIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { Modal } from "@/components/Modal";
import { AddUserForm } from "@/components/forms/AddUserForm";
import { createUser, getUsers, NewUser, User } from "@/lib/api/users";
import { DashboardStats, getStats } from "@/lib/api/stats";

// const stats = [
//   { label: "Total Users", value: 1284, icon: UsersIcon },
//   { label: "Active Users", value: 1042, icon: UserCircleIcon },
//   { label: "New Sign‑ups (7d)", value: 56, icon: UserIcon },
//   { label: "Pending Invites", value: 8, icon: ClockIcon },
// ];

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data, meta } = await getUsers(page, limit);
      setUsers(data);
      setTotal(meta.total);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    load();
    getStats()
      .then(setStats)
      .catch((err) => console.error("Error loading stats:", err));
  }, [load]);
  const [showAdd, setShowAdd] = useState(false);

  const handleSaveNew = async (newUser: NewUser) => {
    try {
      await createUser(newUser);
      setShowAdd(false);
      await load();
    } catch (err: any) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="space-y-8">
      <QuickActions />

      {/* 2. Stat Cards */}

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Users"
            value={stats.totalUsers}
            icon={UsersIcon}
          />
          <StatCard
            label="Active Users"
            value={stats.activeUsers}
            icon={UserCircleIcon}
          />
          <StatCard
            label="New Sign‑ups (7d)"
            value={stats.newSignups}
            icon={UserIcon}
          />
          <StatCard
            label="Pending Invites"
            value={stats.pendingInvites}
            icon={ClockIcon}
          />
        </div>
      )}

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
      <div className="">
        <div className="">
          {loading && <p>Loading users…</p>}
          {error && <p className="text-red-500">{error}</p>}

          <UsersTable users={users} />
        </div>
        {/* <div className="lg:col-span-1">
          <ActivityFeed />
        </div> */}
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
