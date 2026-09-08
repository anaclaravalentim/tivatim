import './TivatimLogo.css';

// Pétala em forma de "folha"/lente, com ponta no centro (0,0) e ponta na
// borda externa (0,-45) — larga o bastante para que pétalas vizinhas (a 45°
// uma da outra, 8 no total) se cruzem perto do centro, criando o efeito
// trançado/vazado da marca real da Tivatim (contorno apenas, sem preenchimento).
const PETAL = 'M0,0 C-15,-9 -15,-34 0,-45 C15,-34 15,-9 0,0 Z';
const ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * Recriação em código da marca Tivatim (flor/pinwheel de oito pétalas
 * contornadas + wordmark), usada como referência de identidade visual.
 * Não distorcer proporções.
 */
export default function TivatimLogo({
  variant = 'full',
  tone = 'light',
  markSize = 40,
  className = '',
}) {
  const isLight = tone === 'light';
  const strokeColor = isLight ? '#ffffff' : 'var(--primary-color)';
  const textColor = isLight ? '#ffffff' : 'var(--primary-dark)';

  const mark = (
    <svg
      width={markSize}
      height={markSize}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Símbolo Tivatim"
    >
      <g transform="translate(50,53)">
        <g fill="none" stroke={strokeColor} strokeWidth={3.2} strokeLinejoin="round" strokeLinecap="round">
          {ANGLES.map((angle) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <path d={PETAL} />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );

  if (variant === 'mark') {
    return <span className={`tivatim-logo tivatim-logo--mark ${className}`}>{mark}</span>;
  }

  return (
    <span
      className={`tivatim-logo tivatim-logo--full ${className}`}
      style={{ '--tivatim-mark-size': `${markSize}px` }}
    >
      {mark}
      <span className="tivatim-logo__word" style={{ color: textColor }}>
        tivatim
      </span>
    </span>
  );
}
