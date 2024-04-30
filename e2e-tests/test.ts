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
  pomUser: [
    {
      name: 'CAS2 Pom E2ETester',
      username: process.env.CAS2_HMPPS_AUTH_USERNAME as string,
      password: process.env.CAS2_HMPPS_AUTH_PASSWORD as string,
    },
    { option: true },
  ],
  lcaUser: [
    {
      name: 'CAS2 Licence CA E2ETester',
      username: process.env.CAS2_LCA_USERNAME as string,
      password: process.env.CAS2_LCA_PASSWORD as string,
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
  miUser: [
    {
      name: 'MI User',
      username: process.env.CAS2_MI_USERNAME as string,
      password: process.env.CAS2_MI_PASSWORD as string,
    },
    { option: true },
  ],
})
