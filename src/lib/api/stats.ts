import { apiFetch } from ".";

// lib/api/stats.ts
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newSignups: number;
  pendingInvites: number;
}

export const getStats = () => apiFetch<DashboardStats>("/stats");
