// eslint-disable import/no-unresolved,global-require
/* istanbul ignore file */

import fs from 'fs'

function getBuild() {
  try {
    // eslint-disable-next-line import/no-unresolved,global-require,@typescript-eslint/no-require-imports
    return require('../build-info.json')
  } catch (ex) {
    return null
  }
}

const packageData = JSON.parse(fs.readFileSync('./package.json').toString())

const { buildNumber, gitRef } = getBuild() || {
  buildNumber: packageData.version,
  gitRef: 'unknown',
}

export default { buildNumber, gitRef, packageData }
