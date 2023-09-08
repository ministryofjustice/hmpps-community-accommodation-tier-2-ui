//  Feature: Referrer completes 'risk factors' page
//    So that I can complete the "Risk of serious harm" task
//    As a referrer
//    I want to complete the 'risk factors' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'risk factors' page
//
//  Scenario: view 'risk factors' page
//    Then I see the "risk factors" page
//
//  Scenario: navigate to next page in "Risk of serious harm" task
//    When I continue to the next task / page
//    Then I see the "reducing risk" page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import RiskFactorsPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/riskFactorsPage'
import ReducingRiskPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/reducingRiskPage'

context('Visit "risk factors" page', () => {
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

    // And I visit the 'risk factors' page
    // --------------------------------
    RiskFactorsPage.visit(this.application)
  })

  //  Scenario: view 'risk factors' page
  // ----------------------------------------------

  it('presents risk factors page', function test() {
    //    Then I see the "risk factors" page
    Page.verifyOnPage(RiskFactorsPage, this.application)
  })

  //  Scenario: navigate to next page in "Risk of serious harm" task
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    //    When I continue to the next task / page
    const page = Page.verifyOnPage(RiskFactorsPage, this.application)
    page.clickSubmit()

    //    Then I see the "reducing risk" page
    Page.verifyOnPage(ReducingRiskPage, this.application)
  })
})
