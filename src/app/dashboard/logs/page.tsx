// src/app/dashboard/logs/page.tsx
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { LogsTable } from "@/components/tables/LogsTable";
import { getLogs, Log } from "@/lib/api/logs";

export default function LogsPage() {
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState<Log[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const loadLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { logs, meta } = await getLogs(page, limit);
      setLogs(logs);
      setTotal(meta.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load roles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  // filter logs by search term (case-insensitive, checks all text fields)
  const filteredLogs = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return logs;

    return logs.filter(
      ({ timestamp, user, action, details }) =>
        timestamp.toLowerCase().includes(term) ||
        user.name.toLowerCase().includes(term) ||
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
