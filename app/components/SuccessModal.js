'use client';

import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function SuccessModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-lg p-6 shadow-xl transform transition-all duration-300 ease-in-out">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <FontAwesomeIcon
              icon={faCheck}
              className="text-green-500 text-3xl animate-[bounce_1s_ease-in-out]" 
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">评论成功</h3>
          <p className="text-gray-600">感谢您的评论</p>
        </div>
      </div>
    </div>
  );
}