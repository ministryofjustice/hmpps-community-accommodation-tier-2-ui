//  Feature: Referrer completes 'HDC licence dates' page
//    So that I can complete the "HDC licence dates" task
//    As a referrer
//    I want to complete the 'HDC licence dates' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I have confirmed the user is eligible for CAS-2 and has given consent
//    And I'm now faced with the 'HDC licence dates' page
//
//  Scenario: navigate to task list page
//    When I complete the "HDC licence dates" page
//    And I continue to the next task / page
//    Then I am taken to the task list
//    And I see that the HDC licence dates task is complete
//
//  Scenario: navigate to warning page
//    When I complete the "HDC licence dates" page
//    And the current date is within 21 days of the CRD
//    And I continue to the next task / page
//    Then I am taken to the HDC warning page
//    And I can continue the application
//    Then I am taken to the task list page
//    And I see that the HDC licence dates task is complete
//
//  Scenario: date is pre-populated
//    When there is existing data for 'HDC licence dates' in the application
//    Then I see the dates on the page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import HDCLicenceDatesPage from '../../../../pages/apply/before_you_start/hdc-licence-dates/hdcLicenceDates'
import HDCWarningPage from '../../../../pages/apply/before_you_start/hdc-licence-dates/hdcWarningPage'
import paths from '../../../../../server/paths/apply'
import TaskListPage from '../../../../pages/apply/taskListPage'
import { getTodaysDatePlusMonthsAndDays } from '../../../../../server/utils/dateUtils'

context('Visit "HDC licence dates" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  const application = applicationFactory.build({
    id: 'abc123',
    person,
  })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['hdc-licence-dates']
      cy.wrap({ ...application, data: applicationData }).as('application')
    })

    cy.fixture('applicationData.json').then(applicationData => {
      cy.wrap({ ...application, data: applicationData }).as('applicationWithData')
    })

    cy.wrap({
      ...application,
      data: {
        'confirm-eligibility': {
          'confirm-eligibility': {
            isEligible: 'yes',
          },
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
      },
    }).as('applicationWithEligibilityAndConsent')
  })

  beforeEach(function test() {
    // And an application exists
    // -------------------------
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    // Given I am logged in
    //---------------------
    cy.signIn()

    // And I have confirmed the user is eligible for CAS-2 and has given consent
    cy.task('stubApplicationGet', { application: this.applicationWithEligibilityAndConsent })
    cy.visit(paths.applications.show({ id: 'abc123' }))

    // And I'm now faced with the 'HDC licence dates' page
    Page.verifyOnPage(HDCLicenceDatesPage, this.applicationWithEligibilityAndConsent)
  })

  //  Scenario: navigate to next page
  // ----------------------------------------------
  it('navigates to the task list page', function test() {
    // When I complete the "HDC licence dates" page
    const page = Page.verifyOnPage(HDCLicenceDatesPage, this.application)
    page.completeForm()

    // after submission of the valid form the API will return the answered question
    // -- note that it this case the value must be yes or no to indicate that the
    //    'Confirm consent' task is complete
    cy.task('stubApplicationGet', { application: this.applicationWithData })

    // When I continue to the next task / page
    page.clickSubmit()

    // Then I am taken to the task list
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // And I see that the HDC licence dates task is complete
    taskListPage.shouldShowTaskStatus('hdc-licence-dates', 'Completed')
  })

  //  Scenario: navigate to warning page
  // ----------------------------------------------
  it('navigates to the warning page', function test() {
    // When I complete the "HDC licence dates" page
    // And the current date is within 21 days of the CRD
    const page = Page.verifyOnPage(HDCLicenceDatesPage, this.application)

    const hdcEligibilityDate = getTodaysDatePlusMonthsAndDays().formattedDate
    const conditionalReleaseDate = getTodaysDatePlusMonthsAndDays(0, 20).formattedDate

    page.completeForm(hdcEligibilityDate, conditionalReleaseDate)

    // after submission of the valid form the API will return the answered question
    // -- note that it this case the value must be yes or no to indicate that the
    //    'Confirm consent' task is complete
    cy.task('stubApplicationGet', { application: this.applicationWithData })

    // When I continue to the next task / page
    page.clickSubmit()

    // Then I am taken to the HDC warning page
    const warningPage = Page.verifyOnPage(HDCWarningPage, this.application)

    // And when I continue the application
    warningPage.clickSubmit('Accept and continue')

    // Then I am taken to the task list page
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // And I see that the HDC licence dates task is complete
    taskListPage.shouldShowTaskStatus('hdc-licence-dates', 'Completed')
  })

  //  Scenario: date is pre-populated
  // ----------------------------------------------
  it('pre-populates date inputs', function test() {
    // When there is existing data for 'HDC licence dates' in the application
    const hdcEligibilityDate = getTodaysDatePlusMonthsAndDays()
    const conditionalReleaseDate = getTodaysDatePlusMonthsAndDays(2)

    const HDCApplicationData = {
      'hdc-licence-dates': {
        'hdc-licence-dates': {
          hdcEligibilityDate: hdcEligibilityDate.formattedDate,
          'hdcEligibilityDate-year': hdcEligibilityDate.year,
          'hdcEligibilityDate-month': hdcEligibilityDate.month,
          'hdcEligibilityDate-day': hdcEligibilityDate.day,
          conditionalReleaseDate: conditionalReleaseDate.formattedDate,
          'conditionalReleaseDate-year': conditionalReleaseDate.year,
          'conditionalReleaseDate-month': conditionalReleaseDate.month,
          'conditionalReleaseDate-day': conditionalReleaseDate.day,
        },
      },
    }
    cy.task('stubApplicationGet', { application: { data: { ...HDCApplicationData } } })
    HDCLicenceDatesPage.visit(this.applicationWithData)

    // Then I see the dates on the page
    const page = Page.verifyOnPage(HDCLicenceDatesPage, this.applicationWithData)
    page.shouldShowPrepopulatedDates()
  })
})
