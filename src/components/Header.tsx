import { identity, site } from '../content';
import { ThemeToggle } from './ThemeToggle';

export function Header({ scrolled }: { scrolled: boolean }) {
  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
        <a href="#top" className="font-display text-[1.0625rem] font-semibold tracking-[-0.01em]">
          {identity.name}
        </a>
        <div className="flex items-center gap-1 sm:gap-4">
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-5 text-[0.9375rem]">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
