//  Feature: Referrer completes 'risk management arrangemnents' page
//    So that I can complete the "Risk of serious harm" task
//    As a referrer
//    I want to complete the 'risk management arrangemnents' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'risk management arrangemnents' page
//
//  Scenario: view 'risk management arrangemnents' page
//    Then I see the "risk management arrangemnents" page
//
//  Scenario: navigate to next page in "Risk of serious harm" task
//    When I continue to the next task / page
//    Then I see the "cell share information" page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import RiskManagementArrangementsPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/riskManagementArrangementsPage'
import CellShareInformationPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/cellShareInformation'

context('Visit "risk management arrangemnents" page', () => {
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

    // And I visit the 'risk management arrangemnents' page
    // --------------------------------
    RiskManagementArrangementsPage.visit(this.application)
  })

  //  Scenario: view 'risk management arrangemnents' page
  // ----------------------------------------------

  it('presents risk management arrangemnents page', function test() {
    //    Then I see the "risk management arrangemnents" page
    Page.verifyOnPage(RiskManagementArrangementsPage, this.application)
  })

  //  Scenario: navigate to next page in "Risk of serious harm" task
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    //    When I continue to the next task / page
    const page = Page.verifyOnPage(RiskManagementArrangementsPage, this.application)
    page.clickSubmit()

    //    Then I see the "cell share information" page
    Page.verifyOnPage(CellShareInformationPage, this.application)
  })
})
