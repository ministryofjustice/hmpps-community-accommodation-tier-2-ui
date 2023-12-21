//  Feature: Referrer completes 'Referrer details' task
//    So that I can complete the 'Referrer details' task
//    As a referrer
//    I want to answer questions on the 'Contact number' page
//
//  Background:
//    Given I am logged in
//    And I'm on the 'Contact number' page
//
//  Scenario: view 'Contact Number' page
//    Then I see the "Contact Number" page
//
//  Scenario: navigate to task list on completion of task
//    When I complete the "Contact number" page
//    And I continue to the next task / page
//    Then I am taken back to the task list
//    And I see that the referrer details task is complete

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import ContactNumberPage from '../../../../pages/apply/before_you_start/referrer_details/contactNumberPage'
import TaskListPage from '../../../../pages/apply/taskListPage'

context('Complete "Contact number" page in "Referrer details" task', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['referrer-details'] = {}
      const application = applicationFactory.build({
        id: 'abc123',
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

    //  And I'm on the 'Contact number' page
    ContactNumberPage.visit(this.application)
  })

  //  Scenario: view 'Contact Number' page
  it('displays page', function test() {
    // Then I see the "Contact Number" page
    Page.verifyOnPage(ContactNumberPage, this.application)
  })

  //  Scenario: navigate to task list on completion of task
  it('navigates to the task list', function test() {
    // So that the status of the task will be complete we set application.data
    // to the full set
    cy.fixture('applicationData.json').then(applicationData => {
      const answered = {
        ...this.application,
        data: applicationData,
      }
      cy.task('stubApplicationGet', { application: answered })
    })

    // When I complete the "Contact number" page
    const page = Page.verifyOnPage(ContactNumberPage, this.application)
    page.completeForm()

    // And I continue to the next task / page
    page.clickSubmit()

    // Then I am taken back to the task list
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // And I see that the referrer details task is complete
    taskListPage.shouldShowTaskStatus('referrer-details', 'Completed')
  })
})
