// src/components/forms/AddRoleForm.tsx
"use client";

import { FC, useState } from "react";
import { Permission, ALL_PERMISSIONS } from "@/utils/permissions";
import { RolePayload } from "@/lib/api/roles";

interface Props {
  onSave: (role: RolePayload) => void;
  onCancel: () => void;
}

export const AddRoleForm: FC<Props> = ({ onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState<Record<Permission, boolean>>(
    () =>
      ALL_PERMISSIONS.reduce((acc, p) => ({ ...acc, [p]: false }), {} as any)
  );

  const toggle = (perm: Permission) => {
    setPermissions((prev) => ({ ...prev, [perm]: !prev[perm] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, description, permissions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name & Description */}
      <div>
        <label>Name</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label>Description</label>
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Permissions */}
      <fieldset className="space-y-2">
        <legend className="font-medium">Permissions</legend>
        <div className="grid grid-cols-2 gap-2">
          {ALL_PERMISSIONS.map((perm) => (
            <label key={perm} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={permissions[perm]}
                onChange={() => toggle(perm)}
              />
              <span className="text-sm">{perm}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save Role
        </button>
      </div>
    </form>
  );
};
