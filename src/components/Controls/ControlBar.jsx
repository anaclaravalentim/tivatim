import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  GridIcon,
  ListIcon,
  ShareIcon,
  ExpandIcon,
  CompressIcon,
  CheckIcon,
} from './icons.jsx';
import './ControlBar.css';

function formatPageIndicator(currentPage, totalPages, isSpread) {
  if (!isSpread || currentPage === 1) return `${currentPage}`;
  const first = currentPage % 2 === 0 ? currentPage : currentPage - 1;
  const second = Math.min(first + 1, totalPages);
  return first === second ? `${first}` : `${first}–${second}`;
}

export default function ControlBar({
  currentPage,
  totalPages,
  isSpread,
  onPrev,
  onNext,
  zoomScale,
  onZoomIn,
  onZoomOut,
  onZoomSlider,
  onToggleThumbnails,
  thumbnailsOpen,
  onToggleIndex,
  indexOpen,
  onShare,
  shareCopied,
  onToggleFullscreen,
  isFullscreen,
}) {
  return (
    <div className="control-bar" role="toolbar" aria-label="Controles da revista">
      <button
        type="button"
        className="control-bar__btn"
        onClick={onPrev}
        disabled={currentPage <= 1}
        aria-label="Página anterior"
      >
        <ChevronLeftIcon />
      </button>

      <span className="control-bar__indicator" aria-live="polite">
        {formatPageIndicator(currentPage, totalPages, isSpread)} / {totalPages}
      </span>

      <button
        type="button"
        className="control-bar__btn"
        onClick={onNext}
        disabled={currentPage >= totalPages}
        aria-label="Próxima página"
      >
        <ChevronRightIcon />
      </button>

      <span className="control-bar__divider" />

      <button
        type="button"
        className="control-bar__btn"
        onClick={onZoomOut}
        aria-label="Diminuir zoom"
      >
        <MinusIcon />
      </button>

      <input
        className="control-bar__slider"
        type="range"
        min={60}
        max={250}
        step={5}
        value={Math.round(zoomScale * 100)}
        onChange={(e) => onZoomSlider(Number(e.target.value) / 100)}
        aria-label="Nível de zoom"
      />

      <button
        type="button"
        className="control-bar__btn"
        onClick={onZoomIn}
        aria-label="Aumentar zoom"
      >
        <PlusIcon />
      </button>

      <span className="control-bar__divider" />

      <button
        type="button"
        className={`control-bar__btn ${thumbnailsOpen ? 'is-active' : ''}`}
        onClick={onToggleThumbnails}
        aria-label="Miniaturas"
        aria-pressed={thumbnailsOpen}
      >
        <GridIcon />
      </button>

      <button
        type="button"
        className={`control-bar__btn ${indexOpen ? 'is-active' : ''}`}
        onClick={onToggleIndex}
        aria-label="Índice"
        aria-pressed={indexOpen}
      >
        <ListIcon />
      </button>

      <button
        type="button"
        className="control-bar__btn"
        onClick={onShare}
        aria-label="Compartilhar"
      >
        {shareCopied ? <CheckIcon /> : <ShareIcon />}
      </button>

      <button
        type="button"
        className="control-bar__btn"
        onClick={onToggleFullscreen}
        aria-label={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
      >
        {isFullscreen ? <CompressIcon /> : <ExpandIcon />}
      </button>
    </div>
  );
}
