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

  test("blog post pages should be accessible", async ({ page }) => {
    await page.goto("/");
    // Target the first few post links in the grid; fail loudly if the selector stops matching
    const postLinks = page.locator("ul.grid a.daisyui-card");
    expect(await postLinks.count()).toBeGreaterThan(0);
    const hrefs = await postLinks.evaluateAll((links) =>
      links.slice(0, 3).map((link) => link.getAttribute("href") ?? ""),
    );

    for (const href of hrefs) {
      expect(href).not.toBe("");
      await page.goto(href);
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      expect(accessibilityScanResults.violations, `Axe violations on ${href}`).toEqual([]);
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
