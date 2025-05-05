// src/lib/api/users.ts
// import { apiFetch } from './index';

import { apiFetch } from ".";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  photo?: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  photo?: string;
}

interface Paginated<T> {
  data: T[];
  meta: { total: number; page: number; limit: number };
}

export const getUsers = (page = 1, limit = 10) =>
  apiFetch<Paginated<User>>(`/users?page=${page}&limit=${limit}`);

export const getUser = (id: string) => apiFetch<User>(`/users/${id}`);

export const createUser = (user: NewUser) =>
  apiFetch<{ message: string; user: User }>("/users", {
    method: "POST",
    body: JSON.stringify(user),
  });

export const updateUser = (id: string, updates: Partial<Omit<User, "id">>) =>
  apiFetch<{ message: string; user: User }>(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

export const deleteUser = (id: string) =>
  apiFetch<{ message: string }>(`/users/${id}`, { method: "DELETE" });
