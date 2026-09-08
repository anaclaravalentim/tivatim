import { ChevronLeftIcon, ChevronRightIcon } from './icons.jsx';
import './PageArrows.css';

/**
 * Setas grandes ao lado da revista (fora das páginas), como em visualizadores
 * de flipbook comerciais. Coexistem com prev/next da barra inferior — essas
 * aqui somem em telas estreitas, onde não sobra margem ao lado do livro.
 */
export default function PageArrows({ onPrev, onNext, canPrev, canNext }) {
  return (
    <>
      <button
        type="button"
        className="page-arrow page-arrow--left"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Página anterior"
      >
        <ChevronLeftIcon />
      </button>
      <button
        type="button"
        className="page-arrow page-arrow--right"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Próxima página"
      >
        <ChevronRightIcon />
      </button>
    </>
  );
}
