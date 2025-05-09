//  Feature: Referrer cancels an in progress application
//    So that I can remove application data
//    As a referrer
//    I want to be able to cancel in progress applications
//
//  Scenario: choose to cancel application
//      Given I am on the Dashboard page
//      When I confirm that I want to cancel
//      Then I am taken to the referrer's dashboard
//      And I see a success message
//
//  Scenario: choose not to cancel application
//      Given I am on the Dashboard page
//      When I go to cancel an application
//      Then decide not to
//      Then I am taken to the referrer's dashboard
//
//  Scenario: Bad Request error when cancelling an application
//      Given I am on the Dashboard page
//      When I confirm that I want to cancel
//      And there is a Bad Request error from the API
//      Then I am taken to the referrer's dashboard
//      And I see an error message

import CancelPage from '../../pages/apply/cancelPage'
import { applicationFactory, applicationSummaryFactory } from '../../../server/testutils/factories/index'
import Page from '../../pages/page'
import { fullPersonFactory } from '../../../server/testutils/factories/person'
import ListPage from '../../pages/apply/list'

context('Cancel an in progress application', () => {
  const person = fullPersonFactory.build({ name: 'Roger Smith', nomsNumber: '123' })
  const application = applicationFactory.build({
    id: 'abc123',
    data: {
      'confirm-eligibility': {
        'confirm-eligibility': { isEligible: 'yes' },
      },
      'confirm-consent': {
        'confirm-consent': {
          hasGivenConsent: 'yes',
          consentDate: '2023-01-01',
          'consentDate-year': '2023',
          'consentDate-month': '1',
          'consentDate-day': '1',
        },
      },
      'hdc-licence-dates': {
        'hdc-licence-dates': {
          hdcEligibilityDate: '2024-02-28',
          'hdcEligibilityDate-year': '2024',
          'hdcEligibilityDate-month': '2',
          'hdcEligibilityDate-day': '28',
          conditionalReleaseDate: '2024-02-22',
          'conditionalReleaseDate-year': '2024',
          'conditionalReleaseDate-month': '2',
          'conditionalReleaseDate-day': '22',
        },
      },
    },
    person,
  })
  const inProgressApplicationSummaries = applicationSummaryFactory.buildList(1, {
    id: application.id,
    status: 'inProgress',
    latestStatusUpdate: null,
  })

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  beforeEach(() => {
    // Given I am logged in
    cy.signIn()

    cy.task('stubFindPerson', { person })
    cy.task('stubApplicationAbandon', { application })
    cy.task('stubApplications', { applications: inProgressApplicationSummaries, assignmentType: 'IN_PROGRESS' })
    cy.task('stubApplications', { applications: [], assignmentType: 'PRISON' })
    cy.task('stubApplications', { applications: [], assignmentType: 'DEALLOCATED' })
    cy.task('stubApplicationGet', { application })
  })

  //  Scenario: cancel an application
  // ----------------------------------------------
  it('Takes user back to the Task List after cancelling', () => {
    //      Given I am on the Dashboard page
    const dashboardPage = ListPage.visit(inProgressApplicationSummaries)
    dashboardPage.clickCancel()

    const cancelPage = Page.verifyOnPage(CancelPage, application)
    cancelPage.hasGuidance()
    cancelPage.chooseYesOption()
    cancelPage.clickSubmit('Confirm')

    //      Then I am taken back to the Dashboard
    Page.verifyOnPage(ListPage, inProgressApplicationSummaries)

    //      And I see a success message
    dashboardPage.shouldShowSuccessMessage(`The application for Roger Smith has been cancelled.`)
  })

  //  Scenario: choose not to cancel application
  it('Takes user back to the Task List after choosing not to cancel', () => {
    //      Given I am on the Dashboard page
    const dashboardPage = ListPage.visit(inProgressApplicationSummaries)
    //      When I go to cancel an application
    dashboardPage.clickCancel()

    //      Then decide not to
    const cancelPage = Page.verifyOnPage(CancelPage, application)
    cancelPage.hasGuidance()
    cancelPage.chooseNoOption()
    cancelPage.clickSubmit('Confirm')

    //      Then I am taken to the referrer's dashboard
    Page.verifyOnPage(ListPage, inProgressApplicationSummaries)
  })

  //  Scenario: Bad Request error when cancelling an application
  it('Takes user back to the Task List after choosing not to cancel', () => {
    //      Given I am on the Dashboard page
    const dashboardPage = ListPage.visit(inProgressApplicationSummaries)
    //      When I go to cancel an application
    dashboardPage.clickCancel()

    //      When I confirm that I want to cancel
    //      And there is a Bad Request error from the API
    cy.task('stubApplicationAbandonBadRequest', { application })
    const cancelPage = Page.verifyOnPage(CancelPage, application)
    cancelPage.hasGuidance()
    cancelPage.chooseYesOption()
    cancelPage.clickSubmit('Confirm')

    //      Then I am taken to the referrer's dashboard
    Page.verifyOnPage(ListPage, inProgressApplicationSummaries)

    //      And I see an error message
    dashboardPage.shouldShowErrorSummaryForId(
      `cancel-${application.id}`,
      'There was an error cancelling the application.',
    )
  })
})
