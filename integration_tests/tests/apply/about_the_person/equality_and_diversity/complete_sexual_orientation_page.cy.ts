//  Feature: Referrer completes 'Sexual orientation' question page
//    So that I can complete the 'Equality questions' task
//    As a referrer
//    I want to answer questions on the sexual orientation page
//
//  Scenario: submit sexual orientation answers
//    Given I'm on the 'Sexual orientation' question page
//    When I give valid answers to the 'Sexual orientation' questions
//    Then I am taken to the 'Ethnic group' question

import Page from '../../../../pages/page'
import { EthnicGroupPage, SexualOrientationPage } from '../../../../pages/apply/about_the_person/equality_and_diversity'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "About the applicant" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['equality-and-diversity-monitoring']['sexual-orientation'] = {}
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

    // And I am on the sexual orientation page
    // --------------------------------
    cy.visit('applications/abc123/tasks/equality-and-diversity-monitoring/pages/sexual-orientation')
    Page.verifyOnPage(SexualOrientationPage, this.application)
  })

  // Scenario: select orientation
  // ----------------------------
  it('continues to task list page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(SexualOrientationPage, this.application)
    page.selectOrientation()

    page.clickSubmit()

    Page.verifyOnPage(EthnicGroupPage, this.application)
  })
})
