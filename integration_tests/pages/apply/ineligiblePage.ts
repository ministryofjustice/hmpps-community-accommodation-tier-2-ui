import { Cas2Application as Application } from '../../../server/@types/shared/models/Cas2Application'
import Page from '../page'
import paths from '../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../server/utils/utils'
import { FullPerson } from '../../../server/@types/shared/models/FullPerson'

export default class IneligiblePagePage extends Page {
  constructor(private readonly application: Application) {
    const person = application.person as FullPerson
    super(
      `${nameOrPlaceholderCopy(application.person, 'The person')} is not eligible for CAS-2 accommodation`,
      person.name,
    )
  }

  hasGuidance(): void {
    cy.contains('should refer them to the regional Commissioned Rehabilitative Services provider')
  }

  hasLinkToChangeAnswer(): void {
    cy.contains('Change eligibility answer').should(
      'have.attr',
      'href',
      paths.applications.pages.show({
        id: this.application.id,
        task: 'confirm-eligibility',
        page: 'confirm-eligibility',
      }),
    )
  }

  chooseToChangeAnswer(): void {
    cy.get('a').contains('Change eligibility answer').click()
  }

  startANewApplication(): void {
    cy.get('a').contains('Search for a different applicant').click()
  }
}
