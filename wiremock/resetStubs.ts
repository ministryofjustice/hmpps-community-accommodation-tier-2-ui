/* eslint-disable no-console */

import { resetStubs } from './index'

console.log('Resetting stubs')

resetStubs().then(_response => {
  console.log('Done!')
})
