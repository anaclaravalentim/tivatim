import { PAGES } from '../../data/pages.js';
import { getCategory } from '../../data/categories.js';
import './ThumbnailPanel.css';

const LABELS = { brands: 'Marcas', contact: 'Contato', cover: 'Capa' };

function pageLabel(page) {
  if (page.type === 'category') return getCategory(page.categoryId).short;
  return LABELS[page.type];
}

export default function ThumbnailPanel({ open, currentPage, onSelect, onClose }) {
  return (
    <aside className={`side-panel ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="side-panel__header">
        <h4>Miniaturas</h4>
        <button type="button" className="side-panel__close" onClick={onClose} aria-label="Fechar miniaturas">
          ×
        </button>
      </div>
      <div className="thumbnail-panel__grid">
        {PAGES.map((page) => (
          <button
            type="button"
            key={page.number}
            className={`thumbnail-card ${page.number === currentPage ? 'is-current' : ''}`}
            onClick={() => onSelect(page.number)}
            aria-label={`Ir para a página ${page.number}`}
          >
            <span className={`thumbnail-card__preview thumbnail-card__preview--${page.type}`}>
              {pageLabel(page)}
            </span>
            <span className="thumbnail-card__number">{page.number}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
