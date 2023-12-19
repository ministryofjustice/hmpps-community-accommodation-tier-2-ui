//  Feature: Referrer completes disability question page
//    So that I can complete the 'Equality questions' task
//    As a referrer
//    I want to answer questions on the disability page
//
//  Scenario: submit 'other' disability type
//    Given I'm on the 'Do they have a disability?' page
//    When I submit an 'other' disability type
//    Then I return to the task list page
//    And I see that the task has been completed

import Page from '../../../../pages/page'
import { DisabilityPage, SexAndGenderPage } from '../../../../pages/apply/about_the_person/equality_and_diversity'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "About the applicant" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['equality-and-diversity-monitoring'] = { 'will-answer-equality-questions': {}, disability: {} }
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

    // And I am on the disability question page
    // --------------------------------
    cy.visit('applications/abc123/tasks/equality-and-diversity-monitoring/pages/disability')
    Page.verifyOnPage(DisabilityPage, this.application)
  })

  // Scenario: submit 'other' disability type
  // ----------------------------
  it('continues to task list page', function test() {
    // I submit an 'other' disability type
    const page = Page.verifyOnPage(DisabilityPage, this.application)
    page.enterOtherDisabilityType()

    page.clickSubmit()

    // I am taken to the 'sex and gender' page
    Page.verifyOnPage(SexAndGenderPage, this.application)
  })
})
