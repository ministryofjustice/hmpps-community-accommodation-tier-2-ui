//  Feature: Referrer completes 'parental or carer responsibilities' question page
//    So that I can complete the 'Equality questions' task
//    As a referrer
//    I want to answer questions on the parental or carer responsibilities page
//
//  Scenario: submits a valid answer to parental or carer responsibilities page
//    Given I'm on the 'parental or carer responsibilities' question page
//    When I give a valid answer
//    Then I am taken to the marital status page

import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import ParentalCarerResponsibilitiesPage from '../../../../pages/apply/about_the_person/equality_and_diversity/parentalCarerResponsibilitiesPage'
import Page from '../../../../pages/page'
import MaritalStatusPage from '../../../../pages/apply/about_the_person/equality_and_diversity/maritalStatusPage'

context('Visit "About the applicant" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['equality-and-diversity-monitoring']['parental-or-carer-responsibilities'] = {}
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

    // And I am on the parental or carer responsibilities page
    // --------------------------------
    ParentalCarerResponsibilitiesPage.visit(this.application)

    Page.verifyOnPage(ParentalCarerResponsibilitiesPage, this.application)
  })

  // Scenario: submits a valid answer to parental or carer responsibilities page
  // ----------------------------
  it('continues to the task list page', function test() {
    // I submit my answersP
    const page = Page.verifyOnPage(ParentalCarerResponsibilitiesPage, this.application)
    page.selectAnswer('hasParentalOrCarerResponsibilities', 'yes')

    page.clickSubmit()

    // I am taken to the marital status page
    Page.verifyOnPage(MaritalStatusPage, this.application)
  })
})
