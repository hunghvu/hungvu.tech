// Mostly use this to activate linter in VSCode
// Otherwise, it is not applicable because the rules
// are for a React-based project.
module.exports = {
  extends: ["custom/vercel"],
  root: true,
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
};
