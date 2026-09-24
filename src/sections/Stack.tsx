import { stack } from '../content';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';

export function Stack() {
  return (
    <Section id="stack" heading={stack.heading}>
      <Reveal>
        <dl className="mt-10">
          {stack.groups.map((group) => (
            <div key={group.group} className="stack-row">
              <dt className="font-semibold">{group.group}</dt>
              <dd className="text-muted">{group.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
