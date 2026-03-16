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
    await page.goto("/");
    // Target the first post link in the grid specifically
    const firstPostLink = page.locator("ul.grid a.daisyui-card").first();
    const href = await firstPostLink.getAttribute("href");

    if (href) {
      await page.goto(href);
      // Wait for the reading progress bar or other dynamic elements if any
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      if (accessibilityScanResults.violations.length > 0) {
        console.log(
          "ACCESSIBILITY_VIOLATIONS_POST:",
          JSON.stringify(accessibilityScanResults.violations, null, 2),
        );
      }

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
