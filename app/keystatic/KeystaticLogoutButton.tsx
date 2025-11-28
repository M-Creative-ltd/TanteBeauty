'use client';

import { useState } from 'react';

export default function KeystaticLogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    // Navigate directly to logout route which will clear cookie and redirect
    window.location.href = '/keystatic-logout';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Log out of Keystatic admin"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        {isLoggingOut ? 'Logging out...' : 'Log Out'}
      </button>
    </div>
  );
}

