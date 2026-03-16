import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Icon from "../../src/components/Icon.astro";

test("Icon renders correctly with distinct paths", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Icon, {
    props: { name: "github" },
  });

  expect(result).toContain("<svg");
  // Confirm that the specific github SVG path string is present
  expect(result).toContain('d="M12 0c-6.626');
});
