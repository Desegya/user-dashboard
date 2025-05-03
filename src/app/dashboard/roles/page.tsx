"use client";

import Link from "next/link";
import { ShieldCheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Role, RolesTable } from "@/components/tables/RolesTable";
import { useState } from "react";
import { Modal } from "@/components/Modal";
import { AddRoleForm } from "@/components/forms/AddRoleForm";

export default function RolesPage() {
  const [showAdd, setShowAdd] = useState(false);

  const handleSave = (newRole: Omit<Role, "id" | "permissionsCount">) => {
    console.log("New role data:", newRole);
    setShowAdd(false);
  };
  return (
    <div className="space-y-6">
      {/* Header: title + Add Role */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* <ShieldCheckIcon className="h-6 w-6 text-blue-600" /> */}
          <h1 className="text-2xl font-medium">Roles & Permissions</h1>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition "
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Role</span>
        </button>
      </div>

      {/* Roles table */}
      <RolesTable />

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <AddRoleForm onSave={handleSave} onCancel={() => setShowAdd(false)} />
        </Modal>
      )}
    </div>
  );
}
