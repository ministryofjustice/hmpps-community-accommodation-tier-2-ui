//  Feature: Referrer completes 'Add an ACCT' page
//    So that I can complete the "Risk to self" task
//    As a referrer
//    I want to complete the 'Add an ACCT' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the "Add an ACCT" page
//
//  Scenario: I fill in required information for an ACCT
//    And I save and contnue
//    Then I am taken back to the ACCT page
//
//  Scenario: Add another ACCT
//    Given I have filled in required information for an ACCT
//    When I save and add another
//    Then I am taken to a blank "Add an ACCT" page
//    And I see a success message

import AcctPage from '../../../../pages/apply/risks_and_needs/risk-to-self/acctPage'
import AcctDataPage from '../../../../pages/apply/risks_and_needs/risk-to-self/acctDataPage'
import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "Risks and needs" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['risk-to-self']
      const application = applicationFactory.build({
        id: 'abc123',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('application')
    })

    cy.fixture('applicationData.json').then(applicationData => {
      const applicationWithData = {
        ...this.application,
        data: applicationData,
      }
      cy.wrap(applicationWithData).as('applicationWithData')
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

    // And I am on the "Add an ACCT" page
    // --------------------------------
    AcctDataPage.visit(this.application)
  })

  //  Scenario: I fill in required information for an ACCT
  //    When I continue to the next task / page
  //    Then I see the "ACCT" page
  it('navigates to the next page (ACCT page)', function test() {
    const page = new AcctDataPage(this.application)

    page.addACCTInformation()

    page.clickSubmit()

    Page.verifyOnPage(AcctPage, this.application)
  })

  //  Scenario: Add another ACCT
  it('returns to form when adding another', function test() {
    const page = new AcctDataPage(this.application)

    //    Given I have filled in required information for an ACCT
    page.addACCTInformation()

    //    When I save and add another
    page.clickAddAnother()

    //    Then I am taken to a blank "Add an ACCT" page
    Page.verifyOnPage(AcctDataPage, this.application)
    page.assertFormisEmpty()

    //  And I see a success message
    page.shouldShowSuccessMessage('The ACCT has been saved')
  })
})
