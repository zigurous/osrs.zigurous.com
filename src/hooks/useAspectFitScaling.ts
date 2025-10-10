import { useCallback, useEffect, useState } from 'react';

export function useAspectFitScaling<T extends HTMLElement>(
  aspectWidth: number | null,
  aspectHeight: number | null,
  minScale?: number,
  maxScale?: number,
): [React.RefCallback<T>, number | undefined] {
  const [scale, setScale] = useState<number | undefined>();
  const [element, setElement] = useState<T | null>(null);
  const [observer, setObserver] = useState<ResizeObserver>();

  const ref = useCallback<React.RefCallback<T>>(node => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (element && observer) {
      observer.observe(element);
      return () => {
        observer?.unobserve(element);
      };
    }
  }, [element, observer]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setObserver(
        new ResizeObserver((entries: ResizeObserverEntry[]) => {
          let sw = 1;
          let sh = 1;
          if (aspectWidth !== null) sw = entries[0].contentRect.width / aspectWidth;
          if (aspectHeight !== null) sh = entries[0].contentRect.height / aspectHeight;
          let scale = Math.min(sw, sh);
          if (minScale !== undefined) scale = Math.max(scale, minScale);
          if (maxScale !== undefined) scale = Math.min(scale, maxScale);
          setScale(scale);
        }),
      );
    }
  }, [aspectWidth, aspectHeight, minScale, maxScale]);

  return [ref, scale];
}
