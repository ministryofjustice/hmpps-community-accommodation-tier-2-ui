//  Feature: Referrer completes 'care leaver' question page
//    So that I can complete the 'Equality questions' task
//    As a referrer
//    I want to answer questions on the care leaver page
//
//  Scenario: submits a valid answer to care leaver page
//    Given I'm on the 'care leaver' question page
//    When I give a valid answer
//    Then I am taken to the parental or carer responsibilities page

import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import CareLeaverPage from '../../../../pages/apply/about_the_person/equality_and_diversity/careLeaverPage'
import ParentalCarerResponsibilitiesPage from '../../../../pages/apply/about_the_person/equality_and_diversity/parentalCarerResponsibilitiesPage'
import Page from '../../../../pages/page'

context('Visit "About the applicant" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['equality-and-diversity-monitoring']['care-leaver'] = {}
      const application = applicationFactory.build({
        id: 'abc123',
        person,
      })
      application.data = applicationData
      cy.wrap(application).as('application')
      cy.wrap(application.data).as('applicationData')
    })
  })

  beforeEach(function test() {
    // And an application exists
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    // Given I am logged in
    //---------------------
    cy.signIn()

    // And I am on the care leaver page
    // --------------------------------
    CareLeaverPage.visit(this.application)

    Page.verifyOnPage(CareLeaverPage, this.application)
  })

  // Scenario: submits a valid answer to care leaver page
  // ----------------------------
  it('continues to the task list page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(CareLeaverPage, this.application)
    page.selectAnswer('isCareLeaver', 'yes')

    page.clickSubmit()

    // I am taken to the parental or carer responsibilities page
    Page.verifyOnPage(ParentalCarerResponsibilitiesPage, this.application)
  })
})
