import { useCallback, useState } from 'react';

export function useShare() {
  const [copied, setCopied] = useState(false);

  const share = useCallback(async (page) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', String(page));
    const shareData = {
      title: 'Catálogo Tivatim 2026',
      text: 'Confira o catálogo de produtos Tivatim.',
      url: url.toString(),
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // usuário cancelou o compartilhamento nativo — não faz nada.
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard indisponível — sem feedback adicional.
    }
  }, []);

  return { share, copied };
}
