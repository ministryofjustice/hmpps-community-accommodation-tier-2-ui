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
//
//  Scenario: Add another offence
//    Given I have filled in required information for an offence
//    When I save and add another
//    Then I am taken to a blank "Add a previous offence" page
//    And I see a success message

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

    page.clickSubmit()

    Page.verifyOnPage(OffenceHistoryPage, this.application)
  })

  //  Scenario: Add another Offence
  it('returns to form when adding another', function test() {
    const page = new OffenceHistoryDataPage(this.application)

    //    Given I have filled in required information for an Offence
    page.addOffenceInformation()

    //    When I save and add another
    page.clickAddAnother()

    //    Then I am taken to a blank "Add a previous offence" page
    Page.verifyOnPage(OffenceHistoryDataPage, this.application)
    page.assertFormisEmpty()

    //  And I see a success message
    page.shouldShowSuccessMessage('The offence has been saved')
  })
})
