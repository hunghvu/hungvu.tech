// PostToolUse hook: format files Claude just wrote or edited with the project's Prettier config.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

let input = "";
for await (const chunk of process.stdin) input += chunk;

let filePath;
try {
  filePath = JSON.parse(input)?.tool_input?.file_path;
} catch {
  process.exit(0);
}

const prettierBin = join(
  process.env.CLAUDE_PROJECT_DIR ?? process.cwd(),
  "node_modules/prettier/bin/prettier.cjs",
);

if (
  typeof filePath === "string" &&
  existsSync(filePath) &&
  existsSync(prettierBin) &&
  !filePath.includes("node_modules")
) {
  spawnSync(
    process.execPath,
    [prettierBin, "--write", "--ignore-unknown", "--log-level", "silent", filePath],
    {
      stdio: "ignore",
    },
  );
}
