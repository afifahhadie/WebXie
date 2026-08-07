export function Hexagon({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center w-16 h-16 ${className}`}
      style={{
        clipPath:
          "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
        background:
          "linear-gradient(160deg, #0d1730 0%, #16213f 100%)",
        border: "1px solid #233258",
      }}
    >
      {children}
    </div>
  );
}
