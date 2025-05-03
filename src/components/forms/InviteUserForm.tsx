'use client';

import { FC, useState } from 'react';

export interface InviteData {
  email: string;
  role: string;
}

interface InviteUserFormProps {
  onInvite: (data: InviteData) => void;
  onCancel: () => void;
}

export const InviteUserForm: FC<InviteUserFormProps> = ({ onInvite, onCancel }) => {
  const [email, setEmail] = useState('');
  const [role, setRole]   = useState('User');

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Invite New User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onInvite({ email, role });
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            required
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>User</option>
            <option>Moderator</option>
            <option>Admin</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Send Invite
          </button>
        </div>
      </form>
    </div>
  );
};
