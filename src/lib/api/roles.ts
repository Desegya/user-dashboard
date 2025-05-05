// src/lib/api/roles.ts
import { Permission } from "@/utils/permissions";
import { apiFetch } from "./index";

export interface Role {
  _id: string;
  name: string;
  description?: string;
  permissions: Record<
    | "user:create"
    | "user:read"
    | "user:update"
    | "user:delete"
    | "role:create"
    | "role:read"
    | "role:update"
    | "role:delete",
    boolean
  >;
  permissionsCount?: number;
}

export interface RolePayload {
  name: string;
  description?: string;
  permissions: Record<
  | "user:create"
  | "user:read"
  | "user:update"
  | "user:delete"
  | "role:create"
  | "role:read"
  | "role:update"
  | "role:delete",
  boolean
>;
}

export const getRoles = () => apiFetch<Role[]>("/roles");

export const getRole = (id: string) => apiFetch<Role>(`/roles/${id}`);

export const createRole = (role: RolePayload) =>
  apiFetch<Role>("/roles", {
    method: "POST",
    body: JSON.stringify(role),
  });

export const updateRole = (id: string, updates: RolePayload) =>
  apiFetch<Role>(`/roles/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

export const deleteRole = (id: string) =>
  apiFetch<{ message: string }>(`/roles/${id}`, { method: "DELETE" });
