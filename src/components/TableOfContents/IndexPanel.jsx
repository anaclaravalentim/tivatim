import { CATEGORIES } from '../../data/categories.js';
import { getIndexEntries } from '../../data/pages.js';
import '../Thumbnails/ThumbnailPanel.css';
import './IndexPanel.css';

export default function IndexPanel({ open, onSelect, onClose }) {
  const entries = getIndexEntries();
  const byId = Object.fromEntries(entries.map((e) => [e.id, e.page]));

  return (
    <aside className={`side-panel ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="side-panel__header">
        <h4>Índice</h4>
        <button type="button" className="side-panel__close" onClick={onClose} aria-label="Fechar índice">
          ×
        </button>
      </div>
      <nav className="index-panel__list" aria-label="Índice de categorias">
        {CATEGORIES.map((cat) => (
          <button
            type="button"
            key={cat.id}
            className="index-panel__item"
            onClick={() => onSelect(byId[cat.id] ?? 1)}
          >
            <span>{cat.name}</span>
            <span className="index-panel__page">{byId[cat.id]}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
