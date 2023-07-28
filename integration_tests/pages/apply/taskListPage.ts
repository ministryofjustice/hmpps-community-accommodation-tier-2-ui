import Page from '../page'
import Apply from '../../../server/form-pages/apply'

export default class TaskListPage extends Page {
  constructor() {
    super('CAS 2: Refer for Accommodation')
  }

  shouldShowTasksWithinTheirSections = (): void => {
    Apply.sections.forEach(section => {
      cy.get(`[data-section_name="${section.title}"]`).within(() => {
        // And I see the expected SECTION
        cy.get('.app-task-list__section').contains(section.title)

        // And I see each expected TASK
        section.tasks.forEach(task => {
          cy.get('.app-task-list__task-name').contains(task.title)
        })
      })
    })
  }

  shouldShowTaskStatus = (task: string, status: string): void => {
    cy.get(`#${task}-status`).should('contain', status)
  }
}
