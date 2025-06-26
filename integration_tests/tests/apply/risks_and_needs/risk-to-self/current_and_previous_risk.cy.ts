//  Feature: Referrer completes 'Risk to self: current risk' page
//    So that I can complete the "Risk to self" task
//    As a referrer
//    I want to complete the 'current risk' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the current risk page
//
//  Scenario: view current risk questions
//    Then I see the "current risk" page
//
//  Scenario: complete page and navigate to next page in health needs task
//    When I complete the current risk page
//    And I continue to the next task / page
//    Then I see the "historical risk" page

import AcctPage from '../../../../pages/apply/risks_and_needs/risk-to-self/acctPage'
import CurrentAndPreviousRiskPage from '../../../../pages/apply/risks_and_needs/risk-to-self/currentAndPreviousRiskPage'

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

    // And I am on the current risk page
    // --------------------------------
    CurrentAndPreviousRiskPage.visit(this.application)
  })

  //  Scenario: view current and previous risk questions
  //    Then I see the "current and previous risk" page
  it('presents current and previous risk page', function test() {
    const page = Page.verifyOnPage(CurrentAndPreviousRiskPage, this.application)

    page.shouldShowOasysImportDate(this.application, 'risk-to-self')
  })

  //  Scenario: complete page and navigate to next page in health needs task
  //    When I complete the current and previous risk page
  //    And I continue to the next task / page
  //    Then I see the "acct" page
  it('navigates to the next page (acct)', function test() {
    CurrentAndPreviousRiskPage.visit(this.application)
    const page = new CurrentAndPreviousRiskPage(this.application)

    page.getTextInputByIdAndEnterDetails('currentAndPreviousRiskDetail', 'example answer')
    page.clickConfirm()
    page.clickSubmit()

    Page.verifyOnPage(AcctPage, this.application)
  })
})
