import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import { FullPerson } from '../../../../../server/@types/shared/models/FullPerson'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import Page from '../../../page'

export default class ConsentRefusedPage extends Page {
  constructor(private readonly application: Application) {
    const person = application.person as FullPerson
    super(`${nameOrPlaceholderCopy(application.person, 'The person')} has not given their consent`, person.name)
  }

  hasGuidance(): void {
    cy.contains('has not given their consent so you cannot apply for Short-Term Accommodation (CAS-2) on their behalf')
  }

  hasLinkToChangeAnswer(): void {
    cy.contains('Change consent answer').should(
      'have.attr',
      'href',
      paths.applications.pages.show({
        id: this.application.id,
        task: 'confirm-consent',
        page: 'confirm-consent',
      }),
    )
  }

  chooseToChangeAnswer(): void {
    cy.get('a').contains('Change consent answer').click()
  }

  startANewApplication(): void {
    cy.get('a').contains('Search for a different applicant').click()
  }
}
