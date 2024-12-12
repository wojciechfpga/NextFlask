import React from 'react';
import Link from 'next/link';
import {INTERNAL_ROUTES} from '../../config/internalRoutes'
 const AuthModal =({ children})=> {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md mx-auto">
        <Link href={INTERNAL_ROUTES.NOT_LOGGED}>
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ×
        </button>
        </Link>
        {children}
      </div>
    </div>
  );
}
export default AuthModal