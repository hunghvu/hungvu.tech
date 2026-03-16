import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Accessibility Audits", () => {
  test("home page should be accessible", async ({ page }) => {
    await page.goto("/");
    // Pagefind can take a moment to load, but we want to test the main layout
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("blog post page should be accessible", async ({ page }) => {
    // Assuming at least one post exists. We can use the first post from the main page.
    await page.goto("/");
    const firstPost = page.locator('a[href^="/"]').first();
    const href = await firstPost.getAttribute("href");

    if (href) {
      await page.goto(href);
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });

  test("404 page should be accessible", async ({ page }) => {
    await page.goto("/404-not-found-page", { waitUntil: "networkidle" });
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
