'use client';

import { CloseIcon } from '../icons';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
        
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          <div className="bg-white">
            <div className="sticky top-0 z-50 bg-white border-b">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="w-6"></div>
                <h3 className="text-base font-medium">用户点评</h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">关闭</span>
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}