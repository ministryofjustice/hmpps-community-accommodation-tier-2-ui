import { Cas2SubmittedApplication as SubmittedApplication, FullPerson } from '@approved-premises/api'
import Page from '../page'
import { assessmentHasExistingData } from '../../../server/utils/assessmentUtils'

export default class AddAssessmentDetailsPage extends Page {
  constructor(private readonly application: SubmittedApplication) {
    const person = application.person as FullPerson
    const title = assessmentHasExistingData(application.assessment)
      ? 'Change assessment details'
      : 'Add assessment details'

    super(title, person.name)
  }

  static visit(application: SubmittedApplication): AddAssessmentDetailsPage {
    cy.visit(`/assess/applications/${application.id}/assessment-details`)
    return new AddAssessmentDetailsPage(application)
  }

  addAssessorName(name: string) {
    this.getTextInputByIdAndEnterDetails('assessorName', name)
  }

  addNacroReferralId(id: string) {
    this.getTextInputByIdAndEnterDetails('nacroReferralId', id)
  }

  saveAssessmentDetails() {
    this.clickSubmit('Save details')
  }
}
