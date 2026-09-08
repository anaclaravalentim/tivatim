import { useEffect } from 'react';

/**
 * Reflete a página atual em ?page= na URL, sem recarregar a aplicação
 * (history.replaceState). A leitura inicial da URL é feita via
 * utils/url.getInitialPage + prop startPage do flipbook, não aqui.
 */
export function useUrlPageSync(currentPage) {
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', String(currentPage));
    window.history.replaceState({}, '', url);
  }, [currentPage]);
}
