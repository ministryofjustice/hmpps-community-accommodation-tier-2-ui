//  Feature: Referrer completes 'Risk to self: ACCT' page
//    So that I can complete the "Risk to self" task
//    As a referrer
//    I want to complete the 'ACCT' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the ACCT page
//
//  Scenario: view ACCT questions
//    Then I see the "ACCT" page
//
//  Scenario: complete page and navigate to next page in health needs task
//    When I complete the ACCT page
//    And I continue to the next task / page
//    Then I see the "additional information" page

import AcctPage from '../../../../pages/apply/risks-and-needs/risk-to-self/acctPage'
import AdditionalInformationPage from '../../../../pages/apply/risks-and-needs/risk-to-self/additionalInformationPage'
import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "Risks and needs" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['risk-to-self'] = {}
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

    // And I am on the ACCT page
    // --------------------------------
    AcctPage.visit(this.application)
  })

  //  Scenario: view ACCT questions
  //    Then I see the "ACCT" page
  it('presents ACCT page', function test() {
    Page.verifyOnPage(AcctPage, this.application)
  })

  //  Scenario: complete page and navigate to next page in health needs task
  //    When I complete the ACCT page
  //    And I continue to the next task / page
  //    Then I see the "additional information" page
  it('navigates to the next page (additional information)', function test() {
    AcctPage.visit(this.application)
    const page = new AcctPage(this.application)

    page.clickSubmit()

    Page.verifyOnPage(AdditionalInformationPage, this.application)
  })
})
