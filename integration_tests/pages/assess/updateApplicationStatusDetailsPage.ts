import { Cas2SubmittedApplication as SubmittedApplication } from '@approved-premises/api'
import { getStatusDetailQuestionText } from '../../../server/utils/assessUtils'
import { kebabToCamelCase } from '../../../server/utils/utils'
import Page from '../page'

export default class UpdateApplicationStatusDetailsPage extends Page {
  constructor(
    private readonly application: SubmittedApplication,
    statusName: string,
  ) {
    super(getStatusDetailQuestionText(statusName), undefined)
  }

  static visit(
    application: SubmittedApplication,
    submittedApplicationStatusName: string,
  ): UpdateApplicationStatusDetailsPage {
    cy.visit(
      `/assess/applications/${application.id}/update-status/further-information/${submittedApplicationStatusName}`,
    )
    return new UpdateApplicationStatusDetailsPage(application, kebabToCamelCase(submittedApplicationStatusName))
  }

  shouldShowCurrentApplicationStatus(): void {
    const status = this.application.assessment?.statusUpdates
      ? this.application.assessment.statusUpdates[0].label
      : 'Received'
    cy.get('p').contains(`Current status: ${status}`)
  }

  unCheckAllAnswers(): void {
    cy.get('')
  }
}
