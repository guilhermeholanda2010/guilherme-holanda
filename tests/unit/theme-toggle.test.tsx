import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from '../../src/components/ThemeToggle';
import { site } from '../../src/content';
import { ThemeProvider } from '../../src/theme/ThemeProvider';

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe('ThemeToggle', () => {
  it('switches data-theme, persists the choice and updates its accessible label', async () => {
    document.documentElement.dataset.theme = 'light';
    renderToggle();

    const button = screen.getByRole('button', { name: site.theme.toDark });
    await userEvent.click(button);

    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(button).toHaveAccessibleName(site.theme.toLight);

    await userEvent.click(button);

    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(button).toHaveAccessibleName(site.theme.toDark);
  });

  it('starts from the theme the inline script applied', () => {
    document.documentElement.dataset.theme = 'dark';
    renderToggle();
    expect(screen.getByRole('button', { name: site.theme.toLight })).toBeInTheDocument();
  });
});
