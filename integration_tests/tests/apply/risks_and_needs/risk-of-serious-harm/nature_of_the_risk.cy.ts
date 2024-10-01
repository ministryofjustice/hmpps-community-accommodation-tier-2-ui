//  Feature: Referrer completes 'nature of the risk' page
//    So that I can complete the "Risk of serious harm" task
//    As a referrer
//    I want to complete the 'nature of the risk' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'nature of the risk' page
//
//  Scenario: view 'nature of the risk' page
//    Then I see the "nature of the risk" page
//    And I can click through to the RoSH summary
//
//  Scenario: view 'risk to others' page with auto-populated OASyS data
//    Then I see the "nature of the risk" page
//    With an OASyS import date
//    And pre-filled questions
//
//  Scenario: navigate to next page in "Risk of serious harm" task
//    When I complete the 'nature of the risk' page
//    When I continue to the next task / page
//    Then I see the "Risk management arrangements" page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import NatureOfTheRiskPage from '../../../../pages/apply/risks_and_needs/risk-of-serious-harm/natureOfTheRiskPage'
import RiskManagementArrangementsPage from '../../../../pages/apply/risks_and_needs/risk-of-serious-harm/riskManagementArrangementsPage'

context('Visit "nature of the risk" page', () => {
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

    // And I visit the 'nature of the risk' page
    // --------------------------------
    NatureOfTheRiskPage.visit(this.application)
  })

  //  Scenario: view 'nature of the risk' page
  // ----------------------------------------------

  it('presents nature of the risk page', function test() {
    //    Then I see the "nature of the risk" page
    const page = Page.verifyOnPage(NatureOfTheRiskPage, this.application)

    // And I can click through to the RoSH summary
    page.shouldContainRoshSummaryLink()
  })

  //  Scenario: view 'nature of the risk' page with auto-populated OASyS data
  // ----------------------------------------------

  it('presents auto-populated nature of the risk page', function test() {
    cy.task('stubApplicationGet', { application: this.applicationWithData })
    NatureOfTheRiskPage.visit(this.application)
    //    Then I see the "nature of the risk" page
    const page = Page.verifyOnPage(NatureOfTheRiskPage, this.applicationWithData)
    //    With an OASyS import date
    page.shouldShowOasysImportDate(this.applicationWithData, 'risk-of-serious-harm')
    //    And pre-filled questions
    page.checkValueOfTextInputById('natureOfRisk', 'a nature')
  })

  //  Scenario: navigate to next page in "Risk of serious harm" task
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    // When I complete the 'risk to others' page
    const page = Page.verifyOnPage(NatureOfTheRiskPage, this.application)
    page.getTextInputByIdAndEnterDetails('natureOfRisk', 'nature of risk')
    page.clickConfirm()

    //    When I continue to the next task / page
    page.clickSubmit()

    //    Then I see the "risk management arrangements" page
    Page.verifyOnPage(RiskManagementArrangementsPage, this.application)
  })
})
