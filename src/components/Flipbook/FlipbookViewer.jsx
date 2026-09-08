import { useCallback, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { PAGES } from '../../data/pages.js';
import FlipbookPage from './FlipbookPage.jsx';
import PageContent from './PageContent.jsx';
import './FlipbookViewer.css';

// Proporção altura/largura que o react-pageflip usa internamente (via
// "padding-bottom" percentual) pra decidir a altura da página a partir da
// largura recebida — SEM NUNCA checar se essa altura cabe no espaço vertical
// disponível. Guardamos as duas proporções (2 páginas lado a lado vs. 1 só,
// em modo retrato) pra podermos limitar a largura de antemão e nunca deixar
// o livro ficar mais alto do que a área realmente disponível.
const SPREAD_RATIO = 690 / 970;
const PORTRAIT_RATIO = 690 / 485;

export default function FlipbookViewer({
  bookRef,
  onFlip,
  onInit,
  onChangeOrientation,
  startPage = 0,
}) {
  const frameRef = useRef(null);
  const orientationRef = useRef('landscape');
  // react-pageflip dispara vários eventos de "leitura estável" por virada de
  // página (aparentemente um por página do spread), cada um agendando uma
  // recentralização. Se cada um for aplicado assim que chega, os primeiros —
  // medidos antes de TODAS as páginas do novo spread terminarem de se
  // posicionar — aplicam uma correção errada por um instante, e esse
  // lampejo é percebido como o catálogo "pulando" de lado durante a troca.
  // Um token descarta qualquer chamada que não seja mais a mais recente.
  const recenterTokenRef = useRef(0);

  // react-pageflip sempre reserva a largura de um "spread" (2 páginas), mesmo
  // quando só uma página está visível (capa, ou modo retrato). Isso deixa a
  // página visível desalinhada do centro do palco. Recalculamos e aplicamos
  // um deslocamento para centralizar sempre o conteúdo realmente visível.
  const recenter = useCallback(() => {
    const myToken = ++recenterTokenRef.current;
    requestAnimationFrame(() => {
      if (recenterTokenRef.current !== myToken) return;
      const frame = frameRef.current;
      const bookEl = frame?.querySelector('.flipbook-viewer__book');
      if (!frame || !bookEl) return;
      const visible = Array.from(bookEl.querySelectorAll('.flip-page')).filter(
        (p) => p.offsetWidth > 0
      );
      if (!visible.length) return;
      bookEl.style.transform = '';
      const frameRect = frame.getBoundingClientRect();
      const rects = visible.map((p) => p.getBoundingClientRect());
      const left = Math.min(...rects.map((r) => r.left));
      const right = Math.max(...rects.map((r) => r.right));
      const delta = frameRect.left + frameRect.width / 2 - (left + right) / 2;
      if (Math.abs(delta) > 0.5) {
        bookEl.style.transform = `translateX(${delta}px)`;
      }
    });
  }, []);

  // Mede o espaço realmente disponível (o pai do frame, cujo tamanho não
  // depende do próprio livro) e limita a largura que o react-pageflip recebe
  // para que a altura resultante (largura × proporção da página) nunca
  // ultrapasse a altura disponível — sem isso, em janelas mais baixas, o
  // livro cresce além do espaço e transborda por baixo, ficando "deslocado".
  const constrainSize = useCallback(() => {
    const frame = frameRef.current;
    const parent = frame?.parentElement;
    if (!frame || !parent) return;
    const frameStyles = getComputedStyle(frame);
    const paddingX = parseFloat(frameStyles.paddingLeft) + parseFloat(frameStyles.paddingRight);
    const paddingY = parseFloat(frameStyles.paddingTop) + parseFloat(frameStyles.paddingBottom);
    const availableW = parent.clientWidth - paddingX;
    const availableH = parent.clientHeight - paddingY;
    if (availableW <= 0 || availableH <= 0) return;
    const ratio = orientationRef.current === 'portrait' ? PORTRAIT_RATIO : SPREAD_RATIO;
    const cappedWidth = Math.min(availableW, availableH / ratio);
    frame.style.maxWidth = `${Math.max(0, cappedWidth)}px`;
  }, []);

  const recalculate = useCallback(() => {
    constrainSize();
    recenter();
  }, [constrainSize, recenter]);

  useEffect(() => {
    recalculate();
    window.addEventListener('resize', recalculate);
    // ResizeObserver cobre mudanças de layout que não disparam o evento
    // "resize" da window (ex.: painéis que reduzem a área do palco).
    const parent = frameRef.current?.parentElement;
    const observer = parent && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(recalculate) : null;
    observer?.observe(parent);
    return () => {
      window.removeEventListener('resize', recalculate);
      observer?.disconnect();
    };
  }, [recalculate]);

  const handleFlip = useCallback(
    (e) => {
      onFlip?.(e);
    },
    [onFlip]
  );

  // A lib reposiciona páginas continuamente, quadro a quadro, enquanto a
  // animação de virar roda — recentralizar durante isso (ex.: via
  // MutationObserver) faz o livro inteiro tremer. onChangeState nos avisa
  // quando a animação termina ("read"); só aí é seguro recalcular.
  const handleChangeState = useCallback(
    (e) => {
      if (e.data === 'read') recenter();
    },
    [recenter]
  );

  const handleOrientation = useCallback(
    (e) => {
      orientationRef.current = e.data;
      onChangeOrientation?.(e);
      recalculate();
    },
    [onChangeOrientation, recalculate]
  );

  const handleInit = useCallback(() => {
    onInit?.();
    // onChangeOrientation só dispara em mudanças futuras; a orientação
    // inicial precisa ser lida do DOM assim que o livro monta.
    const wrapper = frameRef.current?.querySelector('.stf__wrapper');
    if (wrapper) {
      const orientation = wrapper.classList.contains('--portrait') ? 'portrait' : 'landscape';
      orientationRef.current = orientation;
      onChangeOrientation?.({ data: orientation });
    }
    recalculate();
  }, [onInit, onChangeOrientation, recalculate]);

  return (
    <div className="flipbook-viewer" ref={frameRef}>
      <HTMLFlipBook
        ref={bookRef}
        width={485}
        height={690}
        size="stretch"
        minWidth={240}
        maxWidth={540}
        minHeight={340}
        maxHeight={770}
        maxShadowOpacity={0.35}
        showCover
        startPage={startPage}
        usePortrait
        mobileScrollSupport={false}
        swipeDistance={20}
        flippingTime={650}
        className="flipbook-viewer__book"
        onFlip={handleFlip}
        onInit={handleInit}
        onChangeOrientation={handleOrientation}
        onChangeState={handleChangeState}
      >
        {PAGES.map((page) => (
          <FlipbookPage number={page.number} bare={page.type === 'cover'} key={page.number}>
            <PageContent page={page} />
          </FlipbookPage>
        ))}
      </HTMLFlipBook>
    </div>
  );
}
