import { Moon, Sun } from 'lucide-react';
import { site } from '../content';
import { useTheme } from '../theme/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'dark' ? site.theme.toLight : site.theme.toDark;
  const Icon = theme === 'dark' ? Sun : Moon;

  return (
    <button
      type="button"
      className="icon-button"
      aria-label={label}
      title={label}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
    >
      <Icon aria-hidden="true" className="size-[1.125rem]" strokeWidth={1.75} />
    </button>
  );
}
