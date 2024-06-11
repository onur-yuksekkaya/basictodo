'use client';

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="mx-auto flex w-full flex-col items-center space-y-6 rounded-2xl bg-white p-8 shadow-2xl md:max-w-md">
            <h2 className="text-3xl font-bold text-gray-900">Something went wrong!</h2>
            <p className="text-sm text-gray-500 md:text-base">{error.message}</p>
            <button
              onClick={reset}
              className="w-full rounded-md bg-blue-600 px-6 py-3 text-center text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
