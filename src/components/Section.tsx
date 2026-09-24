import type { ReactNode } from 'react';
import { Container } from './Container';
import { Reveal } from './Reveal';

type Props = {
  id: string;
  heading: string;
  intro?: ReactNode;
  children: ReactNode;
  headingClassName?: string;
};

export function Section({ id, heading, intro, children, headingClassName = 'h-section' }: Props) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="section">
      <Container>
        <Reveal>
          <h2 id={headingId} className={headingClassName}>
            {heading}
          </h2>
          {intro}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
