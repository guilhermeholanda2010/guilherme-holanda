import { selectedWork } from '../content';
import { CaseStudy } from '../components/CaseStudy';
import { Section } from '../components/Section';

export function SelectedWork() {
  return (
    <Section
      id="work"
      heading={selectedWork.heading}
      intro={<p className="section-intro">{selectedWork.intro}</p>}
    >
      <div className="case-studies">
        {selectedWork.projects.map((project) => (
          <CaseStudy key={project.id} project={project} stackLabel={selectedWork.stackLabel} />
        ))}
      </div>
    </Section>
  );
}
