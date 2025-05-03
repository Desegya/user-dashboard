"use client";

import { FC, useState } from "react";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/outline";

export interface NewUser {
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
}

interface AddUserFormProps {
  onSave: (user: NewUser) => void;
  onCancel: () => void;
}

export const AddUserForm: FC<AddUserFormProps> = ({ onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [status, setStatus] = useState<NewUser["status"]>("Active");

  return (
    <div>
      <div className="flex items-center mb-4">
        <UserIcon className="h-6 w-6 text-green-600" />
        <h2 className="ml-2 text-xl font-semibold">Add New User</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ name, email, role, status });
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>User</option>
            <option>Moderator</option>
            <option>Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as NewUser["status"])}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
