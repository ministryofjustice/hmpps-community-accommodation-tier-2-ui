import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import paths from '../../../../../server/paths/apply'

export default class BehaviourNotesDataPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super('Add a behaviour note', application, 'risk-of-serious-harm', 'behaviour-notes-data')
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'risk-of-serious-harm',
        page: 'behaviour-notes-data',
      }),
    )
  }

  addNote(): void {
    this.getTextInputByIdAndEnterDetails('behaviourDetail', 'some detail')
  }

  clickSubmit(): void {
    cy.get('button').contains('Save and add behaviour note').click()
  }

  clickAddAnother(): void {
    cy.get('button').contains('Save and add another').click()
  }

  assertFormisEmpty(): void {
    cy.get('#behaviourDetail').should('have.value', '')
  }
}
