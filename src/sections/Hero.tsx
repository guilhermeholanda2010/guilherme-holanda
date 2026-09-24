import { motion, type Variants } from 'motion/react';
import type { Ref } from 'react';
import { hero, identity, isSet } from '../content';
import { ActionLinkView } from '../components/ActionLinkView';
import { Container } from '../components/Container';
import { EASE_OUT } from '../components/motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const group: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};

export function Hero({ ref }: { ref?: Ref<HTMLElement> }) {
  const reduced = usePrefersReducedMotion();
  const actions = hero.actions.filter((action) => isSet(action.href));

  return (
    <section ref={ref} id="top" aria-labelledby="hero-heading" className="hero">
      <Container>
        <motion.div variants={group} initial={reduced ? false : 'hidden'} animate="shown">
          <motion.p
            variants={item}
            className="flex items-start gap-2.5 text-[0.9375rem] text-muted"
          >
            <span
              aria-hidden="true"
              className="mt-[0.5625rem] size-2 shrink-0 rounded-full bg-ok"
            />
            {hero.status}
          </motion.p>

          <motion.h1 variants={item} id="hero-heading" className="h-hero mt-6">
            {hero.headline}
          </motion.h1>

          <motion.p variants={item} className="hero-lead mt-6">
            {hero.lead}
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-[60ch] text-muted">
            {hero.supporting}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex flex-wrap gap-3">
              {actions
                .filter((action) => action.kind !== 'text')
                .map((action) => (
                  <ActionLinkView key={action.label} link={action} />
                ))}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {actions
                .filter((action) => action.kind === 'text')
                .map((action) => (
                  <ActionLinkView key={action.label} link={action} />
                ))}
            </div>
          </motion.div>

          <motion.p variants={item} className="mt-8 text-[0.9375rem] text-muted">
            {identity.location}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
