import { contact, isSet } from '../content';
import { ActionLinkView } from '../components/ActionLinkView';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';

export function Contact() {
  return (
    <Section id="contact" heading={contact.heading} headingClassName="h-section-lg">
      <Reveal>
        <p className="mt-6 max-w-[52ch] text-[1.1875rem] leading-[1.55]">{contact.line}</p>
        <a href={`mailto:${contact.email}`} className="contact-email mt-10">
          <span className="link">{contact.email}</span>
        </a>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {contact.links
            .filter((link) => isSet(link.href))
            .map((link) => (
              <ActionLinkView key={link.label} link={link} />
            ))}
        </div>
      </Reveal>
    </Section>
  );
}
