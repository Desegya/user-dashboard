"use client";

import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
// import { Modal } from './Modal';
import { EditUserForm } from "../forms/EditUserForm";
import { DeleteConfirm } from "../DeleteConfirm";
import { Modal } from "../Modal";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  avatar: string;
}

// mock a larger list for pagination demo
const allUsers: User[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Moderator" : "User",
  status: i % 4 === 0 ? "Inactive" : "Active",
  avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
}));

const PAGE_SIZE = 5;

export function UsersTable() {
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<User | null>(null);
  const [deleting, setDeleting] = useState<User | null>(null);

  const totalPages = Math.ceil(allUsers.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const users = allUsers.slice(start, start + PAGE_SIZE);

  const handleSave = (updated: User) => {
    console.log("Saving user", updated);
    setEditing(null);
  };

  const handleDelete = () => {
    if (deleting) {
      console.log("Deleting user", deleting);
      setDeleting(null);
    }
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                User
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Role
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{user.name}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 justify-end items-center space-x-2">
                  <button
                    onClick={() => setEditing(user)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setDeleting(user)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <div className="space-x-1">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const p = idx + 1;
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded ${
                  p === page ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <EditUserForm
            user={editing}
            onSave={handleSave}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}

      {/* Delete Modal */}
      {deleting && (
        <Modal onClose={() => setDeleting(null)}>
          <DeleteConfirm
            name={deleting.name}
            onCancel={() => setDeleting(null)}
            onConfirm={handleDelete}
          />
        </Modal>
      )}
    </div>
  );
}
