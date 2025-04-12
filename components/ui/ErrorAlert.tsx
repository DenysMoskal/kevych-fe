import React from 'react';
import { TrainIcon } from '@/app/assets/svg';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-md mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <TrainIcon className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3">
          <p className="text-red-700 font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
