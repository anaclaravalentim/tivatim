import TivatimLogo from '../Brand/TivatimLogo.jsx';
import { getIcon } from '../ProductCard/icons.jsx';
import './CoverPage.css';

const SHOWCASE_ICONS = ['notebook', 'camera', 'router', 'printer', 'monitor', 'ssd'];

export default function CoverPage() {
  return (
    <div className="cover-page">
      <div className="cover-page__topbar">
        <TivatimLogo tone="light" markSize={34} />
      </div>

      <div className="cover-page__dashes" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="cover-page__main">
        <h1 className="cover-page__title">
          CATÁLOGO DE
          <br />
          PRODUTOS 2026
        </h1>
        <p className="cover-page__subtitle">TECNOLOGIA, CONECTIVIDADE E SOLUÇÕES</p>

        <div className="cover-page__showcase">
          {SHOWCASE_ICONS.map((key) => {
            const Icon = getIcon(key);
            return (
              <div className="cover-page__badge" key={key}>
                <Icon />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
