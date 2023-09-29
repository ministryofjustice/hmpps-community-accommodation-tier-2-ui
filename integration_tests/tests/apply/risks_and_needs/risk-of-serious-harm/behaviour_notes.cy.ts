//  Feature: Referrer completes 'Behaviour Notes' page
//    So that I can complete the "RoSH" task
//    As a referrer
//    I want to complete the 'Behaviour Notes' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the "Behaviour Notes" page
//
//  Scenario: there are existing Behaviour Notes in the application
//    Then I see a list of the existing Behaviour Notes on the "Behaviour Notes" page
//
//  Scenario: remove a Behaviour Notes
//    When I remove a Behaviour Note
//    Then the Behaviour Notes is no longer in the list of Behaviour Notes
//
//  Scenario: add a Behaviour Notes
//    When I choose to add a Behaviour Note
//    Then I am taken to the "Add a behaviour note" page
//
//  Scenario: there are no existing Behaviour Notes in the application
//    Then I see the "Behaviour Notes" page
//
//  Scenario: when I go to select another Behaviour Notes
//    Then I see the "Behaviour Notes data" page
//
//  Scenario: When I continue to the next task / page
//    Then I see the "Additional Information" page

import BehaviourNotesPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/behaviourNotesPage'
import BehaviourNotesDataPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/behaviourNotesDataPage'
import AdditionalRiskInformationPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/additionalRiskInformationPage'
import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "Risks and needs" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['risk-of-serious-harm']
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

    // And I am on the Behaviour Notes page
    // --------------------------------
    BehaviourNotesPage.visit(this.application)
  })

  //  Scenario: there are no existing Behaviour Notes in the application
  //    Then I see the "Behaviour Notes" page
  it('presents Behaviour Notes page', function test() {
    Page.verifyOnPage(BehaviourNotesPage, this.application)
  })

  //  Scenario: there are existing Behaviour Notes in the application
  //    Then I see a list of existing Behaviour Notes on the "Behaviour Notes" page
  it('presents Behaviour Notes page with existing Behaviour Notes', function test() {
    // When there is already imported data
    cy.task('stubApplicationGet', { application: this.applicationWithData })

    BehaviourNotesPage.visit(this.applicationWithData)

    const page = new BehaviourNotesPage(this.applicationWithData)
    page.hasListOfBehaviourNotes()
  })

  //  Scenario: remove a Behaviour Note

  it('removes an Behaviour Notes', function test() {
    // When there is already imported data
    cy.task('stubApplicationGet', { application: this.applicationWithData })

    BehaviourNotesPage.visit(this.applicationWithData)

    const page = new BehaviourNotesPage(this.applicationWithData)
    page.hasListOfBehaviourNotes()

    //    When I remove a Behaviour Notes
    // reset the application to have no data
    cy.task('stubApplicationGet', { application: this.application })
    page.clickRemove()
    //  Then the Behaviour Note is no longer in the list of Behaviour Notes
    page.hasNoBehaviourNotes()
  })

  //  Scenario: add a Behaviour Notes
  it('allows me to add a behaviour note', function test() {
    BehaviourNotesPage.visit(this.application)

    const page = new BehaviourNotesPage(this.applicationWithData)
    //    When I choose to add a Behaviour Note

    page.addABehaviourNote()

    //    Then I am taken to the "Add a behaviour note" page
    Page.verifyOnPage(BehaviourNotesDataPage, this.application)
  })

  //  Scenario: complete page and navigate to next page in health needs task
  //    When I continue to the next task / page
  //    Then I see the "additional risk information" page
  it('navigates to the next page (additional risk information)', function test() {
    BehaviourNotesPage.visit(this.application)
    const page = new BehaviourNotesPage(this.application)

    page.clickSubmit()

    Page.verifyOnPage(AdditionalRiskInformationPage, this.application)
  })
})
