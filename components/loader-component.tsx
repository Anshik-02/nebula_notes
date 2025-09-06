// components/ui/CosmicLoader.tsx
export default function CosmicLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Animated planet ring */}
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-yellow-400/50 border-t-transparent rounded-full animate-spin"></div>
        {/* Central planet */}
        <span className="absolute text-yellow-300 text-3xl animate-pulse">🪐</span>
      </div>

      {/* Loading text */}
      <p className="mt-6 text-yellow-300 font-semibold text-lg tracking-wide">
        Assets are being loaded…
      </p>
    </div>
  );
}
