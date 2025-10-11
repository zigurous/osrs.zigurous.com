import { aspectFit, useMemoizedRef, type Size } from '@zigurous/forge-react'; // prettier-ignore
import { useEffect, useState } from 'react';

export function useAspectFitScaling<T extends HTMLElement>(
  aspectSize: Partial<Size>,
  minScale?: number,
  maxScale?: number,
): [number | undefined, React.RefCallback<T>] {
  const [element, ref] = useMemoizedRef<T>();
  const [scale, setScale] = useState<number>();

  useEffect(() => {
    if (typeof window !== 'undefined' && element) {
      const observer = new ResizeObserver(entries =>
        setScale(
          aspectFit(entries[0].contentRect, aspectSize, minScale, maxScale),
        ),
      );
      observer.observe(element);
      return () => {
        observer.unobserve(element);
      };
    }
  }, [element, aspectSize, minScale, maxScale]);

  return [scale, ref];
}
