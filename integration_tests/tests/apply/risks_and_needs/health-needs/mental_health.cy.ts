//  Feature: Referrer completes 'Health needs: mental health' page
//    So that I can complete the "Health needs" task
//    As a referrer
//    I want to complete the 'mental health' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the mental health page
//
//  Scenario: view mental health questions
//    Then I see the "mental health" page
//
//  Scenario: complete page and navigate to next page in health needs task
//    When I complete the mental health page
//    And I continue to the next task / page
//    Then I see the "communication and language" page

import Page from '../../../../pages/page'
import MentalHealthPage from '../../../../pages/apply/risks_and_needs/health-needs/mentalHealthPage'
import CommunicationAndLanguagePage from '../../../../pages/apply/risks_and_needs/health-needs/communicationAndLanguagePage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "mental health" page', () => {
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

    // And I am on the mental health page
    // --------------------------------
    MentalHealthPage.visit(this.application)
  })

  //  Scenario: view mental health questions
  //    Then I see the "mental health" page
  it('presents mental health page', function test() {
    Page.verifyOnPage(MentalHealthPage, this.application)
  })

  //  Scenario: complete page and navigate to next page in health needs task
  //    When I complete the mental health page
  //    And I continue to the next task / page
  //    Then I see the "communication and language" page
  it('navigates to the next page (communication and language)', function test() {
    MentalHealthPage.visit(this.application)
    const page = new MentalHealthPage(this.application)

    page.describeNeeds()
    page.describeEngagement()
    page.describeMedication()

    page.clickSubmit()

    Page.verifyOnPage(CommunicationAndLanguagePage, this.application)
  })
})
