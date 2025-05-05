// src/utils/permissions.ts

// 1. Enumerate all of your domain‑specific permissions:
export const ALL_PERMISSIONS = [
  "user:create",
  "user:read",
  "user:update",
  "user:delete",
  "role:create",
  "role:read",
  "role:update",
  "role:delete",
] as const;

// 2. Derive the Permission union from that array:
export type Permission = (typeof ALL_PERMISSIONS)[number];
