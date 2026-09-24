import type { Project } from '../content';
import { Reveal } from './Reveal';
import { StackList } from './StackList';
import { StatView } from './StatView';

export function CaseStudy({ project, stackLabel }: { project: Project; stackLabel: string }) {
  const headingId = `${project.id}-name`;
  return (
    <Reveal as="article" className="case-study" aria-labelledby={headingId}>
      <div className="[grid-area:head]">
        <h3 id={headingId} className="h-project">
          {project.name}
        </h3>
        {project.meta && <p className="mt-2 text-muted">{project.meta}</p>}
        <p className="mt-5 max-w-[var(--measure)] text-[1.1875rem] leading-[1.55]">
          {project.description}
        </p>
      </div>

      <ul className="stats [grid-area:stats]" aria-label={`${project.name} in numbers`}>
        {project.stats.map((stat) => (
          <StatView key={stat.label} stat={stat} />
        ))}
      </ul>

      <div className="[grid-area:body]">
        <h4 className="h-minor">{project.roleHeading}</h4>
        <ul className="bullets mt-3 max-w-[var(--measure)]">
          {project.role.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <StackList label={stackLabel} items={project.stack} />
        {project.footnote && (
          <p className="mt-6 max-w-[var(--measure)] text-muted">{project.footnote}</p>
        )}
      </div>
    </Reveal>
  );
}
