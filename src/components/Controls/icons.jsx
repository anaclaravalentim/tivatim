const props = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const ChevronLeftIcon = () => (
  <svg {...props}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export const ChevronRightIcon = () => (
  <svg {...props}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export const MinusIcon = () => (
  <svg {...props}>
    <path d="M5 12h14" />
  </svg>
);

export const PlusIcon = () => (
  <svg {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const GridIcon = () => (
  <svg {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

export const ListIcon = () => (
  <svg {...props}>
    <path d="M8 6h13M8 12h13M8 18h13" />
    <path d="M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
);

export const ShareIcon = () => (
  <svg {...props}>
    <circle cx="18" cy="5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="19" r="2.5" />
    <path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" />
  </svg>
);

export const ExpandIcon = () => (
  <svg {...props}>
    <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
);

export const CompressIcon = () => (
  <svg {...props}>
    <path d="M9 3v3a2 2 0 0 1-2 2H4M15 3v3a2 2 0 0 0 2 2h3M9 21v-3a2 2 0 0 0-2-2H4M15 21v-3a2 2 0 0 1 2-2h3" />
  </svg>
);

export const CheckIcon = () => (
  <svg {...props}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
