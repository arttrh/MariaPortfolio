/**
 * Marca radial de Maria Eduarda.
 *
 * Composição inspirada no ritmo do logo do Flora (cinco formas em arranjo
 * radial, sombreamento suave), porém com geometria própria: lâminas
 * arredondadas em vez de pétalas em coração. Cada pétala é um elemento
 * separado para permitir animação individual via GSAP.
 */
export default function Mark({
  className = "",
  petalClassName = "",
}: {
  className?: string;
  petalClassName?: string;
}) {
  const petals = [0, 72, 144, 216, 288];

  return (
    <svg
      viewBox="-160 -160 320 320"
      className={className}
      role="img"
      aria-label="Marca de Maria Eduarda"
    >
      <defs>
        <linearGradient id="mark-face" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#f4f1ea" />
          <stop offset="100%" stopColor="#ddd8cc" />
        </linearGradient>
        <linearGradient id="mark-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c9c3b4" stopOpacity="0.5" />
        </linearGradient>
        <filter id="mark-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="10"
            floodColor="#3a3428"
            floodOpacity="0.18"
          />
        </filter>
      </defs>

      <g filter="url(#mark-shadow)">
        {petals.map((angle) => (
          <path
            key={angle}
            className={petalClassName}
            data-petal
            transform={`rotate(${angle}) translate(0 -16)`}
            d="M0 0
               C -34 -10, -62 -46, -52 -84
               C -45 -110, -14 -122, 0 -104
               C 14 -122, 45 -110, 52 -84
               C 62 -46, 34 -10, 0 0 Z"
            fill="url(#mark-face)"
            stroke="url(#mark-edge)"
            strokeWidth="1.5"
            style={{ transformOrigin: "0px 0px" }}
          />
        ))}
      </g>
    </svg>
  );
}
