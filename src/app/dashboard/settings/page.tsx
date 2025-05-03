"use client";

import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SettingsPage() {
  // Mock state
  const [appName, setAppName] = useState("UserWise");
  const [allowSignUp, setAllowSignUp] = useState(true);
  const [defaultRole, setDefaultRole] = useState("viewer");
  const [adminName, setAdminName] = useState("Sarah Daniels");
  const [adminEmail, setAdminEmail] = useState("sarah@example.com");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        {/* <Cog6ToothIcon className="h-6 w-6 text-blue-600" /> */}
        <h1 className="text-2xl font-medium">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Settings */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Application Settings</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">App Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="signUpToggle"
                type="checkbox"
                checked={allowSignUp}
                onChange={(e) => setAllowSignUp(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label htmlFor="signUpToggle" className="text-sm">
                Allow user self‑sign‑up
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Default Role
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg p-2"
                value={defaultRole}
                onChange={(e) => setDefaultRole(e.target.value)}
              >
                <option value="viewer">Viewer</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="button"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save Application Settings
            </button>
          </form>
        </section>

        {/* Account Settings */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Admin Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Admin Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>
            <button
              type="button"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Update Account
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
