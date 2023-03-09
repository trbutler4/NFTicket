const Dotenv = require("dotenv-webpack");

module.exports = {
    webpack: {
          experiments: {
            topLevelAwait: true
          }
    },
  plugins: [new Dotenv()],
};
