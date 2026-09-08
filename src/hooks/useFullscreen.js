import { useCallback, useEffect, useState } from 'react';

export function useFullscreen(targetRef) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await targetRef.current?.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch {
      // Fullscreen API indisponível ou negada pelo navegador — ignora silenciosamente.
    }
  }, [targetRef]);

  return { isFullscreen, toggleFullscreen };
}
