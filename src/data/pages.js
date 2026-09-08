/**
 * Estrutura das páginas da revista. Cada entrada descreve o que deve ser
 * renderizado em UMA página física do flipbook (não um "spread"), permitindo
 * que a lib de flipbook decida sozinha se mostra 1 ou 2 páginas por vez.
 *
 * type: 'cover' | 'category' | 'brands' | 'contact'
 * groups: blocos de produtos agrupados por marca dentro da página.
 *
 * Cada categoria "normal" tem 8 produtos cadastrados e cabe inteira em UMA
 * página (grade 2 colunas x 4 linhas) — evita páginas finais esparsas com
 * poucos itens.
 */
export const PAGES = [
  { number: 1, type: 'cover' },

  {
    number: 2,
    type: 'category',
    categoryId: 'computadores',
    groups: [
      { brand: 'lenovo', productIds: ['lenovo-thinkpad-e14', 'lenovo-ideapad-3'] },
      { brand: 'dell', productIds: ['dell-latitude-3420', 'dell-vostro-3520'] },
      {
        brand: 'acer',
        productIds: ['acer-aspire-5', 'acer-travelmate', 'acer-swift-go-14', 'acer-veriton'],
      },
    ],
  },

  {
    number: 3,
    type: 'category',
    categoryId: 'monitores',
    groups: [
      { brand: 'aoc', productIds: ['aoc-24g2'] },
      { brand: 'lg', productIds: ['lg-24mp400'] },
      { brand: 'samsung', productIds: ['samsung-odyssey-g5', 'samsung-viewfinity-s6'] },
      { brand: 'dell', productIds: ['dell-p2422h'] },
      { brand: 'acer', productIds: ['acer-nitro-vg240y'] },
      { brand: 'lenovo', productIds: ['lenovo-thinkvision-t24', 'lenovo-thinkvision-s24e'] },
    ],
  },

  {
    number: 4,
    type: 'category',
    categoryId: 'armazenamento',
    groups: [
      { brand: 'kingston', productIds: ['kingston-nv2', 'kingston-a400'] },
      { brand: 'wd', productIds: ['wd-blue-ssd', 'wd-my-passport'] },
      { brand: 'patriot', productIds: ['patriot-p210'] },
      { brand: 'lexar', productIds: ['lexar-nm620'] },
      { brand: 'samsung', productIds: ['samsung-990-evo', 'samsung-870-evo'] },
    ],
  },

  {
    number: 5,
    type: 'category',
    categoryId: 'memoria',
    groups: [
      { brand: 'kingston', productIds: ['kingston-fury-beast', 'kingston-valueram'] },
      { brand: 'patriot', productIds: ['patriot-viper-steel', 'patriot-signature'] },
      { brand: 'lexar', productIds: ['lexar-ares', 'lexar-thor'] },
      {
        brand: 'kingston',
        subtitle: 'Cartões de Memória',
        productIds: ['kingston-canvas-select', 'kingston-canvas-go-plus'],
      },
    ],
  },

  {
    number: 6,
    type: 'category',
    categoryId: 'redes',
    groups: [
      { brand: 'intelbras', productIds: ['intelbras-action-rf1200', 'intelbras-sg2404'] },
      { brand: 'tp-link', productIds: ['tplink-archer-ax55', 'tplink-eap225'] },
      { brand: 'aruba', productIds: ['aruba-instant-on-ap15', 'aruba-instant-on-ap11'] },
      { brand: 'furukawa', productIds: ['furukawa-cabo-cat6', 'furukawa-patch-cord'] },
    ],
  },

  {
    number: 7,
    type: 'category',
    categoryId: 'seguranca',
    groups: [
      {
        brand: 'intelbras',
        productIds: [
          'intelbras-vip-1230-b',
          'intelbras-mhdx-1116',
          'intelbras-vip-3230-b',
          'intelbras-nvd-1408',
        ],
      },
      {
        brand: 'hikvision',
        productIds: [
          'hikvision-ds-2cd1123g0',
          'hikvision-nvr-4ch',
          'hikvision-ds-2ce16d0t',
          'hikvision-ds-7608ni',
        ],
      },
    ],
  },

  {
    number: 8,
    type: 'category',
    categoryId: 'impressao',
    groups: [
      {
        brand: 'brother',
        productIds: [
          'brother-dcp-t420w',
          'brother-hl-l2-series',
          'brother-dcp-l3560cdw',
          'brother-mfc-j997dw',
        ],
      },
      { brand: 'epson', productIds: ['epson-ecotank-l3250', 'epson-ecotank-l4260'] },
      { brand: 'canon', productIds: ['canon-pixma-g3111', 'canon-pixma-g6011'] },
    ],
  },

  {
    number: 9,
    type: 'category',
    categoryId: 'automacao',
    groups: [
      { brand: 'zebra', productIds: ['zebra-zd230', 'zebra-ds2208', 'zebra-zt230', 'zebra-ds4608'] },
      {
        brand: 'honeywell',
        productIds: [
          'honeywell-voyager-1200g',
          'honeywell-pc42t',
          'honeywell-voyager-1450g',
          'honeywell-pd45',
        ],
      },
    ],
  },

  {
    number: 10,
    type: 'category',
    categoryId: 'comunicacao',
    groups: [
      {
        brand: 'motorola',
        productIds: [
          'motorola-talkabout-t200',
          'motorola-talkabout-t400',
          'motorola-talkabout-t280',
          'motorola-sl300',
        ],
      },
      {
        brand: 'intelbras',
        productIds: [
          'intelbras-tip-125i',
          'intelbras-tip-200',
          'intelbras-tip-300',
          'intelbras-tip-435g',
        ],
      },
    ],
  },

  {
    number: 11,
    type: 'category',
    categoryId: 'perifericos',
    groups: [
      { brand: 'dell', productIds: ['dell-mouse-ms116', 'dell-keyboard-kb216'] },
      { brand: 'lenovo', productIds: ['lenovo-dock-usbc', 'lenovo-mouse-300'] },
      { brand: 'acer', productIds: ['acer-webcam', 'acer-vero-mouse'] },
      { brand: 'tp-link', productIds: ['tplink-usb-adapter', 'tplink-ub500'] },
    ],
  },

  {
    number: 12,
    type: 'category',
    categoryId: 'infraestrutura',
    groups: [
      { brand: 'furukawa', productIds: ['furukawa-fibra-optica', 'furukawa-rack'] },
      { brand: 'intelbras', productIds: ['intelbras-patch-panel', 'intelbras-organizador-cabos'] },
      { brand: 'aruba', productIds: ['aruba-switch-cx', 'aruba-cx-6000'] },
      { brand: 'tp-link', productIds: ['tplink-switch-sg', 'tplink-sg3428'] },
    ],
  },

  // Destaques do Portfólio
  {
    number: 13,
    type: 'category',
    categoryId: 'destaques',
    featured: true,
    groups: [
      { brand: 'hikvision', productIds: ['destaque-hikvision'] },
      { brand: 'kingston', productIds: ['destaque-kingston'] },
    ],
  },
  {
    number: 14,
    type: 'category',
    categoryId: 'destaques',
    featured: true,
    groups: [
      { brand: 'tp-link', productIds: ['destaque-tplink'] },
      { brand: 'dell', productIds: ['destaque-dell'] },
    ],
  },

  { number: 15, type: 'brands' },
  { number: 16, type: 'contact' },
];

export const TOTAL_PAGES = PAGES.length;

export const getPage = (number) => PAGES.find((p) => p.number === number);

/**
 * Índice navegável: primeira página em que cada categoria aparece,
 * na ordem definida em data/categories.js.
 */
export const getIndexEntries = () => {
  const firstPageByCategory = {};
  PAGES.forEach((page) => {
    const key = page.type === 'category' ? page.categoryId : page.type;
    if (!(key in firstPageByCategory)) firstPageByCategory[key] = page.number;
  });
  return Object.entries(firstPageByCategory).map(([id, page]) => ({ id, page }));
};
