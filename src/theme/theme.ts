import { flushSync } from 'react-dom';

export type Theme = 'light' | 'dark';

export const STORAGE_KEY = 'theme';

const isTheme = (value: unknown): value is Theme => value === 'light' || value === 'dark';

export function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). The toggle still works for this visit.
  }
}

export function systemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** The theme the inline script in index.html already applied, or the best guess. */
export function initialTheme(): Theme {
  const applied = document.documentElement.dataset.theme;
  return isTheme(applied) ? applied : (readStoredTheme() ?? systemTheme());
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

type Origin = { x: number; y: number };

/**
 * Runs `update` (which must set the new theme) with the best transition the browser supports:
 * a circular reveal from `origin` via View Transitions, a colour cross-fade otherwise,
 * and nothing at all under reduced motion.
 */
export function transitionTheme(update: () => void, origin?: Origin) {
  const root = document.documentElement;

  if (prefersReducedMotion()) {
    update();
    return;
  }

  if (typeof document.startViewTransition !== 'function') {
    root.classList.add('theme-fading');
    update();
    window.setTimeout(() => root.classList.remove('theme-fading'), 300);
    return;
  }

  const transition = document.startViewTransition(() => flushSync(update));
  const x = origin?.x ?? window.innerWidth;
  const y = origin?.y ?? 0;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  transition.ready
    .then(() =>
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 400,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      ),
    )
    .catch(() => {
      // The transition was skipped (for example, the tab was hidden). The theme is already applied.
    });
}
