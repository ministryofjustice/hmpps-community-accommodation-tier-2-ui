//  Feature: Referrer completes 'Health needs: guidance' page
//    So that I can complete the first page of the "Health needs" task
//    As a referrer
//    I want to confirm that I've understood the guidance on that page
//
//  Scenario: Follows link from task list
//    Given there is a section with a task
//    And an application exists
//    And I am logged in
//    And I am viewing the application task list
//
//  Scenario: view "health needs" task status
//    Then I see that the "health needs" task has not been started
//
//  Scenario: reads "health needs guidance" page
//    When I follow the link to the first page in the "Risks and needs" section
//    Then I see the "health needs guidance" page
//
//  Scenario: continues to next page in "health needs" task
//    When I continue to the next task/page
//    Then I should be on the substance misuse page

import SubstanceMisusePage from '../../../../pages/apply/risks_and_needs/health-needs/substanceMisusePage'
import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import HealthNeedsGuidancePage from '../../../../pages/apply/risks_and_needs/health-needs/healthNeedsGuidancePage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "Risks and needs" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['health-needs'] = {}
      const application = applicationFactory.build({
        id: 'abc123',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('application')
    })
  })

  beforeEach(function test() {
    // And an application exists
    // -------------------------
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    // Given I am logged in
    //---------------------
    cy.signIn()

    // And I am viewing the application
    // --------------------------------
    cy.visit('applications/abc123')
    Page.verifyOnPage(TaskListPage)
  })

  // Scenario: view task status
  // ----------------------------------------------
  it('shows the task listed within the section', () => {
    // I see that the task has not been started
    const taskListPage = Page.verifyOnPage(TaskListPage)
    taskListPage.shouldShowTaskStatus('health-needs', 'Not yet started')
  })

  //  Scenario: reads "health needs guidance" page
  //    When I follow the link to the first page in the "Risks and needs" section
  //    Then I see the "health needs guidance" page
  it('provides the expected guidance content', function test() {
    const taskListPage = Page.verifyOnPage(TaskListPage)

    //  When I follow the link to the first page in the "Risks and needs" section
    taskListPage.visitTask('Add health needs')

    //  Then I see the "health needs guidance" page
    const page = Page.verifyOnPage(HealthNeedsGuidancePage, this.application)
    page.hasCaption()
    page.hasGuidance()
    page.hasIntroduceYourselfTemplate()
    page.hasHealthQuestionsTemplate()
    page.hasDrugAndAlcoholQuestionsTemplate()

    page.copyIntroduceYourselfTemplateToClipboard()
    page.copyHealthQuestionsTemplateToClipboard()
    page.copyDrugAndAlcoholTemplateToClipboard()
  })

  //  Scenario: continues to next page in "health needs" task
  //    When I continue to the next task/page
  //    Then I should be on the substance misuse page
  it('links back to the substance misuse page', function test() {
    const taskListPage = new TaskListPage(this.application.person.name)
    taskListPage.visitTask('Add health needs')

    // When I continue to the next task/page
    const page = new HealthNeedsGuidancePage(this.application)
    page.clickSubmit('Continue')

    //  Then I should be on the substance misuse page
    Page.verifyOnPage(SubstanceMisusePage, this.application)
  })
})
