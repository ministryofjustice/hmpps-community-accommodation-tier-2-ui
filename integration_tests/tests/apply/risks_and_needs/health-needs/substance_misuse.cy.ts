//  Feature: Referrer completes 'Health needs: substance misuse' page
//    So that I can complete the "Health needs" task
//    As a referrer
//    I want to complete the 'substance misuse' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I have read the health needs guidance page
//
//  Scenario: view substance misuse questions
//    Then I see the "substance misuse" page
//
//  Scenario: complete page and navigate to next page in health needs task
//    When I complete the substance misuse page questions
//    And I continue to the next task / page
//    Then I see the "physical health" page

import Page from '../../../../pages/page'
import HealthNeedsGuidancePage from '../../../../pages/apply/risks_and_needs/health-needs/healthNeedsGuidancePage'
import SubstanceMisusePage from '../../../../pages/apply/risks_and_needs/health-needs/substanceMisusePage'
import PhysicalHealthPage from '../../../../pages/apply/risks_and_needs/health-needs/physicalHealthPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "Substance misuse" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['health-needs'] = {}
      const application = applicationFactory.build({
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

    // And I have read the health needs guidance page
    // --------------------------------
    HealthNeedsGuidancePage.visit(this.application)
    const guidancePage = new HealthNeedsGuidancePage(this.application)
    guidancePage.clickSubmit('Continue')
  })

  //  Scenario: view substance misuse questions
  //    Then I see the "substance misuse" page
  it('presents substance misuse page', function test() {
    Page.verifyOnPage(SubstanceMisusePage, this.application)
  })

  //  Scenario: complete page and navigate to next page in health needs task
  //    When I complete the substance misuse page questions
  //    When I continue to the next task / page
  //    Then I see the "physical health" page
  it('navigates to the next page (physical health) when complete', function test() {
    SubstanceMisusePage.visit(this.application)
    const page = new SubstanceMisusePage(this.application)
    page.describeIllegalSubstanceUse()
    page.describeSubstanceMisuseHistory()
    page.nameDrugAndAlcoholService()
    page.provideSubstituteMedicationDetails()
    page.provideNaloxoneDetails()
    page.clickSubmit()

    Page.verifyOnPage(PhysicalHealthPage, this.application)
  })
})
