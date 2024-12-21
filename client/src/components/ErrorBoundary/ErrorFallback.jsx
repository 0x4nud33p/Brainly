import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div
    role="alert"
    className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6"
  >
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-700 mb-6">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition duration-200"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default ErrorFallback;
