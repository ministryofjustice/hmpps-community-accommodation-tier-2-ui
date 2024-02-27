//  Feature: Assessor adds a note to a submitted application
//    So that I can communicate with referrers about a submitted application
//    As an assessor
//    I want to add a note to the application
//
//  Background:
//    Given a submitted application exists
//    And I am logged in as a assessor
//    When I visit the application overview for that application
//
//  Scenario: successfully add a note to an application
//    And I add a note
//    Then I see a success message
//
//  Scenario: fail to add a note to an application
//    And I add a note
//    Then I see an error message

import SubmittedApplicationOverviewPage from '../../pages/assess/submittedApplicationOverviewPage'
import { applicationNoteFactory, submittedApplicationFactory } from '../../../server/testutils/factories'
import Page from '../../pages/page'

context('Assessor adds a note to a submitted application', () => {
  const submittedApplication = submittedApplicationFactory.build({})

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAssessorUser')
  })

  beforeEach(() => {
    // Given a submitted application exists
    cy.task('stubSubmittedApplicationGet', { application: submittedApplication })

    // And I am logged in as a NACRO assessor
    cy.signIn()

    // When I visit the application overview for that application
    SubmittedApplicationOverviewPage.visit(submittedApplication)
  })

  //  Scenario: successfully add a note to an application
  it('shows a success message', function test() {
    //  And I add a note
    const note = applicationNoteFactory.build()
    const page = Page.verifyOnPage(SubmittedApplicationOverviewPage, submittedApplication)
    cy.task('stubAddNote', { applicationId: submittedApplication.id, note })
    page.addANote()

    //  Then I see a success message
    page.shouldShowSuccessMessage('Your note was saved.')
  })

  //  Scenario: fail to add a note to an application
  it('shows an error message', function test() {
    //  And I add a note
    const page = Page.verifyOnPage(SubmittedApplicationOverviewPage, submittedApplication)
    cy.task('stubAddNoteBadRequest', { applicationId: submittedApplication.id })
    page.addANote()

    //   Then I see an error message
    page.shouldShowErrorMessage()
  })
})
