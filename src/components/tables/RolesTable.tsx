"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Modal } from "../Modal";
import { EditRoleForm } from "../forms/EditRoleForm";
import { DeleteRoleConfirm } from "../DeleteRoleConfirm";

export interface Role {
  id: number;
  name: string;
  description: string;
  permissionsCount: number;
}

const mockRoles: Role[] = [
  {
    id: 1,
    name: "Admin",
    description: "Full access to everything",
    permissionsCount: 10,
  },
  {
    id: 2,
    name: "Manager",
    description: "Can view & edit users, but not delete",
    permissionsCount: 6,
  },
  {
    id: 3,
    name: "Viewer",
    description: "Read‑only access to user data",
    permissionsCount: 2,
  },
];

export function RolesTable() {
  const [roles] = useState<Role[]>(mockRoles);
  const [editing, setEditing] = useState<Role | null>(null);
  const [deleting, setDeleting] = useState<Role | null>(null);

  const handleSave = (updated: Role) => {
    console.log("Saving role", updated);
    setEditing(null);
  };

  const handleDelete = () => {
    if (deleting) {
      console.log("Deleting role", deleting);
      setDeleting(null);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Role
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Description
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
              # Permissions
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {mockRoles.map((role) => (
            <tr key={role.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-800">
                {role.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {role.description}
              </td>
              <td className="px-6 py-4 text-center text-sm text-gray-600">
                {role.permissionsCount}
              </td>
              <td className="px-6 py-4 flex justify-end items-center space-x-3">
                <button
                  onClick={() => setEditing(role)}
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setDeleting(role)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Edit Modal */}
      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <EditRoleForm
            role={editing}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}

      {/* Delete Modal */}
      {deleting && (
        <Modal onClose={() => setDeleting(null)}>
          <DeleteRoleConfirm
            name={deleting.name}
            onCancel={() => setDeleting(null)}
            onConfirm={handleDelete}
          />
        </Modal>
      )}
    </div>
  );
}
