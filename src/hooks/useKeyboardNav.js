import { useEffect } from 'react';

export function useKeyboardNav({ onNext, onPrev, onEscape }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === 'ArrowRight') onNext?.();
      else if (e.key === 'ArrowLeft') onPrev?.();
      else if (e.key === 'Escape') onEscape?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onEscape]);
}
