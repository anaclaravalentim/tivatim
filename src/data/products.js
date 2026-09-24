/**
 * Produtos ilustrativos do portfólio.
 *
 * Estes itens usam modelos reais e conhecidos de cada marca apenas para
 * DEMONSTRAR o tipo de solução oferecido em cada categoria — não é um
 * catálogo completo, não representa estoque disponível e as especificações
 * são resumidas propositalmente.
 *
 * Cada produto é um arquivo JSON separado em data/products/<id>.json (em vez
 * de um array grande neste arquivo) para que o painel de edição (Decap CMS,
 * em /admin) consiga criar, editar e remover produtos individualmente sem
 * tocar em código — ver README.md para como usar o painel.
 *
 * icon: chave usada pelo componente ProductImage para escolher a
 * ilustração de placeholder quando o produto não tem foto própria (ver
 * components/ProductCard/icons.jsx).
 * image: caminho pra foto do produto (o painel /admin preenche isso ao
 * subir uma foto, salvando em public/products/); sem ele, ProductImage
 * tenta achar uma foto em assets/products/<id>.* automaticamente (ver
 * data/productImages.js) — mantido como reserva pra quando não há foto
 * cadastrada ainda.
 *
 * O "id" de cada produto é sempre o nome do arquivo (não o campo "id" do
 * JSON, que o painel de edição nem chega a mostrar) — assim não existe
 * risco de alguém editar esse campo sem querer e o produto sumir da
 * página do catálogo onde ele estava (ver src/data/pages.js).
 */
const modules = import.meta.glob('./products/*.json', { eager: true, import: 'default' });

export const PRODUCTS = Object.entries(modules).map(([path, data]) => ({
  ...data,
  id: path.split('/').pop().replace(/\.json$/, ''),
}));

export const getProductsByCategory = (categoryId) =>
  PRODUCTS.filter((p) => p.category === categoryId);

export const getProductsByBrand = (brand) => PRODUCTS.filter((p) => p.brand === brand);

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
