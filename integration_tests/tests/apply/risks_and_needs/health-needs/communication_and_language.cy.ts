//  Feature: Referrer completes 'Health needs: communication and language' page
//    So that I can complete the "Health needs" task
//    As a referrer
//    I want to complete the 'communication and language' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the communication and language page
//
//  Scenario: view communication and language questions
//    Then I see the "communication and language" page
//
//  Scenario: complete page and navigate to next page in health needs task
//    When I complete the communication and language page
//    And I continue to the next task / page
//    Then I see the "learning difficulties" page

import Page from '../../../../pages/page'
import CommunicationAndLanguage from '../../../../pages/apply/risks_and_needs/health-needs/communicationAndLanguagePage'
import LearningDifficultiesPage from '../../../../pages/apply/risks_and_needs/health-needs/learningDifficultiesPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "communication and language" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['health-needs'] = {}
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

    // And I am on the communication and language page
    // --------------------------------
    CommunicationAndLanguage.visit(this.application)
  })

  //  Scenario: view communication and language questions
  //    Then I see the "communication and language" page
  it('presents communication and language page', function test() {
    Page.verifyOnPage(CommunicationAndLanguage, this.application)
  })

  //  Scenario: complete page and navigate to next page in health needs task
  //    When I complete the communication and language page
  //    And I continue to the next task / page
  //    Then I see the "learning difficulties" page
  it('navigates to the next page (learning difficulties)', function test() {
    CommunicationAndLanguage.visit(this.application)
    const page = new CommunicationAndLanguage(this.application)

    page.specifyInterpretationNeeds()
    page.describeSupportNeeded()

    page.clickSubmit()

    Page.verifyOnPage(LearningDifficultiesPage, this.application)
  })
})
