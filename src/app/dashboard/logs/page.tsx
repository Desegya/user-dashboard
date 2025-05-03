// src/app/dashboard/logs/page.tsx
"use client";

import { useState, useMemo } from "react";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { LogsTable, Log } from "@/components/tables/LogsTable";

const mockLogs: Log[] = [
  {
    id: 1,
    timestamp: "2025-05-02 14:23",
    user: "Sarah Daniels",
    action: "Created User",
    details: "Created user “James Carter”",
  },
  {
    id: 2,
    timestamp: "2025-05-02 13:10",
    user: "James Carter",
    action: "Updated Role",
    details: "Changed Linda’s role to “Manager”",
  },
  {
    id: 3,
    timestamp: "2025-05-01 18:45",
    user: "Admin",
    action: "Deleted User",
    details: "Deleted user “Mark Lee”",
  },
  {
    id: 4,
    timestamp: "2025-05-01 09:12",
    user: "Linda Maxwell",
    action: "Logged In",
    details: "Successful login from IP 192.168.1.5",
  },
  {
    id: 5,
    timestamp: "2025-04-30 22:30",
    user: "Sarah Daniels",
    action: "Reset Password",
    details: "Password reset for user “Admin”",
  },
];

export default function LogsPage() {
  const [search, setSearch] = useState("");

  // filter logs by search term (case-insensitive, checks all text fields)
  const filteredLogs = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return mockLogs;

    return mockLogs.filter(
      ({ timestamp, user, action, details }) =>
        timestamp.toLowerCase().includes(term) ||
        user.toLowerCase().includes(term) ||
        action.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          {/* <DocumentIcon className="h-6 w-6 text-blue-600" /> */}
          <h1 className="text-2xl font-medium">Activity Logs</h1>
        </div>
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-64"
        />
      </div>

      {/* Logs table with filtered data */}
      <LogsTable logs={filteredLogs} />
    </div>
  );
}
