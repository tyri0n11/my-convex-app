"use client";

import { toast } from "react-toastify";

interface ConfirmationToastProps {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const showConfirmationToast = ({
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes, Delete",
  cancelText = "Cancel"
}: ConfirmationToastProps) => {
  const toastId = toast(
    ({ closeToast }) => (
      <div className="flex flex-col space-y-3">
        <div className="text-gray-900 font-medium">{message}</div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
          >
            {confirmText}
          </button>
          <button
            onClick={() => {
              onCancel?.();
              closeToast();
            }}
            className="px-3 py-1.5 bg-gray-200 text-gray-800 text-sm font-medium rounded hover:bg-gray-300 transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      closeButton: false,
      className: "confirmation-toast",
      bodyClassName: "p-4",
    }
  );

  return toastId;
};
