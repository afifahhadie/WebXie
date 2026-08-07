export function HexagonGrid({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 w-full h-full opacity-[0.06] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="hex-grid"
          width="56"
          height="100"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1)"
        >
          <path
            d="M28 0 L56 16 L56 50 L28 66 L0 50 L0 16 Z"
            fill="none"
            stroke="#4c8dff"
            strokeWidth="1"
          />
          <path
            d="M28 66 L56 82 L56 116 L28 132 L0 116 L0 82 Z"
            fill="none"
            stroke="#4c8dff"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-grid)" />
    </svg>
  );
}
