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
//
//  Scenario: navigate to application overview
//    When I visit the update status page
//    And I click 'Back to application overview'
//    Then I am sent to the application overview page
//
//  Scenario: navigate back to application view
//    When I visit the application view page
//    And I click 'Update application status'
//    Then I am on the update application status page
//    And I click the back button
//    Then I am on the application view page

import { submittedApplicationFactory } from '../../../server/testutils/factories/index'
import UpdateApplicationStatusPage from '../../pages/assess/updateApplicationStatusPage'
import SubmittedApplicationOverviewPage from '../../pages/assess/submittedApplicationOverviewPage'
import Page from '../../pages/page'
import SubmittedApplicationPage from '../../pages/assess/submittedApplicationPage'

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

  //  Scenario: updates application status
  // ----------------------------------------------
  it('allows me to update application status', () => {
    // When I visit the update status page for that application
    const page = UpdateApplicationStatusPage.visit(submittedApplication)
    page.shouldShowCurrentApplicationStatus()

    // And I choose a status update and continue
    page.checkRadioByNameAndValue('newStatus', 'awaitingDecision')
    cy.task('stubCreateAssessmentStatusUpdate', { application: submittedApplication })
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
    cy.task('stubCreateAssessmentStatusUpdateBadRequest', { application: submittedApplication })
    page.clickSubmit()

    // Then I see that an answer is enforced
    page.shouldShowErrorMessagesForFields(['newStatus'])
  })

  //  Scenario: navigate to application overview
  // ----------------------------------------------
  it('navigate to application overview', () => {
    // When I visit the update status page for that application
    const page = UpdateApplicationStatusPage.visit(submittedApplication)

    // And I click 'Back to application overview'
    page.clickLink('Back to application overview')

    // Then I am sent to the application overview page
    Page.verifyOnPage(SubmittedApplicationOverviewPage, submittedApplication)
  })

  //  Scenario: navigate back to application view
  // ----------------------------------------------
  it('navigate back to application view', () => {
    //    When I visit the application view page
    const page = SubmittedApplicationPage.visit(submittedApplication)

    //    And I click 'Update application status'
    page.clickLink('Update application status')

    //    Then I am on the update application status page
    const updateStatusPage = Page.verifyOnPage(UpdateApplicationStatusPage, submittedApplication)

    //    And I click the back button
    updateStatusPage.clickBack()

    //    Then I am on the application view page
    Page.verifyOnPage(SubmittedApplicationPage, submittedApplication)
  })
})
