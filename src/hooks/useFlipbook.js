import { useCallback, useRef, useState } from 'react';

/**
 * Encapsula a instância imperativa do react-pageflip (PageFlip) para que
 * controles externos (barra inferior, miniaturas, índice, teclado, URL)
 * possam navegar a revista sem conhecer a lib por trás.
 */
export function useFlipbook(totalPages, initialPage = 1) {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const getInstance = useCallback(() => bookRef.current?.pageFlip?.(), []);

  const goNext = useCallback(() => getInstance()?.flipNext(), [getInstance]);
  const goPrev = useCallback(() => getInstance()?.flipPrev(), [getInstance]);

  const goToPage = useCallback(
    (pageNumber) => {
      const safe = Math.min(Math.max(pageNumber, 1), totalPages);
      const inst = getInstance();
      if (inst) inst.flip(safe - 1);
      else setCurrentPage(safe);
    },
    [getInstance, totalPages]
  );

  const handleFlip = useCallback((e) => {
    setCurrentPage(e.data + 1);
  }, []);

  return { bookRef, currentPage, setCurrentPage, goNext, goPrev, goToPage, handleFlip };
}
