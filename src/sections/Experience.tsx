import { experience } from '../content';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';

export function Experience() {
  return (
    <Section id="experience" heading={experience.heading}>
      <ol className="timeline mt-10">
        {experience.items.map((item, index) => (
          <Reveal as="li" key={item.title} delay={index * 0.05} className="timeline-item">
            <p className="timeline-period">{item.period}</p>
            <div className="timeline-body">
              <h3 className="h-minor-lg">{item.title}</h3>
              {item.org && <p className="mt-1 text-muted">{item.org}</p>}
              {item.description && (
                <p className="mt-3 max-w-[var(--measure)]">{item.description}</p>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
