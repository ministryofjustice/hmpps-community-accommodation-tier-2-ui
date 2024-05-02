//  Feature: Referrer completes 'Health needs: brain injury' page
//    So that I can complete the "Health needs" task
//    As a referrer
//    I want to complete the 'brain injury' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the brain injury page
//
//  Scenario: view brain injury questions
//    Then I see the "brain injury" page
//
//  Scenario: complete page and navigate to next page in health needs task
//    When I complete the brain injury page
//    And I continue to the next task / page
//    Then I see the "other health" page

import Page from '../../../../pages/page'
import BrainInjuryPage from '../../../../pages/apply/risks_and_needs/health-needs/brainInjuryPage'
import OtherHealthPage from '../../../../pages/apply/risks_and_needs/health-needs/otherHealthPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "brain injury" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['health-needs'] = {}
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

    // And I am on the brain injury page
    // --------------------------------
    BrainInjuryPage.visit(this.application)
  })

  //  Scenario: view brain injury questions
  //    Then I see the "brain injury" page
  it('presents brain injury page', function test() {
    Page.verifyOnPage(BrainInjuryPage, this.application)
  })

  //  Scenario: complete page and navigate to next page in health needs task
  //    When I complete the brain injury page
  //    And I continue to the next task / page
  //    Then I see the "other health" page
  it('navigates to the next page (other health)', function test() {
    BrainInjuryPage.visit(this.application)
    const page = new BrainInjuryPage(this.application)

    page.describeInjuryAndNeeds()
    page.describeVulnerability()
    page.describeDifficultiesInteracting()
    page.describeAdditionalSupportNeeded()

    page.clickSubmit()

    Page.verifyOnPage(OtherHealthPage, this.application)
  })
})
