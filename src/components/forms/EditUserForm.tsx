"use client";

import { FC, useState } from "react";
import { User } from "./UserTable"; // ensure User interface is exported

interface EditUserFormProps {
  user: User;
  onSave: (updated: User) => void;
  onCancel: () => void;
}

export const EditUserForm: FC<EditUserFormProps> = ({
  user,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState<User["status"]>(user.status);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ ...user, name, email, role, status });
        }}
        className="space-y-4"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Admin</option>
            <option>Moderator</option>
            <option>User</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as User["status"])}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Actions */}
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
