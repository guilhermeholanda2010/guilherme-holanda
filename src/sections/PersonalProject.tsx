import { personalProject, selectedWork } from '../content';
import { CaseStudy } from '../components/CaseStudy';
import { Section } from '../components/Section';

export function PersonalProject() {
  return (
    <Section id="personal-project" heading={personalProject.heading}>
      <div className="case-studies">
        <CaseStudy project={personalProject.project} stackLabel={selectedWork.stackLabel} />
      </div>
    </Section>
  );
}
