//  Feature: Referrer completes 'Add a previous offence' page
//    So that I can complete the "Offending history" task
//    As a referrer
//    I want to complete the 'Add a previous offence' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the "Add a previous offence" page
//
//  Scenario: I fill in required information for a previous offence
//    And I save and contnue
//    Then I am taken back to the Offence history page

import OffenceHistoryDataPage from '../../../../pages/apply/offence_and_licence_information/offending-history/offenceHistoryDataPage'
import OffenceHistoryPage from '../../../../pages/apply/offence_and_licence_information/offending-history/offenceHistoryPage'
import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "Offence and licence" section', () => {
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

    // And I am on the "Add a previous offence" page
    // --------------------------------
    OffenceHistoryDataPage.visit(this.application)
  })

  //  Scenario: I fill in required information for a previous offence
  //    When I continue to the next task / page
  //    Then I see the "Offence history" page
  it('navigates to the next page (Offence history)', function test() {
    const page = new OffenceHistoryDataPage(this.application)

    page.addOffenceInformation()

    cy.task('stubApplicationGet', { application: this.applicationWithData })

    page.clickSubmit()

    Page.verifyOnPage(OffenceHistoryPage, this.application)
  })
})
