import { defineConfig } from 'cypress'
import { resetStubs } from './wiremock'
import auth from './integration_tests/mockApis/auth'
import tokenVerification from './integration_tests/mockApis/tokenVerification'
import person from './integration_tests/mockApis/person'
import applications from './integration_tests/mockApis/applications'
import submissions from './integration_tests/mockApis/submissions'
import referenceData from './integration_tests/mockApis/referenceData'
import assessments from './integration_tests/mockApis/assessments'

export default defineConfig({
  chromeWebSecurity: false,
  fixturesFolder: 'integration_tests/fixtures',
  screenshotsFolder: 'integration_tests/screenshots',
  trashAssetsBeforeRuns: true,
  downloadsFolder: 'integration_tests/downloads',
  video: true,
  videosFolder: 'integration_tests/videos',
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  taskTimeout: 70000,
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        log(...args) {
          // eslint-disable-next-line
          console.log(...args)
          return null
        },
        reset: resetStubs,
        ...auth,
        ...person,
        ...tokenVerification,
        ...applications,
        ...submissions,
        ...referenceData,
        ...assessments,
      })
    },
    baseUrl: 'http://localhost:3007',
    excludeSpecPattern: '**/!(*.cy).ts',
    specPattern: 'integration_tests/tests/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'integration_tests/support/index.ts',
  },
})
