//  Feature: Assessor updates a submitted application's status
//    So that I can assess a submitted application
//    As an external NACRO assessor
//    I want to update the status of a particular submitted application
//
//  Scenario: updates application status
//    Given a submitted application exists
//    And I am logged in as a NACRO assessor
//    When I visit the update status page for that application
//    And I choose a status update and continue
//    Then I am redirected to the application overview page
//
//  Scenario: answer is enforced
//    When I visit the update status page
//    And I press continue
//    Then I see that an answer is enforced

import { submittedApplicationFactory } from '../../../server/testutils/factories/index'
import UpdateApplicationStatusPage from '../../pages/assess/updateApplicationStatusPage'
import SubmittedApplicationOverviewPage from '../../pages/assess/submittedApplicationOverviewPage'
import Page from '../../pages/page'

context("Assessor updates a submitted application's status", () => {
  const submittedApplication = submittedApplicationFactory.build()

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAssessorUser')
    cy.task('stubGetApplicationStatuses')
  })

  beforeEach(() => {
    // Given a submitted application exists
    cy.task('stubSubmittedApplicationGet', { application: submittedApplication })

    // And I am logged in as a NACRO assessor
    cy.signIn()
  })

  //  Scenario: updates application status
  // ----------------------------------------------
  it('allows me to update application status', () => {
    // When I visit the update status page for that application
    const page = UpdateApplicationStatusPage.visit(submittedApplication)

    // And I choose a status update and continue
    page.checkRadioByNameAndValue('newStatus', 'moreInfoRequested')
    cy.task('stubCreateApplicationStatusUpdate', { application: submittedApplication })
    page.clickSubmit()

    // Then I am redirected to the application overview page
    Page.verifyOnPage(SubmittedApplicationOverviewPage, submittedApplication)
  })

  //  Scenario: answer is enforced
  // ----------------------------------------------
  it('answer is enforced', () => {
    // When I visit the update status page for that application
    const page = UpdateApplicationStatusPage.visit(submittedApplication)

    // And I press continue
    cy.task('stubCreateApplicationStatusUpdateBadRequest', { application: submittedApplication })
    page.clickSubmit()

    // Then I see that an answer is enforced
    page.shouldShowErrorMessagesForFields(['newStatus'])
  })
})
