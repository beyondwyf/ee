'use client';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex flex-col h-full">
        <div className="sticky top-0 z-50 bg-white border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">返回</span>
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h3 className="text-base font-medium">发布评论</h3>
            <div className="w-6"></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}