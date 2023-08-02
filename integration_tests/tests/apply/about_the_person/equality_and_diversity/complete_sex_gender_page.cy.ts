//  Feature: Referrer completes 'Sex and Gender identity' question page
//    So that I can complete the 'Equality questions' task
//    As a referrer
//    I want to answer questions on the sex and gender page
//
//  Scenario: submit sex and gender itentity answers
//    Given I'm on the 'Sex and gender identity' task page
//    When I give valid answers to the 'Sex and gender identity' questions
//    Then I return to the task list page
//    And I see that the task has been completed

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import SexAndGenderPage from '../../../../pages/apply/sexAndGenderPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "About the person" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['equality-and-diversity-monitoring']['sex-and-gender'] = {}
      const application = applicationFactory.build({
        id: 'abc123',
        person,
      })
      application.data = applicationData
      cy.wrap(application).as('application')
      cy.wrap(application.data).as('applicationData')
    })
  })

  beforeEach(function test() {
    // And an application exists
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    // Given I am logged in
    //---------------------
    cy.signIn()

    // And I am on the sex and gender question page
    // --------------------------------
    cy.visit('applications/abc123/tasks/equality-and-diversity-monitoring/pages/sex-and-gender')
    Page.verifyOnPage(SexAndGenderPage, this.application)
  })

  // Scenario: submit 'female' as sex
  // ----------------------------
  it('continues to task list page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(SexAndGenderPage, this.application)
    page.selectSex()
    page.confirmGenderIdentity()

    page.clickSubmit()

    // I return to the task list page
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // I see that the task has been completed
    taskListPage.shouldShowTaskStatus('equality-and-diversity-monitoring', 'Completed')
  })
})
