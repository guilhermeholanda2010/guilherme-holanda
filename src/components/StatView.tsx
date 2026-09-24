import { useInView } from 'motion/react';
import { useRef } from 'react';
import type { Stat } from '../content';
import { useCountUp } from '../hooks/useCountUp';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { statText } from './statText';

/**
 * A big number with a thin accent rule. Counts up when it scrolls into view.
 * The final value is always present for screen readers and reserves the width, so nothing shifts.
 */
export function StatView({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduced = usePrefersReducedMotion();
  const current = useCountUp(stat.value ?? 0, {
    start: inView,
    skip: reduced || stat.value === undefined,
  });
  const final = statText(stat);

  return (
    <li ref={ref} className="stat" data-wide={stat.display !== undefined}>
      <p className="stat-value">
        <span className="grid" aria-hidden="true">
          <span className="invisible col-start-1 row-start-1">{final}</span>
          <span className="col-start-1 row-start-1" data-testid="stat-visible">
            {statText(stat, current)}
          </span>
        </span>
        <span className="sr-only">{final}</span>
      </p>
      <p className="stat-label">{stat.label}</p>
    </li>
  );
}
