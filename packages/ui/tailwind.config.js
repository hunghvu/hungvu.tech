const sharedConfig = require("tailwind-config/tailwind.config");

module.exports = {
  // prefix ui lib classes to avoid conflicting with the app
  prefix: "ui-",
  ...sharedConfig,
};