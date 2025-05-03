"use client";

import { FC } from "react";

interface DeleteConfirmProps {
  name: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteConfirm: FC<DeleteConfirmProps> = ({
  name,
  onCancel,
  onConfirm,
}) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Delete User</h2>
    <p className="mb-4">
      Are you sure you want to delete <strong>{name}</strong>? This action
      cannot be undone.
    </p>
    <div className="flex justify-end space-x-2">
      <button onClick={onCancel} className="px-4 py-2 rounded-lg border">
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  </div>
);
