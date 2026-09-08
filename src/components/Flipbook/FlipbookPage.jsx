import { forwardRef } from 'react';
import TivatimLogo from '../Brand/TivatimLogo.jsx';

/**
 * Casca de uma página física do flipbook. react-pageflip exige que cada
 * página filha encaminhe a ref para o elemento raiz.
 */
const FlipbookPage = forwardRef(function FlipbookPage(
  { number, bare = false, children },
  ref
) {
  return (
    <div className="flip-page" ref={ref} data-density="hard">
      <div className="flip-page__inner">
        {children}
        {!bare && (
          <footer className="flip-page__footer">
            <TivatimLogo tone="dark" markSize={16} />
            <span>{number}</span>
          </footer>
        )}
      </div>
    </div>
  );
});

export default FlipbookPage;
