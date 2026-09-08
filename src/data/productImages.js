/**
 * Fotos reais de produto, resolvidas em tempo de build.
 *
 * Para adicionar a foto de um produto: salve o arquivo em
 * src/assets/products/<id-do-produto>.{jpg,jpeg,png,webp} usando o mesmo id
 * definido em data/products.js (ex.: "kingston-nv2.jpg" para o produto
 * `id: 'kingston-nv2'`). Nenhuma outra alteração é necessária — o Vite
 * inclui o arquivo no build e o ProductCard passa a mostrar a foto no lugar
 * do ícone de placeholder automaticamente.
 *
 * Usamos import.meta.glob (eager) em vez de tentar caminhos "adivinhados"
 * em runtime: assim sabemos com certeza, já no build, quais produtos têm
 * foto — sem requests extras, sem cascata de onError e sem depender de um
 * 404 "de verdade" (o servidor de dev do Vite responde 200 com o
 * index.html para qualquer caminho inexistente, o que quebra a checagem
 * "a imagem existe?" feita via tentativa e erro).
 */
const modules = import.meta.glob('../assets/products/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const PRODUCT_IMAGES = {};
for (const path in modules) {
  const filename = path.split('/').pop();
  const id = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  PRODUCT_IMAGES[id] = modules[path];
}

export const getProductImage = (productId) => PRODUCT_IMAGES[productId];
