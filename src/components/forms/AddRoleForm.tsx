'use client';

import { FC, useState } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';

export const allPermissions = [
  { key: 'view_users',        label: 'View Users' },
  { key: 'add_users',         label: 'Add Users' },
  { key: 'edit_users',        label: 'Edit Users' },
  { key: 'delete_users',      label: 'Delete Users' },
  { key: 'manage_roles',      label: 'Manage Roles' },
  { key: 'view_logs',         label: 'View Logs' },
  { key: 'manage_settings',   label: 'Manage Settings' },
];

export interface NewRoleData {
  name: string;
  description: string;
  permissions: string[];
}

interface AddRoleFormProps {
  onSave: (newRole: NewRoleData) => void;
  onCancel: () => void;
}

export const AddRoleForm: FC<AddRoleFormProps> = ({ onSave, onCancel }) => {
  const [name, setName]             = useState('');
  const [description, setDescription] = useState('');
  const [permissions, setPermissions] = useState<string[]>([]);

  const togglePerm = (key: string) => {
    setPermissions((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <UserPlusIcon className="h-6 w-6 text-green-600" />
        <h2 className="ml-2 text-xl font-semibold">Add New Role</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ name, description, permissions });
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
            placeholder="e.g. Editor"
            required
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
            placeholder="Describe this role"
            required
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
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Save Role
          </button>
        </div>
      </form>
    </div>
  );
};
