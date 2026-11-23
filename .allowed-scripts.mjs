import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist'

export default configureAllowedScripts({
  allowlist: {
    'node_modules/@parcel/watcher@2.6.0': 'ALLOW',
    'node_modules/cypress@15.21.2': 'ALLOW',
    'node_modules/dtrace-provider@0.8.8': 'ALLOW',
    'node_modules/fsevents@2.3.3': 'ALLOW',
  },
})
