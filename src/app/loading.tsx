export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="relative">
        <div className="h-32 w-32 animate-spin rounded-full border-b-4 border-t-4 border-blue-500"></div>
        <div className="reverse absolute top-0 h-32 w-32 animate-spin rounded-full border-l-4 border-r-4 border-blue-300 opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-medium text-blue-600">Loading...</span>
        </div>
      </div>
    </div>
  );
}
