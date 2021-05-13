exports.config = {
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://www.oranum.com/en/new',
      show: true,
      browser: 'chromium',
      waitForAction: 3000,
      waitForSelector: 3000,
    }
  },
  include: {
    I: './steps/steps_file.js'
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.js',
    './step_definitions/search.js',
    './step_definitions/signUp.js',
    './step_definitions/filterByTopics.js']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    }
  },
  tests: './tests/*_test.js',
  name: 'automated-tests-oranum'
}