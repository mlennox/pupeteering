module.exports = {
  launch: {
    headless: true,
    dumpio: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  server: {
    // command: 'node scripts/start.js',
    command: 'yarn start',
    port: 3000,
    protocol: 'http',
    usedPortAction: 'ask',
    launchTimeout: 50000,
  },
}