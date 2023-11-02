//  Feature: Referrer completes 'identification' page
//    So that I can complete the "Funding information" task
//    As a referrer
//    I want to complete the 'identification' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'identification' page
//
//  Scenario: view 'identification' page
//    Then I see the "identification" page
//
//  Scenario: navigate to alternative ID page
//    When I select 'none'
//    And I continue to the next task / page
//    Then I am redirected to the alternative ID page
//
//  Scenario: navigate to national insurance number page
//    When I select a form of ID
//    And I continue to the next task / page
//    Then I am redirected to the national insurance number page

import Page from '../../../../pages/page'
import IdentificationPage from '../../../../pages/apply/area_and_funding/funding_information/identificationPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import AlternativeIdentificationPage from '../../../../pages/apply/area_and_funding/funding_information/AlternativeIDPage'
import NationalInsurancePage from '../../../../pages/apply/area_and_funding/funding_information/nationalInsurancePage'

context('Visit identification page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['funding-information'] = {}
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

    // And I am on the identification page
    // --------------------------------
    IdentificationPage.visit(this.application)
  })

  // Scenario: view 'identification' page
  // ----------------------------------------------
  it('displays the page', function test() {
    // Then I see the "identification" page
    Page.verifyOnPage(IdentificationPage, this.application)
  })

  // Scenario: navigate to alternative ID page
  // ----------------------------------------
  it('redirects to the alternative ID page', function test() {
    // When I select 'none'
    const page = Page.verifyOnPage(IdentificationPage, this.application)
    page.checkCheckboxByValue('none')

    // And I continue to the next task / page
    page.clickSubmit()

    // Then I am redirected to the alternative ID page
    Page.verifyOnPage(AlternativeIdentificationPage, this.application)
  })

  // Scenario: navigate to national insurance number page
  // ----------------------------------------
  it('redirects to the national insurance number page', function test() {
    // When I select a form of ID
    const page = Page.verifyOnPage(IdentificationPage, this.application)
    page.checkCheckboxByValue('passport')

    // And I continue to the next task / page
    page.clickSubmit()

    // Then I am redirected to the alternative ID page
    Page.verifyOnPage(NationalInsurancePage, this.application)
  })
})
