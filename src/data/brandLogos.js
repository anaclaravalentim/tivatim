/**
 * Logos de marca (glifo/ícone, não a logo completa com efeitos oficiais).
 *
 * Fonte: pacote "Simple Icons" (https://simpleicons.org), distribuído sob
 * CC0 — os arquivos SVG em si são de domínio público, mas as marcas que
 * representam continuam sendo propriedade de cada fabricante. Usamos aqui
 * apenas para identificar visualmente "marcas com as quais trabalhamos",
 * o uso nominativo padrão de um catálogo de revenda.
 *
 * Nem toda marca do catálogo tem um ícone disponível nessa biblioteca — para
 * as que não têm, a BrandsPage cai de volta no selo com as iniciais.
 * Para trocar por um arquivo oficial da marca no futuro, basta importar o
 * SVG em `src/assets/brand-logos/` e apontar a chave correspondente aqui.
 */
import tplink from '../assets/brand-logos/tplink.svg?raw';
import epson from '../assets/brand-logos/epson.svg?raw';
import lenovo from '../assets/brand-logos/lenovo.svg?raw';
import dell from '../assets/brand-logos/dell.svg?raw';
import acer from '../assets/brand-logos/acer.svg?raw';
import kingston from '../assets/brand-logos/kingstontechnology.svg?raw';
import lg from '../assets/brand-logos/lg.svg?raw';
import samsung from '../assets/brand-logos/samsung.svg?raw';
import motorola from '../assets/brand-logos/motorola.svg?raw';
import zebra from '../assets/brand-logos/zebratechnologies.svg?raw';

export const BRAND_LOGOS = {
  'tp-link': tplink,
  epson,
  lenovo,
  dell,
  acer,
  kingston,
  lg,
  samsung,
  motorola,
  zebra,
};

export const getBrandLogo = (brandId) => BRAND_LOGOS[brandId];
