//  Feature: Referrer completes 'religion' question page
//    So that I can complete the 'Equality questions' task
//    As a referrer
//    I want to answer questions on the religion page
//
//  Scenario: submits a valid answer to religion page
//    Given I'm on the 'religion' question page
//    When I give a valid answer
//    Then I am taken to the military veteran page

import { ReligionPage } from '../../../../pages/apply/about_the_person/equality_and_diversity'
import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import MilitaryVeteranPage from '../../../../pages/apply/about_the_person/equality_and_diversity/militaryVeteranPage'

context('Visit "About the applicant" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['equality-and-diversity-monitoring'] = {}
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

    // And I am on the religion page
    // --------------------------------
    ReligionPage.visit(this.application)

    Page.verifyOnPage(ReligionPage, this.application)
  })

  // Scenario: select religion type
  // ----------------------------
  it('continues to the military veteran page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(ReligionPage, this.application)
    page.selectReligion()

    page.clickSubmit()

    // I am taken to the military veteran page
    Page.verifyOnPage(MilitaryVeteranPage, this.application)
  })
})
