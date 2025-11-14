//  Feature: Referrer completes 'manual RoSH information' page
//    So that I can complete the "Risk of serious harm" task
//    and have RoSH data
//    As a referrer
//    I want to complete the 'manual RoSH Information' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'manual RoSH information' page
//
//  Scenario: view 'manual RoSH information' page
//    Then I see the "manual RoSH information" page
//    And I can click through to the Task List page
//
//  Scenario: submit manual RoSH data
//    When I submit my answers
//    Then I am taken to the 'Risk to others' page

import ManualRoshInformationPage from '../../../../pages/apply/risks_and_needs/risk-of-serious-harm/manualRoshInformationPage'
import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import RiskToOthersPage from '../../../../pages/apply/risks_and_needs/risk-of-serious-harm/riskToOthersPage'

context('Visit "Manual RoSH Information" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['risk-of-serious-harm'] = {}
      const application = applicationFactory.build({
        person,
        data: applicationData,
      })
      cy.wrap(application).as('application')
    })

    cy.fixture('applicationData.json').then(applicationData => {
      const application = applicationFactory.build({
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

    // And I visit the 'Manual RoSH information' page
    // --------------------------------
    ManualRoshInformationPage.visit(this.application)
  })

  //  Scenario: view 'Manual RoSH information' page
  // ----------------------------------------------

  it('presents manual rosh information page', function test() {
    //    Then I see the "manual rosh information" page
    const page = Page.verifyOnPage(ManualRoshInformationPage, this.application)

    // And I can click through to the Task List page
    page.shouldHaveTaskListLink(this.application)
  })

  // Scenario: submit manual rosh data
  // ----------------------------
  it('continues to risk to others page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(ManualRoshInformationPage, this.application)
    page.completeFormWithAllLowRisk()
    page.clickSubmit()

    // I am taken to the 'Risk to others' page
    Page.verifyOnPage(RiskToOthersPage, this.application)
  })
})
