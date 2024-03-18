import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class BehaviourNotesPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Behaviour notes for ${nameOrPlaceholderCopy(application.person)}`,
      application,
      'risk-of-serious-harm',
      'behaviour-notes',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'risk-of-serious-harm',
        page: 'behaviour-notes',
      }),
    )
  }

  addABehaviourNote(): void {
    cy.get('a').contains('Add a behaviour note').click()
  }

  hasListOfBehaviourNotes(): void {
    cy.get('.govuk-summary-list').should('contain.html', 'some detail<br>some more detail on another line')
  }

  hasNoBehaviourNotes(): void {
    cy.get('.govuk-body').contains('No behaviour notes have been added.')
  }
}
