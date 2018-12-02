module.exports = {
  launch: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  server: {
    command: 'yarn start',
    port: 3000,
    protocol: 'http',
    usedPortAction: 'ask',
    launchTimeout: 50000,
  },
}