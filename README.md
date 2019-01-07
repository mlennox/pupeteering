# pupeteering
quick investigation of UI tests with Jest and Puppeteer.

This app was created with create-react-app

# Puppeteer

Install puppeteer using `jest-pupeteer`. Currently, you'll need to eject the app to allow this.

# jest-puppeteer

We use [jest-puppeteer](https://github.com/smooth-code/jest-puppeteer) to drive `puppeteer` from our `Jest` tests.

We have two config files for `jest-puppeteer` because we need to run the files locally and on a CI server.

## local config

```javascript
launch: {
  headless: true,
  // slowMo: 200,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
}
```

## CI config

# CI status

[![CircleCI](https://circleci.com/gh/mlennox/puppeteering.svg?style=svg)](https://circleci.com/gh/mlennox/puppeteering) 
