//  Feature: Referrer completes 'behaviour notes' page
//    So that I can complete the "Risk of serious harm" task
//    As a referrer
//    I want to complete the 'behaviour notes' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'behaviour notes' page
//
//  Scenario: view 'behaviour notes' page
//    Then I see the "behaviour notes" page
//
//  Scenario: navigate to next page in "Risk of serious harm" task
//    When I continue to the next task / page
//    Then I see the "additional risk information" page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import BehaviourNotesPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/behaviourNotesPage'
import AdditionalRiskInformationPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/additionalRiskInformationPage'

context('Visit "behaviour notes" page', () => {
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

    // And I visit the 'behaviour notes' page
    // --------------------------------
    BehaviourNotesPage.visit(this.application)
  })

  //  Scenario: view 'behaviour notes' page
  // ----------------------------------------------

  it('presents behaviour notes page', function test() {
    //    Then I see the "behaviour notes" page
    Page.verifyOnPage(BehaviourNotesPage, this.application)
  })

  //  Scenario: navigate to next page in "Risk of serious harm" task
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    //    When I continue to the next task / page
    const page = Page.verifyOnPage(BehaviourNotesPage, this.application)
    page.clickSubmit()

    //    Then I see the "additional risk information" page
    Page.verifyOnPage(AdditionalRiskInformationPage, this.application)
  })
})
