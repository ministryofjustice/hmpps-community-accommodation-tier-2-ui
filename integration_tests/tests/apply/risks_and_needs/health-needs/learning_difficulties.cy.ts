//  Feature: Referrer completes 'Health needs: learning difficulties' page
//    So that I can complete the "Health needs" task
//    As a referrer
//    I want to complete the 'learning difficulties' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the learning difficulties page
//
//  Scenario: view learning difficulties questions
//    Then I see the "learning difficulties" page
//
//  Scenario: complete the page and navigate to next page in health needs task
//    When I complete the learning difficulties page
//    And I continue to the next task / page
//    Then I see the "brain injury" page

import Page from '../../../../pages/page'
import BrainInjuryPage from '../../../../pages/apply/risks_and_needs/health-needs/brainInjuryPage'
import LearningDifficultiesPage from '../../../../pages/apply/risks_and_needs/health-needs/learningDifficultiesPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "learning difficulties" page', () => {
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

    // And I am on the learning difficulties page
    // --------------------------------
    LearningDifficultiesPage.visit(this.application)
  })

  //  Scenario: view learning difficulties questions
  //    Then I see the "learning difficulties" page
  it('presents learning difficulties page', function test() {
    Page.verifyOnPage(LearningDifficultiesPage, this.application)
  })

  //  Scenario: complete the page and navigate to next page in health needs task
  //    When I complete the learning difficulties page
  //    And I continue to the next task / page
  //    Then I see the "brain injury" page
  it('navigates to the next page (brain injury)', function test() {
    LearningDifficultiesPage.visit(this.application)
    const page = new LearningDifficultiesPage(this.application)

    page.describeAdditionalNeeds()
    page.describeVulnerability()
    page.describeDifficultiesInteracting()
    page.describeAdditionalSupportNeeded()

    page.clickSubmit()

    Page.verifyOnPage(BrainInjuryPage, this.application)
  })
})
