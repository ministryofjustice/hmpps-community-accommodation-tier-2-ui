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
//    When I complete the questions in the task
//    And I continue to the next task / page
//    Then I see the "cell share information" page
//
//  Scenario: Toggle between selected arrangements and no arrangements
//    Given I have selected that there are arrangements
//    When I select that this person does not have any arrangements
//    And I then select an arrangement once again
//    Then I see that only the expected arrangement is selected

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import RiskManagementArrangementsPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/riskManagementArrangementsPage'
import CellShareInformationPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/cellShareInformationPage'

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
    //    When I complete the questions in the task
    const page = Page.verifyOnPage(RiskManagementArrangementsPage, this.application)
    page.selectAllArrangements(page)
    page.completeAllArrangementDetails(page)

    //    And I continue to the next task / page
    page.clickSubmit()

    //    Then I see the "cell share information" page
    Page.verifyOnPage(CellShareInformationPage, this.application)
  })

  //  Scenario: Toggle between selected arrangements and no arrangements
  it('toggles between selected arrangements and no arrangements', function test() {
    const page = Page.verifyOnPage(RiskManagementArrangementsPage, this.application)
    //  Given I have selected that there are arrangements
    page.selectAllArrangements(page)
    page.completeAllArrangementDetails(page)

    //  When I select that this person does not have any arrangements
    page.checkCheckboxByLabel('no')
    page.expectArrangementsToBeUnselected()
    page.expectArrangementDetailsToBeEmpty()

    //    And I then select an arrangement once again
    //    Then I see that only the expected arrangement is selected
    page.toggleBetweenNoAndArrangements(page)
  })
})
