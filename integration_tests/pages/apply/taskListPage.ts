import Page from '../page'

export default class TaskListPage extends Page {
  constructor() {
    super('CAS 2: Refer for Accommodation')
  }

  shouldShowAreaAndFundingSection = (): void => {
    cy.get('[data-section_name="Area and funding"]').within(() => {
      // And I see the expected SECTION
      cy.get('.app-task-list__section').contains('Area and funding')

      // And I see the expected TASK
      cy.get('.app-task-list__task-name').contains('Add funding information')
    })
  }

  shouldShowTaskStatus = (task: string, status: string): void => {
    cy.get(`#${task}-status`).should('contain', status)
  }
}
