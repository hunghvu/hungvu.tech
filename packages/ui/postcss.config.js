const sharedConfig = require("tailwind-config/postcss.config");

module.exports = {
  // prefix ui lib classes to avoid conflicting with the app
  prefix: "ui-",
  ...sharedConfig,
};