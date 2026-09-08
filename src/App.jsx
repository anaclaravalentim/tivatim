import { useCallback, useRef, useState } from 'react';
import { TOTAL_PAGES } from './data/pages.js';
import { getInitialPage } from './utils/url.js';
import { useFlipbook } from './hooks/useFlipbook.js';
import { useFullscreen } from './hooks/useFullscreen.js';
import { useKeyboardNav } from './hooks/useKeyboardNav.js';
import { useShare } from './hooks/useShare.js';
import { useUrlPageSync } from './hooks/useUrlPageSync.js';
import FlipbookViewer from './components/Flipbook/FlipbookViewer.jsx';
import ZoomWrapper from './components/Zoom/ZoomWrapper.jsx';
import ControlBar from './components/Controls/ControlBar.jsx';
import PageArrows from './components/Controls/PageArrows.jsx';
import ThumbnailPanel from './components/Thumbnails/ThumbnailPanel.jsx';
import IndexPanel from './components/TableOfContents/IndexPanel.jsx';
import TivatimLogo from './components/Brand/TivatimLogo.jsx';
import './App.css';

const INITIAL_PAGE = getInitialPage(TOTAL_PAGES);

export default function App() {
  const { bookRef, currentPage, goNext, goPrev, goToPage, handleFlip } = useFlipbook(
    TOTAL_PAGES,
    INITIAL_PAGE
  );

  const [isSpread, setIsSpread] = useState(true);
  const [zoomScale, setZoomScale] = useState(1);
  const [thumbnailsOpen, setThumbnailsOpen] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);

  const appRef = useRef(null);
  const zoomRef = useRef(null);

  const { isFullscreen, toggleFullscreen } = useFullscreen(appRef);
  const { share, copied } = useShare();

  useUrlPageSync(currentPage);

  const closePanels = useCallback(() => {
    setThumbnailsOpen(false);
    setIndexOpen(false);
  }, []);

  const handleGoToPage = useCallback(
    (page) => {
      goToPage(page);
      closePanels();
    },
    [goToPage, closePanels]
  );

  useKeyboardNav({
    onNext: goNext,
    onPrev: goPrev,
    onEscape: () => {
      if (thumbnailsOpen || indexOpen) closePanels();
      else if (isFullscreen) toggleFullscreen();
    },
  });

  const handleChangeOrientation = useCallback((e) => {
    setIsSpread(e.data === 'landscape');
  }, []);

  const handleZoomButton = useCallback((direction) => {
    if (direction > 0) zoomRef.current?.zoomIn(0.2);
    else zoomRef.current?.zoomOut(0.2);
  }, []);

  const handleZoomSlider = useCallback((scale) => {
    zoomRef.current?.setTransform(undefined, undefined, scale, 200);
  }, []);

  return (
    <div className="app" ref={appRef}>
      <header className="app__header">
        <TivatimLogo tone="light" markSize={30} />
        <span className="app__header-tag">Catálogo de Produtos 2026</span>
      </header>

      <main className="app__stage">
        <ZoomWrapper ref={zoomRef} onScaleChange={setZoomScale} panningDisabled={false}>
          <FlipbookViewer
            bookRef={bookRef}
            onFlip={handleFlip}
            onChangeOrientation={handleChangeOrientation}
            startPage={INITIAL_PAGE - 1}
          />
        </ZoomWrapper>

        <PageArrows
          onPrev={goPrev}
          onNext={goNext}
          canPrev={currentPage > 1}
          canNext={currentPage < TOTAL_PAGES}
        />

        <ThumbnailPanel
          open={thumbnailsOpen}
          currentPage={currentPage}
          onSelect={handleGoToPage}
          onClose={closePanels}
        />
        <IndexPanel open={indexOpen} onSelect={handleGoToPage} onClose={closePanels} />
      </main>

      <ControlBar
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        isSpread={isSpread}
        onPrev={goPrev}
        onNext={goNext}
        zoomScale={zoomScale}
        onZoomIn={() => handleZoomButton(1)}
        onZoomOut={() => handleZoomButton(-1)}
        onZoomSlider={handleZoomSlider}
        onToggleThumbnails={() => {
          setIndexOpen(false);
          setThumbnailsOpen((v) => !v);
        }}
        thumbnailsOpen={thumbnailsOpen}
        onToggleIndex={() => {
          setThumbnailsOpen(false);
          setIndexOpen((v) => !v);
        }}
        indexOpen={indexOpen}
        onShare={() => share(currentPage)}
        shareCopied={copied}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />
    </div>
  );
}
