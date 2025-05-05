// src/lib/api/logs.ts
import { apiFetch } from "./index";

export interface Log {
  _id: string;
  action: string;
  details?: string;
  timestamp: string;
  user: { _id: string; name: string; email: string };
}

interface PaginatedLogs {
  logs: Log[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export const getLogs = (page = 1, limit = 10) =>
  apiFetch<PaginatedLogs>(`/logs?page=${page}&limit=${limit}`);
