import { expect, test } from "@playwright/test";

test.describe("Extended UI & SEO Features", () => {
  test("404 Page mounts correctly on broken routes", async ({ page }) => {
    // Navigate to a guaranteed broken route
    const response = await page.goto("/does-not-exist-error-route");
    // Ensure the server accurately responds with 404 status
    expect(response?.status()).toBe(404);

    // Ensure the 404 layout mounts (assuming default H1 "404" or similar)
    const titleText = await page.textContent("h1");
    expect(titleText).toContain("404");
  });

  test("Theme Toggle successfully flips data-theme attribute", async ({ page }) => {
    await page.goto("/");

    // Get the HTML element to check the `data-theme` attribute
    const html = page.locator("html");

    // Wait for the hydration of `theme-change`
    await page.waitForLoadState("networkidle");
    const themeToggleLabel = page.locator('label:has(input[data-toggle-theme="dark"])').first();

    // Check initial state
    const initialTheme = (await html.getAttribute("data-theme")) ?? "";

    // Click the toggle button
    await themeToggleLabel.click();

    // LocalStorage should update, and the html tag should flip to the opposite
    await expect(html).not.toHaveAttribute("data-theme", initialTheme);
  });

  test("RSS Feed Endpoint returns valid XML content", async ({ page }) => {
    const response = await page.goto("/rss.xml");

    // Endpoints must return 200 OK
    expect(response?.status()).toBe(200);

    // Must return actual XML content
    const content = await response?.text();
    expect(content).toContain("<?xml");
    expect(content).toContain("<rss");
  });

  test("Sitemap Index returns valid XML content", async ({ page }) => {
    const response = await page.goto("/sitemap-index.xml");

    // Endpoints must return 200 OK
    expect(response?.status()).toBe(200);

    // Must return actual XML content
    const content = await response?.text();
    expect(content).toContain("<?xml");
    expect(content).toContain("sitemapindex");
  });
});
