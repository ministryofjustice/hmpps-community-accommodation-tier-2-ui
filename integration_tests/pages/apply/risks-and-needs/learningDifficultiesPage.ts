import { Cas2Application as Application } from '../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../applyPage'
import paths from '../../../../server/paths/apply'
import { pageIsActiveInNavigation } from './utils'

export default class LearningDifficultiesPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Learning difficulties and neurodiversity for ${application.person.name}`,
      application,
      'health-needs',
      'learning-difficulties',
    )

    pageIsActiveInNavigation('Learning difficulties')
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'health-needs',
        page: 'learning-difficulties',
      }),
    )
  }
}
