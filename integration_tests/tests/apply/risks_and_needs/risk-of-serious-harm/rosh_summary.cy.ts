//  Feature: Referrer completes 'RoSH summary' page
//    So that I can complete the "Risk of serious harm" task
//    As a referrer
//    I want to complete the 'RoSH summary' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'RoSH summary' page
//
//  Scenario: view 'RoSH summary' page
//    Then I see the "RoSH summary" page
//
//  Scenario: navigate to next page in "Risk of serious harm" task
//    When I continue to the next task / page
//    Then I see the "Risk to others" page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import RoshSummaryPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/roshSummaryPage'
import RiskToOthersPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/riskToOthersPage'

context('Visit "RoSH summary" page', () => {
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

    // And I visit the 'RoSH summary' page
    // --------------------------------
    RoshSummaryPage.visit(this.application)
  })

  //  Scenario: view 'RoSH summary' page
  // ----------------------------------------------

  it('presents RoSH summary page', function test() {
    //    Then I see the "RoSH summary" page
    Page.verifyOnPage(RoshSummaryPage, this.application)
  })

  //  Scenario: navigate to next page in "Risk of serious harm" task
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    //    When I continue to the next task / page
    const page = Page.verifyOnPage(RoshSummaryPage, this.application)
    page.clickSubmit()

    //    Then I see the "Risk to others" page
    Page.verifyOnPage(RiskToOthersPage, this.application)
  })
})
