// src/app/dashboard/roles/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { ShieldCheckIcon, PlusIcon } from "@heroicons/react/24/outline";

import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  Role,
  RolePayload,
} from "@/lib/api/roles";
import { RolesTable } from "@/components/tables/RolesTable";
import { Modal } from "@/components/Modal";
import { AddRoleForm } from "@/components/forms/AddRoleForm";
import { EditRoleForm } from "@/components/forms/EditRoleForm";
import { DeleteRoleConfirm } from "@/components/DeleteRoleConfirm";

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Role | null>(null);
  const [deleting, setDeleting] = useState<Role | null>(null);

  const loadRoles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (err: any) {
      setError(err.message || "Failed to load roles");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  // Create
  const handleAdd = async (newRole: RolePayload) => {
    try {
      await createRole(newRole);
      setShowAdd(false);
      loadRoles();
    } catch (err: any) {
      console.error("Add role failed:", err);
    }
  };

  // Update
  const handleEdit = async (updated: Role) => {
    try {
      await updateRole(updated._id, {
        name: updated.name,
        description: updated.description,
        permissions: updated.permissions,
      });
      setEditing(null);
      loadRoles();
    } catch (err: any) {
      console.error("Update role failed:", err);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!deleting) return;
    try {
      await deleteRole(deleting._id);
      setDeleting(null);
      loadRoles();
    } catch (err: any) {
      console.error("Delete role failed:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-medium">Roles & Permissions</h1>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Role</span>
        </button>
      </div>

      {/* Table or Loading/Error */}
      {loading && <p>Loading roles…</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <RolesTable
          roles={roles}
          onEdit={(r) => setEditing(r)}
          onDelete={(r) => setDeleting(r)}
        />
      )}

      {/* Add Modal */}
      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <AddRoleForm onSave={handleAdd} onCancel={() => setShowAdd(false)} />
        </Modal>
      )}

      {/* Edit Modal */}
      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <EditRoleForm
            role={editing}
            onSave={handleEdit}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}

      {/* Delete Confirm */}
      {deleting && (
        <Modal onClose={() => setDeleting(null)}>
          <DeleteRoleConfirm
            name={deleting.name}
            onConfirm={handleDelete}
            onCancel={() => setDeleting(null)}
          />
        </Modal>
      )}
    </div>
  );
}
