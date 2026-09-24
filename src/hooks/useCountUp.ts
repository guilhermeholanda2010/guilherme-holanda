import { animate } from 'motion/react';
import { useEffect, useState } from 'react';

type Options = {
  /** Start counting once this turns true. */
  start: boolean;
  /** Return the final value straight away (reduced motion, or nothing to count). */
  skip: boolean;
  duration?: number;
};

/** Counts from 0 to `target` once, easing out so it decelerates at the end. */
export function useCountUp(target: number, { start, skip, duration = 0.9 }: Options): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (skip || !start) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [target, start, skip, duration]);

  return skip ? target : value;
}
