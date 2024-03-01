//  Feature: Referrer views list of tasks for an in progress application with the previous question schema
//    So that I can continue with an application I started with the previous schema
//    As a referrer
//    I want to view see the relevant statuses on the tasks that have changed
//
//  Background:
//    Given I am logged in
//    And an in progress application with the previous schema exists
//    And all tasks prior to "Check your answers" are complete
//    And I'm on the applications dashboard
//
//  Scenario: view new tasks
//    When I click on my in progress application
//    Then I am taken to the HDC licence dates page
//    And when I complete this page
//    Then I am taken to the task list page
//    And I see the new tasks with their statuses

import { applicationFactory } from '../../../server/testutils/factories'
import Page from '../../pages/page'
import TaskListPage from '../../pages/apply/taskListPage'
import { fullPersonFactory } from '../../../server/testutils/factories/person'
import ListPage from '../../pages/apply/list'
import HDCLicenceDates from '../../pages/apply/before_you_start/hdc-licence-dates/hdcLicenceDates'

context('Visit task list', () => {
  const person = fullPersonFactory.build()

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationDataPreviousSchema.json').then(applicationData => {
      const application = applicationFactory.build({
        id: 'abc123',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('historicApplication')
    })

    cy.fixture('applicationDataPreviousSchema.json').then(applicationData => {
      const application = applicationFactory.build({
        id: 'abc123',
        person,
        data: {
          ...applicationData,
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
      })
      cy.wrap(application).as('historicApplicationWithNewHDCTaskData')
    })
  })

  beforeEach(function test() {
    // Given I am logged in
    //---------------------
    cy.signIn()

    //  And an in progress application with the previous schema exists
    //  And all tasks prior to "Check your answers" are complete
    // -------------------------
    cy.task('stubApplicationGet', { application: this.historicApplication })
    cy.task('stubApplicationUpdate', { application: this.historicApplication })

    //  And I'm on the applications dashboard
    cy.task('stubApplications', [this.historicApplication])
    cy.visit('/applications')
    Page.verifyOnPage(ListPage)
  })

  //  Scenario: view new tasks
  // ----------------------------------------------
  it('allows me to see new tasks', function test() {
    //  When I click on my in progress application
    cy.get('a').contains(person.name).click()

    //  Then I am taken to the HDC licence dates page
    const page = Page.verifyOnPage(HDCLicenceDates, this.historicApplication)

    //  And when I complete this page
    cy.task('stubApplicationGet', { application: this.historicApplicationWithNewHDCTaskData })
    page.completeForm()
    page.clickSubmit()

    //  Then I am taken to the task list page
    const taskListPage = Page.verifyOnPage(TaskListPage, person.name)

    //  And I see the new tasks with their statuses
    taskListPage.shouldShowTaskStatus('hdc-licence-dates', 'Completed')
    taskListPage.shouldShowTaskStatus('cpp-details-and-hdc-licence-conditions', 'Not yet started')
  })
})
