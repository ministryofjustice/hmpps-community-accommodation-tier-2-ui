import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
  allowlist: {
    'node_modules/cypress@13.8.1': 'ALLOW',
    'node_modules/dtrace-provider@0.8.8': 'ALLOW',
    'node_modules/fsevents@2.3.3': 'ALLOW',
    'node_modules/playwright/node_modules/fsevents@2.3.2': 'ALLOW',
    'node_modules/unrs-resolver@1.11.1': 'ALLOW',
  },
})
