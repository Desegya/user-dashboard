'use client';

import { FC } from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
}

export const StatCard: FC<StatCardProps> = ({ label, value, icon: Icon }) => {
  return (
    <div className="bg-white border border-[#F0F0F0] rounded-lg p-4 flex items-center">
      <div className="p-2 bg-blue-100 rounded-full">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <div className="ml-4">
        <p className="text-lg font-semibold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};
