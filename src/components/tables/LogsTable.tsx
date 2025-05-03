// src/components/LogsTable.tsx
"use client";

export interface Log {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

interface LogsTableProps {
  logs: Log[];
}

export function LogsTable({ logs }: LogsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">
              Time
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">
              User
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">
              Action
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-800">{log.timestamp}</td>
              <td className="px-6 py-4 text-gray-800">{log.user}</td>
              <td className="px-6 py-4 text-gray-800">{log.action}</td>
              <td className="px-6 py-4 text-gray-700">{log.details}</td>
            </tr>
          ))}
          {logs.length === 0 && (
            <tr>
              <td colSpan={4} className="p-6 text-center text-gray-500">
                No logs match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
