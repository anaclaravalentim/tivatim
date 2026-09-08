/**
 * Marcas comercializadas pela Tivatim.
 * Estrutura isolada dos produtos para permitir, futuramente, carregar
 * este catálogo de uma API/banco de dados sem alterar os componentes.
 */
export const BRANDS = [
  { id: 'intelbras', name: 'Intelbras' },
  { id: 'hikvision', name: 'Hikvision' },
  { id: 'tp-link', name: 'TP-Link' },
  { id: 'aruba', name: 'Aruba' },
  { id: 'brother', name: 'Brother' },
  { id: 'epson', name: 'Epson' },
  { id: 'canon', name: 'Canon' },
  { id: 'zebra', name: 'Zebra' },
  { id: 'lenovo', name: 'Lenovo' },
  { id: 'dell', name: 'Dell' },
  { id: 'acer', name: 'Acer' },
  { id: 'kingston', name: 'Kingston' },
  { id: 'wd', name: 'Western Digital' },
  { id: 'patriot', name: 'Patriot' },
  { id: 'lexar', name: 'Lexar' },
  { id: 'honeywell', name: 'Honeywell' },
  { id: 'aoc', name: 'AOC' },
  { id: 'lg', name: 'LG' },
  { id: 'samsung', name: 'Samsung' },
  { id: 'motorola', name: 'Motorola' },
  { id: 'furukawa', name: 'Furukawa' },
];

export const getBrand = (id) => BRANDS.find((b) => b.id === id);
