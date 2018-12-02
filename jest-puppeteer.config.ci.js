const config = require('./jest-puppeteer.config');
module.exports = {
  ...config,
  server: {
    command: 'yarn start',
    port: 3000,
    protocol: 'http',
    usedPortAction: 'ignore',
    launchTimeout: 20000,
  },
}