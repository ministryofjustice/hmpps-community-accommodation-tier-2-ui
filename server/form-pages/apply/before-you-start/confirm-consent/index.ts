/* istanbul ignore file */

import { Task } from '../../../utils/decorators'
import ConfirmConsentPage from './confirmConsent'

@Task({
  name: 'Confirm consent to share information',
  slug: 'confirm-consent',
  pages: [ConfirmConsentPage],
})
export default class ConfirmConsent {}
