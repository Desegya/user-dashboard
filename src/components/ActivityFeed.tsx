"use client";

import { FC } from "react";

interface Activity {
  id: number;
  message: string;
  time: string;
}

const mockActivities: Activity[] = [
  { id: 1, message: "Sarah Daniels added a new user", time: "2h ago" },
  { id: 2, message: "James Carter updated settings", time: "5h ago" },
  { id: 3, message: "Linda Maxwell logged in", time: "1d ago" },
  { id: 4, message: "Daniel Stone deleted their account", time: "1d ago" },
  { id: 5, message: "Daniel Stone deleted their account", time: "1d ago" },
  { id: 6, message: "Daniel Stone deleted their account", time: "1d ago" },
];

export const ActivityFeed: FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <ul className="space-y-3">
        {mockActivities.map((act) => (
          <li key={act.id} className="text-sm text-gray-600">
            {act.message}{" "}
            <span className="text-xs text-gray-400">· {act.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
