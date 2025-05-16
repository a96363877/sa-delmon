"use client"

import React from "react"

interface PopupMessageProps {
  onClose: () => void
}

const PopupMessage: React.FC<PopupMessageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden" dir="rtl">
        <div className="relative">
          <img src="/kardl.webp" alt="عرض خاص" className="w-full h-auto" />
          <button onClick={onClose} className="absolute top-2 left-2 bg-white rounded-full p-1 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="p-4">
         
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-1 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
            >
              استفد من العرض الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupMessage
