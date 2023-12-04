//  Feature: Referrer completes 'HDC licence dates' page
//    So that I can complete the "HDC licence and CPP details" task
//    As a referrer
//    I want to complete the 'HDC licence dates' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'HDC licence dates' page
//
//  Scenario: view 'HDC licence dates' page
//    Then I see the "HDC licence dates" page
//
//  Scenario: navigate to next page
//    When I complete the "HDC licence dates" page
//    And I continue to the next task / page
//    Then I am taken to the CPP details page
//
//  Scenario: date is pre-populated
//    When there is existing data for 'HDC licence dates' in the application
//    Then I see the dates on the page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import CPPDetailsPage from '../../../../pages/apply/offence_and_licence_information/hdc-licence-and-cpp-details/cppDetails'
import HDCLicenceDatesPage from '../../../../pages/apply/offence_and_licence_information/hdc-licence-and-cpp-details/hdcLicenceDates'

context('Visit "HDC licence dates" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['hdc-licence-and-cpp-details']
      const application = applicationFactory.build({
        id: 'abc123',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('application')
    })

    cy.fixture('applicationData.json').then(applicationData => {
      const application = applicationFactory.build({
        id: 'abc123',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('applicationWithData')
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

    // And I visit the 'HDC licence dates' page
    // --------------------------------
    HDCLicenceDatesPage.visit(this.application)
  })

  //  Scenario: view 'HDC licence dates' page
  // ----------------------------------------------

  it('presents HDC licence dates page', function test() {
    //  Then I see the "HDC licence dates" page
    Page.verifyOnPage(HDCLicenceDatesPage, this.application)
  })

  //  Scenario: navigate to next page
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    // When I complete the "HDC licence dates" page
    const page = Page.verifyOnPage(HDCLicenceDatesPage, this.application)
    page.completeForm()

    // When I continue to the next task / page
    page.clickSubmit()

    // Then I am taken to the CPP details page
    Page.verifyOnPage(CPPDetailsPage, this.application)
  })

  //  Scenario: date is pre-populated
  // ----------------------------------------------
  it('pre-populates date inputs', function test() {
    // When there is existing data for 'HDC licence dates' in the application
    cy.task('stubApplicationGet', { application: this.applicationWithData })
    HDCLicenceDatesPage.visit(this.applicationWithData)

    // Then I see the dates on the page
    const page = Page.verifyOnPage(HDCLicenceDatesPage, this.applicationWithData)
    page.shouldShowPrepopulatedDates()
  })
})
