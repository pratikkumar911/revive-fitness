export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`logo ${className}`}
      role="img"
      aria-label="Revive Fitness Club"
    >
      <span className="logo-word">
        REV
        <svg className="bolt" viewBox="0 0 12 24" aria-hidden="true">
          <path d="M8 0 0 14h5l-2 10 9-15H7z" />
        </svg>
        VE
      </span>
      <small>Fitness Club</small>
    </div>
  );
}
