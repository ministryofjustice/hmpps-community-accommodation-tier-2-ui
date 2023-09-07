//  Feature: Referrer completes 'reducing risk' page
//    So that I can complete the "Risk of serious harm" task
//    As a referrer
//    I want to complete the 'reducing risk' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'reducing risk' page
//
//  Scenario: view 'reducing risk' page
//    Then I see the "reducing risk" page
//
//  Scenario: navigate to next page in "Risk of serious harm" task
//    When I continue to the next task / page
//    Then I see the "risk management arrangements" page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import ReducingRiskPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/reducingRiskPage'
import RiskManagementArrangementsPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/riskManagementArrangementsPage'

context('Visit "reducing risk" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['risk-of-serious-harm'] = {}
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

    // And I visit the 'reducing risk' page
    // --------------------------------
    ReducingRiskPage.visit(this.application)
  })

  //  Scenario: view 'reducing risk' page
  // ----------------------------------------------

  it('presents reducing risk page', function test() {
    //    Then I see the "reducing risk" page
    Page.verifyOnPage(ReducingRiskPage, this.application)
  })

  //  Scenario: navigate to next page in "Risk of serious harm" task
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    //    When I continue to the next task / page
    const page = Page.verifyOnPage(ReducingRiskPage, this.application)
    page.clickSubmit()

    //    Then I see the "risk management arrangements" page
    Page.verifyOnPage(RiskManagementArrangementsPage, this.application)
  })
})
