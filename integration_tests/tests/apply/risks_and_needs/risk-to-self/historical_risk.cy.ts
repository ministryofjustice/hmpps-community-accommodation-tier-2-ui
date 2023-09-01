//  Feature: Referrer completes 'Risk to self: historical risk' page
//    So that I can complete the "Risk to self" task
//    As a referrer
//    I want to complete the 'historical risk' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the historical risk page
//
//  Scenario: view historical risk questions
//    Then I see the "historical risk" page
//
//  Scenario: complete page and navigate to next page in health needs task
//    When I complete the historical risk page
//    And I continue to the next task / page
//    Then I see the "ACCT" page

import HistoricalRiskPage from '../../../../pages/apply/risks-and-needs/risk-to-self/historicalRiskPage'
import AcctPage from '../../../../pages/apply/risks-and-needs/risk-to-self/acctPage'
import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "Risks and needs" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
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

    // And I am on the historical risk page
    // --------------------------------
    HistoricalRiskPage.visit(this.application)
  })

  //  Scenario: view historical risk questions
  //    Then I see the "historical risk" page
  it('presents historical risk page', function test() {
    const page = Page.verifyOnPage(HistoricalRiskPage, this.application)

    page.shouldShowOasysImportDate(this.application, 'risk-to-self', 'historical-risk')
  })

  //  Scenario: complete page and navigate to next page in health needs task
  //    When I complete the historical risk page
  //    And I continue to the next task / page
  //    Then I see the "ACCT" page
  it('navigates to the next page (ACCT)', function test() {
    HistoricalRiskPage.visit(this.application)
    const page = new HistoricalRiskPage(this.application)

    page.clickSubmit()

    Page.verifyOnPage(AcctPage, this.application)
  })
})
