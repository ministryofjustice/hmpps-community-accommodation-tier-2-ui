//  Feature: Referrer completes 'RoSH summary' page
//    So that I can complete the "Risk of serious harm" task
//    As a referrer
//    I want to complete the 'RoSH summary' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I visit the 'RoSH summary' page
//
//  Scenario: view 'RoSH summary' page
//    Then I see the "RoSH summary" page
//
//  Scenario: view risk summary data
//    Given there is risk summary data
//    Then I see the data presented on the page
//
//  Scenario: view 'unknown RoSH' card
//    Given there is no risk summary data
//    Then I see the unknown RoSH card
//
//  Scenario: navigate to next page in "Risk of serious harm" task
//    When I add an additional comment
//    And I continue to the next task / page
//    Then I see the "Who is at risk" page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import RoshSummaryPage from '../../../../pages/apply/risks_and_needs/risk-of-serious-harm/roshSummaryPage'
import { SummaryData } from '../../../../../server/form-pages/apply/risks-and-needs/risk-of-serious-harm/summary'
import WhoIsAtRiskPage from '../../../../pages/apply/risks_and_needs/risk-of-serious-harm/whoIsAtRiskPage'

context('Visit "RoSH summary" page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })
  let riskSummaryData: SummaryData

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      riskSummaryData = applicationData['risk-of-serious-harm']['summary-data']
      const application = applicationFactory.build({
        id: 'abc123',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('application')
    })

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['risk-of-serious-harm'].summary.additionalComments
      const application = applicationFactory.build({
        id: 'abc1234',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('applicationWithoutAdditionalComments')
    })

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['risk-of-serious-harm']['summary-data']
      const application = applicationFactory.build({
        id: 'abc1234',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('applicationWithoutSummaryData')
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

    // And I visit the 'RoSH summary' page
    // --------------------------------
    RoshSummaryPage.visit(this.application)
  })

  //  Scenario: view 'RoSH summary' page
  // ----------------------------------------------

  it('presents RoSH summary page', function test() {
    //    Then I see the "RoSH summary" page
    Page.verifyOnPage(RoshSummaryPage, this.application)
  })

  //  Scenario: view risk summary data
  // ----------------------------------------------
  it('presents risk data', function test() {
    const page = Page.verifyOnPage(RoshSummaryPage, this.application)

    //    Then I see the data presented on the page
    page.shouldShowRiskData(
      riskSummaryData,
      this.application.data['risk-of-serious-harm']['oasys-import'].oasysImportedDate,
    )
  })

  //  Scenario: view 'unknown RoSH' card
  // ----------------------------------------------
  it('presents unknown risk card', function test() {
    //    Given there is no risk summary data
    cy.task('stubApplicationGet', { application: this.applicationWithoutSummaryData })
    RoshSummaryPage.visit(this.applicationWithoutSummaryData)
    const page = Page.verifyOnPage(RoshSummaryPage, this.application)

    //    Then I see the unknown RoSH card
    page.shouldShowUnknownRoshCard()
  })

  //  Scenario: navigate to next page in "Risk of serious harm" task
  // ----------------------------------------------
  it('navigates to the next page', function test() {
    cy.task('stubApplicationGet', { application: this.applicationWithoutAdditionalComments })

    //    When I add an additional comment
    const page = Page.verifyOnPage(RoshSummaryPage, this.application)
    page.clickAddComments()
    page.getTextInputByIdAndEnterDetails('additionalComments', 'some additional comments')

    //    When I continue to the next task / page
    page.clickSubmit()

    //    Then I see the "Who is at risk" page
    Page.verifyOnPage(WhoIsAtRiskPage, this.application)
  })
})
