//  Feature: Referrer completes 'working mobile phone' page
//    So that I can complete the "working mobile phone" task
//    As a referrer
//    I want to complete the 'working mobile phone' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'working mobile phone' page
//
//  Scenario: view 'working mobile phone' page
//    Then I see the "working mobile phone" page
//
//  Scenario: navigate to the next page on completion of task
//    When I complete the "working mobile phone" page
//    And I continue to the next task / page
//    Then I am taken to the immigration status page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import WorkingMobilePhonePage from '../../../../pages/apply/about_the_person/personal_information/workingMobilePhonePage'
import ImmigrationStatusPage from '../../../../pages/apply/about_the_person/personal_information/immigrationStatusPage'

context('Visit "working mobile phone" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['working-mobile-phone']
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

    // And I visit the 'working mobile phone' page
    // --------------------------------
    WorkingMobilePhonePage.visit(this.application)
  })

  //  Scenario: view 'working mobile phone' page
  // ----------------------------------------------

  it('presents working mobile phone page', function test() {
    //    Then I see the "working mobile phone" page
    Page.verifyOnPage(WorkingMobilePhonePage, this.application)
  })

  //  Scenario: navigate to the next page
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    //    When I complete the "working mobile phone" page
    const page = Page.verifyOnPage(WorkingMobilePhonePage, this.application)
    page.completeForm()

    //    When I continue to the next task / page
    page.clickSubmit()

    //    Then I am taken to the immigration status next page
    Page.verifyOnPage(ImmigrationStatusPage, this.application)
  })
})
