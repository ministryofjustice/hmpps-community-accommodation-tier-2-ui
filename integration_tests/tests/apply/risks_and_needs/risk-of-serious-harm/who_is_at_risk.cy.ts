//  Feature: Referrer completes 'risk to others' page
//    So that I can complete the "Risk of serious harm" task
//    As a referrer
//    I want to complete the 'who is at risk' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'who is at risk' page
//
//  Scenario: view 'who is at risk' page
//    Then I see the "who is at risk" page
//    And I can click through to the RoSH summary
//
//  Scenario: view 'who is at risk' page with auto-populated OASyS data
//    Then I see the "who is at risk" page
//    With an OASyS import date
//    And pre-filled questions
//
//  Scenario: navigate to next page in "Risk of serious harm" task
//    When I complete the 'who is at risk' page
//    When I continue to the next task / page
//    Then I see the "Risk to others" page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import WhoIsAtRiskPage from '../../../../pages/apply/risks_and_needs/risk-of-serious-harm/whoIsAtRiskPage'
import RiskToOthersPage from '../../../../pages/apply/risks_and_needs/risk-of-serious-harm/riskToOthersPage'

context('Visit "who is at risk" page', () => {
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

    cy.fixture('applicationData.json').then(applicationData => {
      const application = applicationFactory.build({
        id: 'abc123',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('applicationWithData')
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

    // And I visit the 'Who is at risk' page
    // --------------------------------
    WhoIsAtRiskPage.visit(this.application)
  })

  //  Scenario: view 'who is at risk' page
  // ----------------------------------------------

  it('presents who is at risk page', function test() {
    //    Then I see the "who is at risk" page
    const page = Page.verifyOnPage(WhoIsAtRiskPage, this.application)

    // And I can click through to the RoSH summary
    page.shouldContainRoshSummaryLink()
  })

  //  Scenario: view 'risk to others' page with auto-populated OASyS data
  // ----------------------------------------------
  //
  it('presents auto-populated who is at risk page', function test() {
    cy.task('stubApplicationGet', { application: this.applicationWithData })
    WhoIsAtRiskPage.visit(this.application)
    //    Then I see the "who is at risk" page
    const page = Page.verifyOnPage(WhoIsAtRiskPage, this.applicationWithData)
    //    With an OASyS import date
    page.shouldShowOasysImportDate(this.applicationWithData, 'risk-of-serious-harm')
    //    And pre-filled questions
    page.checkValueOfTextInputById('whoIsAtRisk', 'a person')
  })

  //  Scenario: navigate to next page in "Risk of serious harm" task
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    // When I complete the 'who is at risk' page
    const page = Page.verifyOnPage(WhoIsAtRiskPage, this.application)
    page.getTextInputByIdAndEnterDetails('whoIsAtRisk', 'people at risk')
    page.clickConfirm()

    //    When I continue to the next task / page
    page.clickSubmit()

    //    Then I see the "risk to others" page
    Page.verifyOnPage(RiskToOthersPage, this.application)
  })
})
