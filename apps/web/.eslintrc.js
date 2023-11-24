module.exports = {
  extends: ["custom/next"],
  root: true,
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
};
