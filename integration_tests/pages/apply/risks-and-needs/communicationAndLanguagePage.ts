import { Cas2Application as Application } from '../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../applyPage'
import paths from '../../../../server/paths/apply'

export default class CommunicationAndLanguagePage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Communication and language needs for ${application.person.name}`,
      application,
      'health-needs',
      'communication-and-language',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'health-needs',
        page: 'communication-and-language',
      }),
    )
  }
}