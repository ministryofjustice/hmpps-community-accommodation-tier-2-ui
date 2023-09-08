//  Feature: Referrer completes 'Risk of serious harm: OASys import' page
//    So that I can complete the first page of the "Risk of serious harm" task
//    As a referrer
//    I want to complete the OASys import page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am viewing the application
//
//  Scenario: view "risk of serious harm" task status
//    Then I see that the "risk of serious harm" task has not been started
//
//  Scenario: view OASys import guidance
//    When I follow the link to the first page in the "Risk of serious harm" section
//    Then I see the 'Risk of serious harm: OASys import' page
//
//  Scenario: navigate to next page in "Risk of serious harm" task
//    When I continue to the next page
//    Then I see the "RoSH summary" page

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import OasysImportPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/oasysImportPage'
import RoshSummaryPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/roshSummaryPage'

context('Visit "Risks and needs" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['risk-of-serious-harm'] = {}
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
  })

  //  Scenario: view "risk of serious harm" task status
  // ----------------------------------------------
  it('shows the task listed within the section', function test() {
    // Then I see that the "risk of serious harm" task has not been started
    const taskListPage = Page.verifyOnPage(TaskListPage)
    taskListPage.shouldShowTaskStatus('risk-of-serious-harm', 'Not started')
  })

  //  Scenario: view OASys import guidance
  // ----------------------------------------------
  it('presents the OASys import page', function test() {
    const taskListPage = Page.verifyOnPage(TaskListPage)

    //  When I follow the link to the first page in the "Risk of serious harm" section
    taskListPage.visitTask('Review risk of serious harm (RoSH) information')

    //  Then I see the 'Risk of serious harm: OASys import' page
    Page.verifyOnPage(OasysImportPage, this.application)
  })

  //  Scenario: navigate to next page in "Risk of serious harm" task
  // ----------------------------------------------
  it('links to the RoSH summary page', function test() {
    //  When I continue to the next page
    OasysImportPage.visit(this.application)
    const page = Page.verifyOnPage(OasysImportPage, this.application)
    page.clickSubmit()

    //  Then I see the "RoSH summary" page
    Page.verifyOnPage(RoshSummaryPage, this.application)
  })
})
