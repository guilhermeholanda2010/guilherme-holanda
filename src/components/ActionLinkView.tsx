import { ArrowUpRight } from 'lucide-react';
import type { ActionLink } from '../content';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** Renders a content.ts link as a primary button, secondary button or text link. */
export function ActionLinkView({ link, className = '' }: { link: ActionLink; className?: string }) {
  const props = {
    href: link.href,
    ...(link.external && external),
    ...(link.download && { download: '' }),
  };
  const arrow = link.external && (
    <ArrowUpRight aria-hidden="true" className="arrow size-[1em] shrink-0" strokeWidth={2} />
  );

  if (link.kind === 'text') {
    return (
      <a {...props} className={`group inline-flex items-center gap-1 text-accent ${className}`}>
        <span className="link">{link.label}</span>
        {arrow}
      </a>
    );
  }

  return (
    <a
      {...props}
      className={`btn ${link.kind === 'primary' ? 'btn-primary' : 'btn-secondary'} group ${className}`}
    >
      {link.label}
      {arrow}
    </a>
  );
}
