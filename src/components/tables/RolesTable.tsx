"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Modal } from "../Modal";
import { EditRoleForm } from "../forms/EditRoleForm";
import { DeleteRoleConfirm } from "../DeleteRoleConfirm";
import { Role } from "@/lib/api/roles";

// export interface Role {
//   id: number;
//   name: string;
//   description: string;
//   permissionsCount: number;
// }

interface RolesTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

export function RolesTable({ roles, onEdit, onDelete }: RolesTableProps) {
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
          {roles.map((role) => (
            <tr key={role._id} className="hover:bg-gray-50">
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
                  onClick={() => onEdit(role)}
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(role)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
