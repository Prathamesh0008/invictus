'use client';

import { useState } from 'react';
import { FaWhatsapp, FaTimes, FaComment } from 'react-icons/fa';

export default function WhatsAppSticky() {
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = '';
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;

  const handleWhatsAppClick = () => {
    if (isExpanded) {
      window.open(whatsappLink, '_blank');
    } else {
      setIsExpanded(true);
    }
  };

  return (
    <>
      {/* WhatsApp Sticky Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end cursor-pointer space-y-3">
        {/* Expanded Card */}
        {isExpanded && (
          <div className="bg-white rounded-2xl shadow-2xl border border-green-100 cursor-pointer animate-slide-up">
            <div className="p-5 max-w-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center  cursor-pointer justify-center shadow-lg">
                    <FaWhatsapp className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">WhatsApp Support</h3>
                    <p className="text-sm text-gray-600">Instant Response</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="mb-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  Need help with your shipment? Chat with our logistics experts.
                </p>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-semibold text-green-600">Online Now</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FAB045] to-orange-400 rounded-full flex items-center justify-center mr-3">
                    <FaComment className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Quick Inquiry</p>
                    <p className="text-xs text-gray-500">Get instant quotes</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#FAB045] to-orange-400 rounded-full flex items-center justify-center mr-3">
                    <FaComment className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Track Shipment</p>
                    <p className="text-xs text-gray-500">Real-time updates</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <FaWhatsapp className="mr-2" />
                  Start Chat on WhatsApp
                </a>
                <p className="text-center text-xs text-gray-500 mt-2">
                  {phoneNumber}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className={`group relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:shadow-3xl ${
            isExpanded 
              ? 'bg-gradient-to-br from-green-600 to-green-700' 
              : 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
          }`}
          aria-label="WhatsApp Support"
        >
          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
          
          {/* Icon */}
          <FaWhatsapp className="text-white text-3xl transform group-hover:scale-110 transition-transform duration-300" />
          
          {/* Notification Badge */}
          {!isExpanded && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#FAB045] to-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          )}
        </button>

        {/* Quick Message Indicator */}
        {/* {!isExpanded && (
          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-green-100">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Chat with us</span>
          </div>
        )} */}
      </div>

      {/* Styles for animation */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}