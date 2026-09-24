import { AnimatePresence, motion, useInView } from 'motion/react';
import { Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Worktree } from '../content';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { EASE_OUT } from './motion';

type Props = {
  title: string;
  meta: string;
  caption: string;
  worktrees: Worktree[];
  replayAfter: number;
};

/**
 * Four branches progressing in parallel. Plays when scrolled into view, then replays once
 * if it's still on screen `replayAfter` seconds later. Reduced motion shows the finished state.
 */
export function WorktreePanel({ title, meta, caption, worktrees, replayAfter }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const started = useInView(ref, { once: true, amount: 0.6 });
  const visible = useInView(ref, { amount: 0.3 });
  const visibleRef = useRef(visible);
  const [pass, setPass] = useState(1);
  const [finished, setFinished] = useState(0);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    if (reduced || pass !== 1 || finished < worktrees.length) return;
    const timer = window.setTimeout(() => {
      if (!visibleRef.current) return;
      setFinished(0);
      setPass(2);
    }, replayAfter * 1000);
    return () => window.clearTimeout(timer);
  }, [reduced, pass, finished, worktrees.length, replayAfter]);

  return (
    <figure className="m-0">
      <div ref={ref} className="panel">
        <div className="panel-bar">
          <span>{title}</span>
          <span>{meta}</span>
        </div>
        <ul>
          {worktrees.map((worktree) => (
            <WorktreeRow
              key={`${worktree.branch}-${pass}`}
              worktree={worktree}
              active={started}
              reduced={reduced}
              onDone={() => setFinished((count) => count + 1)}
            />
          ))}
        </ul>
      </div>
      <figcaption className="mt-3 text-[0.9375rem] text-muted">{caption}</figcaption>
    </figure>
  );
}

type RowProps = {
  worktree: Worktree;
  active: boolean;
  reduced: boolean;
  onDone: () => void;
};

function WorktreeRow({ worktree, active, reduced, onDone }: RowProps) {
  const [done, setDone] = useState(reduced);
  const isDone = reduced || done;
  const status = isDone ? worktree.done : worktree.running;

  return (
    <li className="panel-row" data-done={isDone}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-ink">{worktree.branch}</span>
        <span className="relative shrink-0">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={status}
              className={`inline-flex items-center gap-1.5 ${isDone ? 'text-ok' : 'text-muted'}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              {isDone && <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} />}
              {status}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
      <div className="panel-track" aria-hidden="true">
        <motion.span
          className="panel-fill"
          initial={{ scaleX: reduced ? 1 : 0 }}
          animate={{ scaleX: reduced || active ? 1 : 0 }}
          transition={{ duration: worktree.duration, ease: [0.45, 0, 0.25, 1] }}
          onAnimationComplete={() => {
            if (reduced || !active || done) return;
            setDone(true);
            onDone();
          }}
        />
        <motion.span
          className="panel-fill panel-fill-done"
          initial={false}
          animate={{ opacity: isDone ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
        />
      </div>
    </li>
  );
}
