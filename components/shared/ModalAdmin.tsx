import React from 'react';

interface ModalAdminProps {
  show: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  closeText?: string;
  isLoading?: boolean;
}

const ModalAdmin: React.FC<ModalAdminProps> = ({
  show,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  closeText = 'Close',
  isLoading = false,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full max-h-full overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        ) : (
          <>
            {title && <h3 className="text-lg font-bold mb-4">{title}</h3>}
            {message && <p className="mb-4">{message}</p>}
            <div className="flex justify-end gap-2">
              {onConfirm && (
                <button
                  onClick={onConfirm}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  {confirmText}
                </button>
              )}
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                {closeText}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalAdmin;
