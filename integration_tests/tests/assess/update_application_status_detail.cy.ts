//  Feature: Assessor updates a submitted application's status detail
//    So that I can assess a submitted application
//    As an external NACRO assessor
//    I want to update the status detail of a particular submitted application
//
//  Scenario: updates application status detail for more information requested
//    Given a submitted application exists
//    And I am logged in as a NACRO assessor
//    When I visit the update status page for that application
//    And I choose a status update and continue
//    Then I am redirected to the status detail page
//    And I choose a status detail and continue
//    Then I am redirected to the application overview page
//
//  Scenario: updates application status detail for referral cancelled
//    Given a submitted application exists
//    And I am logged in as a NACRO assessor
//    When I visit the update status page for that application
//    And I choose a status update and continue
//    Then I am redirected to the status detail page
//    And I choose a status detail and continue
//    Then I am redirected to the application overview page
//
//  Scenario: answer is enforced
//    When I visit the update status detail page
//    And I press continue
//    Then I see that an answer is enforced
//
//  Scenario: navigate to application overview
//    When I visit the update status detail page
//    And I click 'Back to application overview'
//    Then I am sent to the application overview page

import { submittedApplicationFactory } from '../../../server/testutils/factories/index'
import UpdateApplicationStatusPage from '../../pages/assess/updateApplicationStatusPage'
import SubmittedApplicationOverviewPage from '../../pages/assess/submittedApplicationOverviewPage'
import Page from '../../pages/page'
import UpdateApplicationStatusDetailsPage from '../../pages/assess/updateApplicationStatusDetailsPage'
import errorLookups from '../../../server/i18n/en/errors.json'

context("Assessor updates a submitted application's status", () => {
  const submittedApplication = submittedApplicationFactory.build({
    document: {
      sections: [
        {
          title: 'Section 1',
          tasks: [
            {
              title: 'Task 1',
              questionsAndAnswers: [
                {
                  question: 'a question',
                  answer: 'an answer',
                },
              ],
            },
          ],
        },
        {
          title: 'Section 2',
          tasks: [
            {
              title: 'Task 2',
              questionsAndAnswers: [
                {
                  question: 'a question',
                  answer: 'an answer',
                },
              ],
            },
          ],
        },
      ],
    },
  })

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

  //  Scenario: updates application status for more information requested
  // ----------------------------------------------
  it('allows me to update application status detail for more information requested', () => {
    // When I visit the update status page for that application
    const page = UpdateApplicationStatusPage.visit(submittedApplication)
    page.shouldShowCurrentApplicationStatus()

    // And I choose a status update and continue
    page.checkRadioByNameAndValue('newStatus', 'moreInfoRequested')
    cy.task('stubCreateApplicationStatusUpdate', { application: submittedApplication })
    page.clickSubmit()

    // Then I am redirected to the status detail page
    const statusDetailsPage = new UpdateApplicationStatusDetailsPage(submittedApplication, 'moreInfoRequested')
    statusDetailsPage.shouldShowCurrentApplicationStatus()

    // And I choose a status detail and continue
    statusDetailsPage.checkCheckboxByValue('healthNeeds')
    page.clickSubmit()

    // Then I am redirected to the application overview page
    Page.verifyOnPage(SubmittedApplicationOverviewPage, submittedApplication)
  })

  //  Scenario: updates application status for referral cancelled
  // ----------------------------------------------
  it('allows me to update application status detail for referral cancelled', () => {
    // When I visit the update status page for that application
    const page = UpdateApplicationStatusPage.visit(submittedApplication)
    page.shouldShowCurrentApplicationStatus()

    // And I choose a status update and continue
    page.checkRadioByNameAndValue('newStatus', 'cancelled')
    cy.task('stubCreateApplicationStatusUpdate', { application: submittedApplication })
    page.clickSubmit()

    // Then I am redirected to the status detail page
    const statusDetailsPage = new UpdateApplicationStatusDetailsPage(submittedApplication, 'cancelled')
    statusDetailsPage.shouldShowCurrentApplicationStatus()

    // And I choose a status detail and continue
    statusDetailsPage.checkRadioByNameAndValue('newStatusDetails', 'assessedAsHighRisk')
    page.clickSubmit()

    // Then I am redirected to the application overview page
    Page.verifyOnPage(SubmittedApplicationOverviewPage, submittedApplication)
  })

  //  Scenario: answer is enforced
  // ----------------------------------------------
  it('answer is enforced', () => {
    // When I visit the update status detail page for that application
    const page = UpdateApplicationStatusDetailsPage.visit(submittedApplication, 'more-info-requested')

    // And I uncheck all checkboxes
    page.uncheckAllCheckboxes()

    // // And I press continue
    cy.task('stubCreateApplicationStatusUpdate', { application: submittedApplication })
    page.clickSubmit()

    // // Then I see that an answer is enforced
    cy.get('.govuk-error-summary').should('contain', errorLookups.newStatusDetails.moreInfoRequested.empty)
    cy.get(`[data-cy-error-newStatusDetails]`).should('contain', errorLookups.newStatusDetails.moreInfoRequested.empty)
  })

  //  Scenario: navigate to application overview
  // ----------------------------------------------
  it('navigate to application overview', () => {
    // When I visit the update status page for that application
    const page = UpdateApplicationStatusDetailsPage.visit(submittedApplication, 'more-info-requested')

    // And I click 'Back to application overview'
    page.clickLink('Back to application overview')

    // Then I am sent to the application overview page
    Page.verifyOnPage(SubmittedApplicationOverviewPage, submittedApplication)
  })
})
