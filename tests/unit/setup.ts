import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

/** Media queries listed here report `matches: true`. Tests push to it before rendering. */
export const matchingQueries = new Set<string>();

vi.stubGlobal('matchMedia', (query: string) => ({
  matches: matchingQueries.has(query),
  media: query,
  onchange: null,
  addEventListener: () => {},
  removeEventListener: () => {},
  addListener: () => {},
  removeListener: () => {},
  dispatchEvent: () => false,
}));

class IntersectionObserverStub {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);

afterEach(() => {
  cleanup();
  matchingQueries.clear();
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});
