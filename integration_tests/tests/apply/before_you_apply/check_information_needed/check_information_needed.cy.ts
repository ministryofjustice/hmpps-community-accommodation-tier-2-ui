//  Feature: Referrer completes 'Check information needed from applicant' task
//    So that I can complete the 'Check information needed from applicant' task
//    As a referrer
//    I want to answer questions on the 'Check information needed' page
//
//  Background:
//    Given I am logged in
//    And I'm on the 'Check information needed' page
//
//  Scenario: view 'Check information needed' page
//    Then I see the "Check information needed" page
//
//  Scenario: navigate to task list on completion of task
//    When I complete the "Check information needed" page
//    And I continue to the next task / page
//    Then I am taken back to the task list
//    And I see that the 'Check information needed from applicant' task is complete

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import CheckInformationNeededPage from '../../../../pages/apply/before_you_start/check_information_needed/checkInformationNeededPage'
import TaskListPage from '../../../../pages/apply/taskListPage'

context('Complete "Check information needed" page in "Check information needed from applicant" task', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['information-needed-from-applicant'] = {}
      const application = applicationFactory.build({
        person,
        data: applicationData,
      })
      cy.wrap(application).as('application')
    })

    cy.task('stubFindPerson', { person })
  })

  beforeEach(function test() {
    //  Background:
    //  Given I am logged in
    cy.signIn()
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    //  And I'm on the 'Check information needed' page
    CheckInformationNeededPage.visit(this.application)
  })

  //  Scenario: view 'Check information needed' page
  it('displays page', function test() {
    // Then I see the "Check information needed" page
    Page.verifyOnPage(CheckInformationNeededPage, this.application)
  })

  //  Scenario: navigate to task list on completion of task
  //    When I complete the "Check information needed" page
  //    And I continue to the next task / page
  //    Then I am taken back to the task list
  //    And I see that the 'Check information needed from applicant' task is complete
  it('continues to next page', function test() {
    // So that the status of the task will be complete we set application.data
    // to the full set
    cy.fixture('applicationData.json').then(applicationData => {
      const answered = {
        ...this.application,
        data: applicationData,
      }
      cy.task('stubApplicationGet', { application: answered })
    })

    const page = Page.verifyOnPage(CheckInformationNeededPage, this.application)

    //  When I complete the "Check information needed" page
    page.completeForm()

    //    And I continue to the next task / page
    page.clickSubmit()

    //    Then I am taken back to the task list
    const taskListPage = Page.verifyOnPage(TaskListPage)

    //    And I see that the 'Check information needed from applicant' task is complete
    taskListPage.shouldShowTaskStatus('information-needed-from-applicant', 'Completed')
  })
})
