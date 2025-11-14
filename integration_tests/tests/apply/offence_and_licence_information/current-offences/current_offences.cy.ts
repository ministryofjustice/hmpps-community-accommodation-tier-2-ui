//  Feature: Referrer completes 'Current offences: Current offences' page
//    So that I can complete the "Current offences" task
//    As a referrer
//    I want to complete the 'Current offences' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the "Current offences" page
//
//  Scenario: there are existing offences in the application
//    Then I see a list of the existing offences on the "Current offences" page
//
//  Scenario: remove an offence, answer is enforced
//    When I remove an offence
//    Then the offence is no longer in the list of offences
//    And when I click continue
//    Then I see an error
//
//  Scenario: referrer visits task for the first time
//    Then I see the "Current offence data" page
//
//  Scenario: complete page and navigate to task list page
//    When I continue to the next task / page
//    Then I see the "task list" page

import CurrentOffencesPage from '../../../../pages/apply/offence_and_licence_information/current-offences/currentOffencesPage'
import CurrentOffenceDataPage from '../../../../pages/apply/offence_and_licence_information/current-offences/currentOffenceDataPage'
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
      delete applicationData['current-offences']
      const application = applicationFactory.build({
        person,
        data: applicationData,
      })
      cy.wrap(application).as('application')

      const applicationWithDeletedData = applicationFactory.build({
        id: application.id,
        person,
        data: {
          'current-offences': { 'current-offence-data': [] },
        },
      })
      cy.wrap(applicationWithDeletedData).as('applicationWithDeletedData')
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

    // And I am on the Current offences page
    // --------------------------------
    CurrentOffencesPage.visit(this.application)
  })

  //  Scenario: referrer visits task for the first time
  //    Then I see the "Current offence data" page
  it('presents Current offence data page', function test() {
    Page.verifyOnPage(CurrentOffenceDataPage, this.application)
  })

  //  Scenario: there are existing offences in the application
  it('presents Current offences page with existing offences', function test() {
    // When there is already imported data
    cy.task('stubApplicationGet', { application: this.applicationWithData })
    CurrentOffencesPage.visit(this.applicationWithData)

    // Then I see a list of existing offences on the "Current offences" page
    const page = Page.verifyOnPage(CurrentOffencesPage, this.applicationWithData)
    page.hasListOfOffences()
  })

  //  Scenario: remove an offence, answer is enforced
  it('removes an offence and renders error', function test() {
    // When there is already imported data
    cy.task('stubApplicationGet', { application: this.applicationWithData })

    CurrentOffencesPage.visit(this.applicationWithData)

    const page = new CurrentOffencesPage(this.applicationWithData)
    page.hasListOfOffences()

    // When I remove an offence
    // reset the application to the deleted state
    cy.task('stubApplicationGet', { application: this.applicationWithDeletedData })
    page.clickRemove()

    //  Then the offence is no longer in the list of offences
    page.hasNoOffences()

    //  And when I click continue
    page.clickSubmit()

    //  Then I see an error
    page.shouldShowErrorSummary()
  })

  //  Scenario: complete page and navigate to task list page
  //    When I continue to the next task / page
  //    Then I see the "task list" page
  it('navigates to the next page (Task List)', function test() {
    cy.task('stubApplicationGet', { application: this.applicationWithData })
    CurrentOffencesPage.visit(this.applicationWithData)
    const page = new CurrentOffencesPage(this.applicationWithData)

    page.clickSubmit()

    Page.verifyOnPage(TaskListPage, this.applicationWithData)
  })
})
