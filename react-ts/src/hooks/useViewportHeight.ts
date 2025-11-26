import { useEffect } from 'react';

export function useViewportHeight() {
  useEffect(() => {
    const adjustHeight = () => {
      if (window.visualViewport) {
        document.documentElement.style.setProperty(
          '--chat-height',
          `${window.visualViewport.height}px`,
        );
      }
    };

    adjustHeight();
    window.visualViewport?.addEventListener('resize', adjustHeight);

    return () => {
      window.visualViewport?.removeEventListener('resize', adjustHeight);
    };
  }, []);
}
