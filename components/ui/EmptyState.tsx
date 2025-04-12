import React from 'react';
import { TrainIcon } from '@/app/assets/svg';

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
      <TrainIcon className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-4 text-gray-500 text-lg">{message}</p>
      <p className="mt-2 text-gray-400">Add a new schedule to see it here</p>
    </div>
  );
};

export default EmptyState;
