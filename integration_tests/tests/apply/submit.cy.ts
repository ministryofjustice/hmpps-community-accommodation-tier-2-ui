//  Feature: Referrer submits an application
//
//  Scenario: submit an application
//    Given I am logged in
//    And I have created an appliation
//    And I am on the Task List
//    When I click submit
//    Then I should see a confirmation page

import ApplicationSubmittedPage from '../../pages/apply/applicationSubmittedPage'
import Page from '../../pages/page'
import TaskListPage from '../../pages/apply/taskListPage'
import { applicationFactory, personFactory } from '../../../server/testutils/factories'

context('Applications dashboard', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    // I have created an application
    cy.fixture('applicationData.json').then(applicationData => {
      const person = personFactory.build({})
      const application = applicationFactory.build({
        id: 'abc123',
        data: applicationData,
        status: 'inProgress',
        person,
      })
      cy.wrap(application).as('application')
    })

    // Given I am logged in
    cy.signIn()
  })

  //  Scenario: submit an application
  // ----------------------------------------------
  it('shows the dashboard', function test() {
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationSubmit', {})

    // I visit the Task List Page
    const page = TaskListPage.visit(this.application)

    // And I click submit
    page.clickSubmit('Submit application')

    // And I see a confirmation page
    const applicationSubmittedPage = Page.verifyOnPage(ApplicationSubmittedPage, this.application)
    applicationSubmittedPage.shouldShowApplicationDetails()
    applicationSubmittedPage.shouldShowLinkToFeedbackSurvey()
  })
})
