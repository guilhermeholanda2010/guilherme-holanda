import { howIWork } from '../content';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { WorktreePanel } from '../components/WorktreePanel';

export function HowIWork() {
  return (
    <Section id="how-i-work" heading={howIWork.heading}>
      <div className="mt-8 grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <Reveal>
          <p className="lead-display">{howIWork.intro}</p>
          <div className="mt-6 max-w-[var(--measure)] space-y-4">
            {howIWork.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08} className="lg:pt-2">
          <WorktreePanel {...howIWork.panel} />
        </Reveal>
      </div>
    </Section>
  );
}
