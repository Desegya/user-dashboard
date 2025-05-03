"use client";

import { FC, useState } from "react";
import { UserIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { InviteData, InviteUserForm } from "./forms/InviteUserForm";
import { Modal } from "./Modal";

export const QuickActions: FC = () => {
  const [showInvite, setShowInvite] = useState(false);

    const handleInvite = (data: InviteData) => {
      console.log("Inviting user:", data);
      setShowInvite(false);
    };
  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
  
        <button onClick={() => setShowInvite(true)} className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition ">
          <UserIcon className="h-5 w-5" />
          <span>Invite User</span>
        </button>

      <button className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition ">
        <DocumentTextIcon className="h-5 w-5" />
        <span>Export Logs</span>
      </button>
      {showInvite && (
        <Modal onClose={() => setShowInvite(false)}>
          <InviteUserForm
            onInvite={handleInvite}
            onCancel={() => setShowInvite(false)}
          />
        </Modal>
      )}
    </div>
  );
};
