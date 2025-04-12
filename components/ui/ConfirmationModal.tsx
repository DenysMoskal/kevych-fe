import { DeleteIcon, InfoIcon, WarningIcon } from '@/app/assets/svg';
import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  type = 'danger',
  isLoading,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const getColorsByType = () => {
    switch (type) {
      case 'danger':
        return {
          header: 'bg-red-600',
          confirmButton: 'bg-red-600 hover:bg-red-700',
          icon: <DeleteIcon className="h-6 w-6 text-red-600" />,
        };
      case 'warning':
        return {
          header: 'bg-yellow-500',
          confirmButton: 'bg-yellow-500 hover:bg-yellow-600',
          icon: <WarningIcon className="h-6 w-6 text-yellow-500" />,
        };
      case 'info':
        return {
          header: 'bg-blue-600',
          confirmButton: 'bg-blue-600 hover:bg-blue-700',
          icon: <InfoIcon className="h-6 w-6 text-blue-600" />,
        };
      default:
        return {
          header: 'bg-red-600',
          confirmButton: 'bg-red-600 hover:bg-red-700',
          icon: <DeleteIcon className="h-6 w-6 text-red-600" />,
        };
    }
  };

  const colors = getColorsByType();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0  bg-opacity-50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onCancel}
      ></div>

      <div className="relative z-10 w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
        <div className={`${colors.header} px-4 py-3`}>
          <h3
            className="text-lg font-medium leading-6 text-white"
            id="modal-title"
          >
            {title}
          </h3>
        </div>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              {colors.icon}
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className={`cursor-pointer inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm ${colors.confirmButton} focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
            onClick={onConfirm}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-4 border-b-4 border-red-200"></div>
            ) : (
              confirmText
            )}
          </button>
          <button
            type="button"
            className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={onCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
