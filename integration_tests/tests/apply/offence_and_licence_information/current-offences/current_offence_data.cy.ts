//  Feature: Referrer completes 'Add current offence' page
//    So that I can complete the "Current offences" task
//    As a referrer
//    I want to complete the 'Add current offence' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the "Add current offence" page
//
//  Scenario: I fill in required information for a current offence
//    And I save and contnue
//    Then I am taken to the 'current offences' page
//
//  Scenario: Add another offence
//    Given I have filled in required information for an offence
//    When I save and add another
//    Then I am taken to a blank "Add current offence" page
//    And I see a success message

import CurrentOffenceDataPage from '../../../../pages/apply/offence_and_licence_information/current-offences/currentOffenceDataPage'
import CurrentOffencesPage from '../../../../pages/apply/offence_and_licence_information/current-offences/currentOffencesPage'
import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "Offence and licence" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['offending-history']
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

    // And I am on the "Add current offence" page
    // --------------------------------
    CurrentOffenceDataPage.visit(this.application)
  })

  //  Scenario: I fill in required information for a current offence
  //    When I continue to the next task / page
  //    Then I see the "current offences" page
  it('navigates to the next page', function test() {
    const page = new CurrentOffenceDataPage(this.application)

    page.addOffenceInformation()

    page.clickSubmit()

    Page.verifyOnPage(CurrentOffencesPage, this.application)
  })

  //  Scenario: Add another Offence
  it('returns to form when adding another', function test() {
    const page = new CurrentOffenceDataPage(this.application)

    //  Given I have filled in required information for an offence
    page.addOffenceInformation()

    //  When I save and add another
    page.clickAddAnother()

    //  Then I am taken to a blank "Add current offence" page
    Page.verifyOnPage(CurrentOffenceDataPage, this.application)
    page.assertFormisEmpty()

    //  And I see a success message
    page.shouldShowSuccessMessage('The offence has been saved')
  })
})
