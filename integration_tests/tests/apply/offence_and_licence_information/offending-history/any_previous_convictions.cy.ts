//  Feature: Referrer completes 'has any previous unspent convictions' page
//    So that I can complete the "Offending history" task
//    As a referrer
//    I want to complete the 'has any previous unspent convictions' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'has any previous unspent convictions' page
//
//  Scenario: view 'has any previous unspent convictions' page
//    Then I see the "has any previous unspent convictions" page
//
//  Scenario: navigate to task list on completion of task
//    When I complete the "has any previous unspent convictions" page
//    And I continue to the next task / page
//    Then I am taken to add an offence history

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import AnyPreviousConvictionsPage from '../../../../pages/apply/offence_and_licence_information/offending-history/anyPreviousConvictionsPage'
import OffenceHistoryDataPage from '../../../../pages/apply/offence_and_licence_information/offending-history/offenceHistoryDataPage'

context('Visit "has any previous unspent convictions" page', () => {
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
  })

  beforeEach(function test() {
    // And an application exists
    // -------------------------
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    // Given I am logged in
    //---------------------
    cy.signIn()

    // And I visit the 'has any previous unspent convictions' page
    // --------------------------------
    AnyPreviousConvictionsPage.visit(this.application)
  })

  //  Scenario: view 'has any previous unspent convictions' page
  // ----------------------------------------------

  it('presents has any previous unspent convictions page', function test() {
    //    Then I see the "has any previous unspent convictions" page
    Page.verifyOnPage(AnyPreviousConvictionsPage, this.application)
  })

  //  Scenario: navigate to Offence History page
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    //    When I complete the "has any previous unspent convictions" page
    const page = Page.verifyOnPage(AnyPreviousConvictionsPage, this.application)
    page.checkRadioByNameAndValue('hasAnyPreviousConvictions', 'yesRelevantRisk')

    //    When I continue to the next task / page
    page.clickSubmit()

    //    Then I am taken to add an offence history
    Page.verifyOnPage(OffenceHistoryDataPage, this.application)
  })
})
