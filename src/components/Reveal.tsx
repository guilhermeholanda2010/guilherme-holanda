import { m } from 'motion/react';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { EASE_OUT } from './motion';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'article';
  'aria-labelledby'?: string;
};

/** Fades content up once, slightly before it is fully in view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  'aria-labelledby': labelledBy,
}: Props) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    const Tag = as;
    return (
      <Tag className={className} aria-labelledby={labelledBy}>
        {children}
      </Tag>
    );
  }
  const Tag = m[as];
  return (
    <Tag
      className={className}
      aria-labelledby={labelledBy}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  );
}
