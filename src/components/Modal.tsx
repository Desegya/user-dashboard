"use client";

import { FC, ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ onClose, children }) => (
  <div className="fixed inset-0 bg-black/20 bg-opacity-10 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700  transition"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
      {children}
    </div>
  </div>
);
