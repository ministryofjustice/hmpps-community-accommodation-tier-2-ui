import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import paths from '../../../../../server/paths/apply'
import ApplyPage from '../../applyPage'

export default class MilitaryVeteranPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Is ${application.person.name} a military veteran?`,
      application,
      'equality-and-diversity-monitoring',
      'military-veteran',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'equality-and-diversity-monitoring',
        page: 'military-veteran',
      }),
    )
  }
}
