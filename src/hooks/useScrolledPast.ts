import { useEffect, useState, type RefObject } from 'react';

/** True once `ref` has scrolled fully above the top of the viewport. */
export function useScrolledPast(ref: RefObject<Element | null>, offset = 0): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setPast(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { rootMargin: `-${offset}px 0px 0px 0px` },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, offset]);

  return past;
}
