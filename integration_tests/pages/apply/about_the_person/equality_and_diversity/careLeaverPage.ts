import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import paths from '../../../../../server/paths/apply'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import ApplyPage from '../../applyPage'

export default class CareLeaverPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Is ${nameOrPlaceholderCopy(application.person)} a care leaver?`,
      application,
      'equality-and-diversity-monitoring',
      'care-leaver',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'equality-and-diversity-monitoring',
        page: 'care-leaver',
      }),
    )
  }
}
