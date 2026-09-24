import { expect, test } from '@playwright/test';

test('loads, toggles the theme and links the résumé', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: 'Switch to light theme' })).toBeVisible();

  const resume = page.getByRole('link', { name: 'Download résumé' });
  await expect(resume).toHaveAttribute('href', '/resume-guilherme-holanda.pdf');
});
