import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import ApplyPage from '../../applyPage'

export default class MaritalStatusPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `What is ${nameOrPlaceholderCopy(application.person)}'s legal marital or registered civil partnership status?`,
      application,
      'equality-and-diversity-monitoring',
      'marital-status',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'equality-and-diversity-monitoring',
        page: 'marital-status',
      }),
    )
  }
}
