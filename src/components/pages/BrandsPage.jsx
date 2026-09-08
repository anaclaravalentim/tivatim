import { BRANDS } from '../../data/brands.js';
import { getBrandLogo } from '../../data/brandLogos.js';
import './BrandsPage.css';

export default function BrandsPage() {
  return (
    <div className="brands-page">
      <header className="brands-page__header">
        <h3>Nossas Principais Marcas</h3>
      </header>

      <p className="brands-page__lead">
        Trabalhamos com as principais marcas do mercado para oferecer soluções completas em
        tecnologia, conectividade e infraestrutura.
      </p>

      <div className="brands-page__grid">
        {BRANDS.map((brand) => {
          const logo = getBrandLogo(brand.id);
          return (
            <div className="brand-badge" key={brand.id}>
              {logo ? (
                <span
                  className="brand-badge__mark brand-badge__mark--logo"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: logo }}
                />
              ) : (
                <span className="brand-badge__mark brand-badge__mark--mono" aria-hidden="true">
                  {brand.name.slice(0, 2).toUpperCase()}
                </span>
              )}
              <span className="brand-badge__name">{brand.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
