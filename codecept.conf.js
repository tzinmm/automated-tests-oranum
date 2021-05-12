const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://www.oranum.com/en/new',
      show: true,
      browser: 'chromium',
      waitForAction: 3000
    }
  },
  include: {
    I: './steps/steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'automated-tests-oranum',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}