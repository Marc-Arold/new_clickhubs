export default function Spinner({ size = 16, className = "" }) {
  return (
    <div
      className={`border-2 border-current/30 border-t-current rounded-full animate-spin ${className}`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Ap load..."
    />
  );
}
