import { getBrand } from '../../data/brands.js';
import ProductImage from './ProductImage.jsx';
import './ProductCard.css';

export default function ProductCard({ product, size = 'md' }) {
  const brand = getBrand(product.brand);
  return (
    <article className={`product-card product-card--${size}`}>
      <ProductImage
        icon={product.icon}
        image={product.image}
        productId={product.id}
        label={`${brand?.name} ${product.name}`}
      />
      <div className="product-card__body">
        <span className="product-card__brand">{brand?.name}</span>
        <h4 className="product-card__name">{product.name}</h4>
        <span className="product-card__model">{product.model}</span>
        {size === 'lg' && <p className="product-card__desc">{product.description}</p>}
        {product.specs?.length > 0 && (
          <ul className="product-card__specs">
            {product.specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
