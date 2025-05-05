// src/components/forms/AddUserForm.tsx
"use client";

import { FC, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { NewUser } from "@/lib/api/users";

interface AddUserFormProps {
  onSave: (user: NewUser) => void;
  onCancel: () => void;
}

export const AddUserForm: FC<AddUserFormProps> = ({ onSave, onCancel }) => {
  const [form, setForm] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
    role: "viewer",
    status: "Active",
    // photo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <UserIcon className="h-6 w-6 text-green-600" />
        <h2 className="ml-2 text-xl font-semibold">Add New User</h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
        className="space-y-4"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            type="text"
            className="w-full border rounded-lg p-2"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border rounded-lg p-2"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            name="password"
            type="password"
            className="w-full border rounded-lg p-2"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="role"
            className="w-full border rounded-lg p-2"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            className="w-full border rounded-lg p-2"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Photo URL (optional) */}
        <div>
          <label className="block text-sm font-medium mb-1">Photo URL</label>
          <input
            name="photo"
            type="url"
            className="w-full border rounded-lg p-2"
            value={form.photo}
            onChange={handleChange}
            placeholder="https://..."
          />
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
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
