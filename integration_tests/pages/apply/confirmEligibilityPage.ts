import { Cas2Application as Application } from '../../../server/@types/shared/models/Cas2Application'
import ApplyPage from './applyPage'

export default class ConfirmEligibilityPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Is ${application.person.name} eligible for Short-Term Accommodation (CAS-2)`,
      application,
      'confirm-eligibility',
      'confirm-eligibility',
    )
  }
}
