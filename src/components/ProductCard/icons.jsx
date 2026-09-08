const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const wrap = (children) => (
  <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden="true">
    {children}
  </svg>
);

/**
 * Ilustrações de placeholder por categoria de produto (line-art simples).
 * Usadas quando não há foto real do produto — deixam claro que a imagem é
 * ilustrativa, conforme exigido para esta versão do catálogo.
 */
export const ICONS = {
  notebook: () =>
    wrap(
      <g {...stroke}>
        <rect x="10" y="10" width="28" height="18" rx="1.5" />
        <path d="M6 33h36l-3 5H9z" />
      </g>
    ),
  monitor: () =>
    wrap(
      <g {...stroke}>
        <rect x="7" y="9" width="34" height="21" rx="1.5" />
        <path d="M18 36h12M24 30v6" />
      </g>
    ),
  ssd: () =>
    wrap(
      <g {...stroke}>
        <rect x="9" y="14" width="30" height="20" rx="2" />
        <path d="M15 20h4M15 26h10M27 20h6M27 26h6" />
      </g>
    ),
  'external-drive': () =>
    wrap(
      <g {...stroke}>
        <rect x="13" y="8" width="22" height="32" rx="3" />
        <circle cx="24" cy="30" r="4" />
        <path d="M19 15h10" />
      </g>
    ),
  ram: () =>
    wrap(
      <g {...stroke}>
        <path d="M8 14h32v18a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2z" />
        <path d="M14 14v-3h4v3M22 14v-3h4v3M30 14v-3h4v3" />
      </g>
    ),
  'memory-card': () =>
    wrap(
      <g {...stroke}>
        <path d="M14 8h16l6 6v26H14z" />
        <path d="M19 8v8h6V8M19 22h10M19 28h10" />
      </g>
    ),
  router: () =>
    wrap(
      <g {...stroke}>
        <rect x="7" y="20" width="34" height="12" rx="2" />
        <path d="M14 20l4-8M20 20l2-8" />
        <circle cx="33" cy="26" r="1.4" fill="currentColor" stroke="none" />
      </g>
    ),
  switch: () =>
    wrap(
      <g {...stroke}>
        <rect x="6" y="17" width="36" height="14" rx="2" />
        {[11, 17, 23, 29, 35].map((x) => (
          <path key={x} d={`M${x} 21v6`} />
        ))}
      </g>
    ),
  'access-point': () =>
    wrap(
      <g {...stroke}>
        <ellipse cx="24" cy="30" rx="12" ry="4" />
        <path d="M24 26V10M18 16a8 8 0 0 1 12 0M15 11a13 13 0 0 1 18 0" />
      </g>
    ),
  cable: () =>
    wrap(
      <g {...stroke}>
        <path d="M10 14v6a8 8 0 0 0 8 8h12a8 8 0 0 1 8 8v4" />
        <rect x="6" y="10" width="8" height="8" rx="1.5" />
        <rect x="34" y="30" width="8" height="8" rx="1.5" />
      </g>
    ),
  camera: () =>
    wrap(
      <g {...stroke}>
        <rect x="6" y="18" width="26" height="16" rx="2" />
        <path d="M32 23l10-4v16l-10-4z" />
        <circle cx="15" cy="26" r="4" />
      </g>
    ),
  dvr: () =>
    wrap(
      <g {...stroke}>
        <rect x="7" y="15" width="34" height="18" rx="2" />
        <path d="M13 33v3h6v-3M29 33v3h6v-3" />
        <circle cx="15" cy="24" r="2" fill="currentColor" stroke="none" />
        <path d="M22 24h13" />
      </g>
    ),
  printer: () =>
    wrap(
      <g {...stroke}>
        <path d="M14 18V9h20v9" />
        <rect x="8" y="18" width="32" height="14" rx="2" />
        <rect x="14" y="28" width="20" height="11" />
      </g>
    ),
  'label-printer': () =>
    wrap(
      <g {...stroke}>
        <rect x="8" y="14" width="32" height="16" rx="2" />
        <path d="M12 34h14v5H12zM30 30v-4" />
      </g>
    ),
  scanner: () =>
    wrap(
      <g {...stroke}>
        <path d="M15 10h6l3 5h9a2 2 0 0 1 2 2v17a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V17a2 2 0 0 1 2-2h4z" />
        <path d="M15 24h14" />
      </g>
    ),
  radio: () =>
    wrap(
      <g {...stroke}>
        <rect x="16" y="14" width="16" height="26" rx="2" />
        <path d="M24 14V8M20 8h8" />
        <path d="M21 27h6" />
      </g>
    ),
  phone: () =>
    wrap(
      <g {...stroke}>
        <rect x="13" y="8" width="22" height="32" rx="3" />
        <path d="M18 15h12M20 34h8" />
      </g>
    ),
  mouse: () =>
    wrap(
      <g {...stroke}>
        <rect x="16" y="9" width="16" height="30" rx="8" />
        <path d="M24 9v12" />
      </g>
    ),
  dock: () =>
    wrap(
      <g {...stroke}>
        <rect x="6" y="19" width="36" height="10" rx="2" />
        <path d="M12 29v3M18 29v3M30 29v3M36 29v3" />
      </g>
    ),
  webcam: () =>
    wrap(
      <g {...stroke}>
        <circle cx="24" cy="22" r="10" />
        <circle cx="24" cy="22" r="4" />
        <path d="M14 34h20" />
      </g>
    ),
  'usb-adapter': () =>
    wrap(
      <g {...stroke}>
        <rect x="9" y="18" width="20" height="12" rx="2" />
        <path d="M29 22h10v4H29" />
      </g>
    ),
  fiber: () =>
    wrap(
      <g {...stroke}>
        <path d="M8 34c8-16 24-4 32-20" />
        <circle cx="8" cy="34" r="2" fill="currentColor" stroke="none" />
        <circle cx="40" cy="14" r="2" fill="currentColor" stroke="none" />
      </g>
    ),
  rack: () =>
    wrap(
      <g {...stroke}>
        <rect x="12" y="6" width="24" height="36" rx="1.5" />
        {[12, 18, 24, 30, 36].map((y) => (
          <path key={y} d={`M15 ${y}h18`} />
        ))}
      </g>
    ),
};

export const getIcon = (key) => ICONS[key] || ICONS.notebook;
