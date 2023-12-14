//  Feature: Referrer completes 'pregnancy information' page
//    So that I can complete the "pregnancy information" task
//    As a referrer
//    I want to complete the 'pregnancy information' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'pregnancy information' page
//
//  Scenario: view 'pregnancy information' page
//    Then I see the "pregnancy information" page
//
//  Scenario: navigate to the support worker preference page
//    When I complete the "pregnancy information" page
//    And I continue to the next task / page
//    Then I am taken to the support worker preference page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import PregnancyInformationPage from '../../../../pages/apply/about_the_person/personal_information/pregnancyInformationPage'
import SupportWorkerPreferencePage from '../../../../pages/apply/about_the_person/personal_information/supportWorkerPreferencePage'

context('Visit "pregnancy information" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['personal-information']['pregnancy-information']
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

    // And I visit the 'pregnancy information' page
    // --------------------------------
    PregnancyInformationPage.visit(this.application)
  })

  //  Scenario: view 'pregnancy information' page
  // ----------------------------------------------

  it('presents pregnancy information page', function test() {
    //    Then I see the "pregnancy information" page
    Page.verifyOnPage(PregnancyInformationPage, this.application)
  })

  //  Scenario: navigate to the support worker preference page
  // ----------------------------------------------
  it('navigates to the support worker preference page', function test() {
    //    When I complete the "pregnancy information" page
    const page = Page.verifyOnPage(PregnancyInformationPage, this.application)
    page.completeForm()

    //    When I continue to the next task / page
    page.clickSubmit()

    //    Then I am taken to the support worker preference next page
    Page.verifyOnPage(SupportWorkerPreferencePage, this.application)
  })
})
