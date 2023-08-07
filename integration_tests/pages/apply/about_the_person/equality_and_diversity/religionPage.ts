import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import paths from '../../../../../server/paths/apply'
import ApplyPage from '../../applyPage'

export default class ReligionPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `What is ${application.person.name}'s religion?`,
      application,
      'equality-and-diversity-monitoring',
      'religion',
    )
  }

  selectReligion(): void {
    this.checkRadioByNameAndValue('religion', 'atheist')
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'equality-and-diversity-monitoring',
        page: 'religion',
      }),
    )
  }
}
