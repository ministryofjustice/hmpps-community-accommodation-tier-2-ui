import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'

export default class AcctPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super('Assessment, Care in Custody and Teamwork (ACCT)', application, 'risk-to-self', 'acct')
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'risk-to-self',
        page: 'acct',
      }),
    )
  }
}
