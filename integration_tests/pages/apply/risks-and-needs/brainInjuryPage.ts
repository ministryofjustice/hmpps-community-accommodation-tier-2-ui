import { Cas2Application as Application } from '../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../applyPage'
import paths from '../../../../server/paths/apply'

export default class BrainInjuryPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(`Brain injury needs for ${application.person.name}`, application, 'health-needs', 'brain-injury')
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'health-needs',
        page: 'brain-injury',
      }),
    )
  }
}
