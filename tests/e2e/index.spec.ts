import { test, expect } from '@playwright/test';

test('homepage has correct title and renders Hello', async ({ page }) => {
  await page.goto('/');
  // Checking SEO Head title integration
  await expect(page).toHaveTitle(/Hung Vu/i);
  // Checking main page rendering
  await expect(page.locator('h1.daisyui-card-title')).toHaveText('Hello, Tech Enthusiasts!');
});
