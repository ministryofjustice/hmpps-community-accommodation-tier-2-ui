//  Feature: Referrer completes 'Health needs: physical health' page
//    So that I can complete the "Health needs" task
//    As a referrer
//    I want to complete the 'physical health' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the physical health page
//
//  Scenario: view physical health questions
//    Then I see the "physical health" page
//
//  Scenario: complete page and navigate to next page in health needs task
//    When I complete the physical health page questions
//    And I continue to the next task / page
//    Then I see the "mental health" page

import Page from '../../../../pages/page'
import MentalHealthPage from '../../../../pages/apply/risks_and_needs/health-needs/mentalHealthPage'
import PhysicalHealthPage from '../../../../pages/apply/risks_and_needs/health-needs/physicalHealthPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "Physical health" page', () => {
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

    // And I am on the physical health page
    // --------------------------------
    PhysicalHealthPage.visit(this.application)
  })

  //  Scenario: view physical health questions
  //    Then I see the "physical health" page
  it('presents physical health page', function test() {
    Page.verifyOnPage(PhysicalHealthPage, this.application)
  })

  //  Scenario: complete page and navigate to next page in health needs task
  //    When I complete the physical health page questions
  //    And I continue to the next task / page
  //    Then I see the "mental health" page
  it('navigates to the next page (mental health)', function test() {
    PhysicalHealthPage.visit(this.application)
    const page = new PhysicalHealthPage(this.application)

    page.describePhysicalNeeds()
    page.describeTreatmentAndMedication()
    page.provideIndependentLivingInfo()
    page.describeAdditionalSupportNeeded()

    page.clickSubmit()

    Page.verifyOnPage(MentalHealthPage, this.application)
  })
})
