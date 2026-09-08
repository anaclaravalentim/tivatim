/**
 * Categorias de produto — o catálogo é organizado primariamente por categoria,
 * não por marca, para demonstrar amplitude de opções dentro de cada necessidade.
 */
export const CATEGORIES = [
  { id: 'computadores', name: 'Computadores e Notebooks', short: 'Computadores' },
  { id: 'monitores', name: 'Monitores e Displays', short: 'Monitores' },
  { id: 'armazenamento', name: 'Armazenamento', short: 'Armazenamento' },
  { id: 'memoria', name: 'Memória e Componentes', short: 'Memórias' },
  { id: 'redes', name: 'Redes e Conectividade', short: 'Redes' },
  { id: 'seguranca', name: 'Segurança Eletrônica', short: 'Segurança' },
  { id: 'impressao', name: 'Impressão e Digitalização', short: 'Impressão' },
  { id: 'automacao', name: 'Impressão Térmica e Automação', short: 'Automação' },
  { id: 'comunicacao', name: 'Comunicação', short: 'Comunicação' },
  { id: 'perifericos', name: 'Periféricos e Acessórios', short: 'Periféricos' },
  { id: 'infraestrutura', name: 'Infraestrutura e Conectividade', short: 'Infraestrutura' },
  { id: 'destaques', name: 'Destaques do Portfólio', short: 'Destaques' },
  { id: 'marcas', name: 'Nossas Marcas', short: 'Marcas' },
  { id: 'contato', name: 'Contato', short: 'Contato' },
];

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);
