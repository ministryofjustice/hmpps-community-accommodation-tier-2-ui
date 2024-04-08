//  Feature: Referrer completes 'Offending history: Offence history' page
//    So that I can complete the "Offending history" task
//    As a referrer
//    I want to complete the 'Offence history' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the "Offence history" page
//
//  Scenario: there are existing offences in the application
//    Then I see a list of the existing offences on the "Offence history" page
//
//  Scenario: remove an Offence
//    When I remove an offence
//    Then the offence is no longer in the list of offences
//
//  Scenario: there are no existing offences in the application
//    Then I see the "Offence history" page
//
//  Scenario: when I go to select another offence
//    Then I see the "Offence history data" page
//
//  Scenario: When I continue to the next task / page
//    Then I see the Task list page
//    And I see that the task has been completed

import OffenceHistoryPage from '../../../../pages/apply/offence_and_licence_information/offending-history/offenceHistoryPage'
import TaskListPage from '../../../../pages/apply/taskListPage'
import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "Risks and needs" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['offending-history']
      const application = applicationFactory.build({
        id: 'abc123',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('application')
    })

    cy.fixture('applicationData.json').then(applicationData => {
      const applicationWithData = {
        ...this.application,
        data: applicationData,
      }
      cy.wrap(applicationWithData).as('applicationWithData')
    })
  })

  beforeEach(function test() {
    // And an application exists
    // -------------------------
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    // Given I am logged in
    //---------------------
    cy.signIn()

    // And I am on the Offence history page
    // --------------------------------
    OffenceHistoryPage.visit(this.application)
  })

  //  Scenario: there are no existing offencess in the application
  //    Then I see the "Offence history" page
  it('presents Offence history page', function test() {
    Page.verifyOnPage(OffenceHistoryPage, this.application)
  })

  //  Scenario: there are existing offences in the application
  //    Then I see a list of existing offences on the "Offence history" page
  it('presents Offence history page with existing offences', function test() {
    // When there is already imported data
    cy.task('stubApplicationGet', { application: this.applicationWithData })

    OffenceHistoryPage.visit(this.applicationWithData)

    const page = new OffenceHistoryPage(this.applicationWithData)
    page.hasListOfOffences()
  })

  //  Scenario: remove an offence
  it('removes an offence', function test() {
    // When there is already imported data
    cy.task('stubApplicationGet', { application: this.applicationWithData })

    OffenceHistoryPage.visit(this.applicationWithData)

    const page = new OffenceHistoryPage(this.applicationWithData)
    page.hasListOfOffences()

    //    When I remove an offence
    // reset the application to have no data
    cy.task('stubApplicationGet', { application: this.application })
    page.clickRemove()
    //  Then the offence is no longer in the list of offences
    page.hasNoOffences()
  })

  //  Scenario: complete page and navigate to next page in health needs task

  it('navigates to the next page (Task List)', function test() {
    //    When I continue to the next task / page
    OffenceHistoryPage.visit(this.applicationWithData)
    const page = new OffenceHistoryPage(this.applicationWithData)

    cy.task('stubApplicationGet', { application: this.applicationWithData })
    page.clickSubmit()

    //    Then I see the "task list" page
    const taskListPage = Page.verifyOnPage(TaskListPage, this.applicationWithData)

    //    And I see that the task has been completed
    taskListPage.shouldShowTaskStatus('offending-history', 'Completed')
  })
})
