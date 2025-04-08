import { defineConfig, devices } from '@playwright/test'
import { config } from 'dotenv'
import { TestOptions } from './e2e-tests/testOptions'

config({
  path: `e2e.env`,
  override: true,
})

export default defineConfig<TestOptions>({
  testDir: './e2e-tests/tests',
  outputDir: './e2e-tests/test_results',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  maxFailures: 1,
  workers: 1,
  reporter: [['html', { outputFolder: './e2e-tests/playwright-report/index.html' }]],
  timeout: process.env.CI ? 5 * 60 * 1000 : 2 * 60 * 1000,
  use: {
      trace: 'retain-on-failure',
      video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'setupDev',
      testMatch: /.*\.setup\.ts/,
      use: { baseURL: 'https://community-accommodation-tier-2-dev.hmpps.service.justice.gov.uk' },
    },
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://community-accommodation-tier-2-dev.hmpps.service.justice.gov.uk',
      },
      dependencies: ['setupDev'],
    },
    {
      name: 'setupLocal',
      testMatch: /.*\.setup\.ts/,
      use: {
        baseURL: 'http://localhost:3000',
      },
    },
    {
      name: 'local',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:3000',
      },
      dependencies: ['setupLocal'],
    },
  ],
})
