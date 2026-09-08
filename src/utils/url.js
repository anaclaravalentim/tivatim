/**
 * Lê ?page= da URL uma única vez, de forma síncrona, para que a página
 * inicial seja definida via prop (startPage) em vez de um flip() imperativo
 * disparado após a montagem — evita corrida com a inicialização do PageFlip.
 */
export function getInitialPage(totalPages) {
  if (typeof window === 'undefined') return 1;
  const params = new URLSearchParams(window.location.search);
  const requested = Number(params.get('page'));
  if (requested && requested >= 1 && requested <= totalPages) return requested;
  return 1;
}
