import { test as base } from '@playwright/test'

import { TestOptions } from './testOptions'

export const test = base.extend<TestOptions>({
  person: [
    {
      name: 'Ben Davies',
      crn: 'X371199',
      nomsNumber: 'A7779DY',
    },
    { option: true },
  ],
  user: [
    {
      name: 'Approved Premises E2ETester',
      username: process.env.CAS2_HMPPS_AUTH_USERNAME as string,
      password: process.env.CAS2_HMPPS_AUTH_PASSWORD as string,
    },
    { option: true },
  ],
  adminUser: [
    {
      name: 'CAS2 admin',
      username: process.env.CAS2_ADMIN_USERNAME as string,
      password: process.env.CAS2_ADMIN_PASSWORD as string,
    },
    { option: true },
  ],
  assessorUser: [
    {
      name: 'CAS2 assessor',
      username: process.env.CAS2_ASSESSOR_USERNAME as string,
      password: process.env.CAS2_ASSESSOR_PASSWORD as string,
    },
    { option: true },
  ],
})
