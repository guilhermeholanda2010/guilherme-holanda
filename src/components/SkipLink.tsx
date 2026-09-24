import { site } from '../content';

export function SkipLink() {
  return (
    <a href="#main" className="skip-link">
      {site.skipLink}
    </a>
  );
}
