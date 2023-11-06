//  Feature: Assessor views a submitted application overview
//    So that I can assess a submitted application
//    As an external NACRO assessor
//    I want to view the overview of a particular submitted application
//
//  Scenario: visits submitted application overview page
//    Given a submitted application exists
//    And I am logged in as a NACRO assessor
//    When I visit the application overview for that application
//    Then I see the submitted application overview

import { submittedApplicationFactory } from '../../../server/testutils/factories/index'
import SubmittedApplicationOverviewPage from '../../pages/assess/submittedApplicationOverviewPage'

context('Assessor views a submitted application overview', () => {
  const submittedApplication = submittedApplicationFactory.build()

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAssessorUser')
  })

  beforeEach(() => {
    // Given a submitted application exists
    cy.task('stubSubmittedApplicationGet', { application: submittedApplication })
  })

  //  Scenario: visits submitted application overview page
  // ----------------------------------------------
  it('displays submitted application overview', () => {
    // And I am logged in as a NACRO assessor
    cy.signIn()

    // When I visit the application overview for that application
    const page = SubmittedApplicationOverviewPage.visit(submittedApplication)

    // Then I see the submitted application overview
    page.shouldShowApplicationSummaryDetails(submittedApplication)
  })
})
