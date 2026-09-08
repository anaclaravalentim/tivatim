import { getIcon } from './icons.jsx';
import { getProductImage } from '../../data/productImages.js';

/**
 * Mostra a foto real do produto quando existir (ver data/productImages.js
 * para como adicionar uma); senão cai no ícone de placeholder por categoria.
 */
export default function ProductImage({ icon, label, image, productId }) {
  const resolvedImage = image || getProductImage(productId);

  if (resolvedImage) {
    return (
      <div className="product-image product-image--photo">
        <img src={resolvedImage} alt={label} loading="lazy" />
      </div>
    );
  }

  const Icon = getIcon(icon);
  return (
    <div className="product-image" role="img" aria-label={`Imagem ilustrativa: ${label}`}>
      <div className="product-image__icon">
        <Icon />
      </div>
      <span className="product-image__tag">Imagem ilustrativa</span>
    </div>
  );
}
