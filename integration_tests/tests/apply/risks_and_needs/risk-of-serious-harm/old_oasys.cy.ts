//  Feature: Referrer completes 'Old OASys' page
//    So that I can complete the "Risk of serious harm" task
//    As a referrer
//    I want to complete the 'Old OASys' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'Old OASys' page
//
//  Scenario: view 'Old OASys' page
//    Then I see the "Old OASys" page
//
//  Scenario: navigate to next page in "Risk of serious harm" task
//    When I give a valid answer
//    And I continue to the next task / page
//    Then I see the "Risk to others" page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import OldOasysPage from '../../../../pages/apply/risks_and_needs/risk-of-serious-harm/oldOasysPage'
import RiskToOthersPage from '../../../../pages/apply/risks_and_needs/risk-of-serious-harm/riskToOthersPage'

context('Visit "Risks and needs" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['risk-of-serious-harm']
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

    // And I visit the 'Old OASys' page
    // --------------------------------
    OldOasysPage.visit(this.application)
  })

  //  Scenario: view 'Old OASys' page
  // ----------------------------------------------
  it('presents Old OASys page', function test() {
    //  Then I see the "Old OASys" page
    Page.verifyOnPage(OldOasysPage, this.application)
  })

  //  Scenario: navigate to next page in "Risk of serious harm" task
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    //  When I give a valid answer
    const page = Page.verifyOnPage(OldOasysPage, this.application)
    page.completeForm()

    //  And I continue to the next task / page
    page.clickSubmit()

    //  Then I see the "Risk to others" page
    Page.verifyOnPage(RiskToOthersPage, this.application)
  })
})
