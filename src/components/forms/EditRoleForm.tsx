"use client";

import { FC, useState } from "react";
import { Role } from "../tables/RolesTable";
import { allPermissions } from "./AddRoleForm";

interface EditRoleFormProps {
  role: Role & { permissions?: string[] };
  onSave: (updated: Role & { permissions?: string[] }) => void;
  onCancel: () => void;
}

export const EditRoleForm: FC<EditRoleFormProps> = ({
  role,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description);
  const [permissions, setPermissions] = useState<string[]>(
    role.permissions || []
  );

  const togglePerm = (key: string) => {
    setPermissions((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Role</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ ...role, name, description, permissions });
        }}
        className="space-y-4"
      >
        {/* Role Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Role Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Permissions */}
        <div>
          <p className="block text-sm font-medium mb-2">Permissions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allPermissions.map(({ key, label }) => (
              <label key={key} className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={permissions.includes(key)}
                  onChange={() => togglePerm(key)}
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
