//  Feature: Referrer completes 'Add a behaviour note' page
//    So that I can complete the "RoSH" task
//    As a referrer
//    I want to complete the 'Add a behaviour note' page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am on the "Add a behaviour note" page
//
//  Scenario: I fill in required information for a behaviour note
//    And I save and contnue
//    Then I am taken back to the behaviour note page
//
//  Scenario: Add another behaviour note
//    Given I have filled in required information for a behaviour note
//    When I save and add another
//    Then I am taken to a blank "Add a behaviour note" page
//    And I see a success message

import BehaviourNotesPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/behaviourNotesPage'
import BehaviourNotesDataPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/behaviourNotesDataPage'
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

    // And I am on the "Add a behaviour note" page
    // --------------------------------
    BehaviourNotesDataPage.visit(this.application)
  })

  //  Scenario: I fill in required information for a behaviour note
  //    When I continue to the next task / page
  //    Then I see the "behaviour note" page
  it('navigates to the next page (behaviour note page)', function test() {
    const page = new BehaviourNotesDataPage(this.application)

    page.addNote()

    page.clickSubmit()

    Page.verifyOnPage(BehaviourNotesPage, this.application)

    cy.task('verifyApplicationUpdate', this.application.id).then(requests => {
      expect(requests).to.have.length(1)

      const body = JSON.parse(requests[0].body)

      cy.wrap(body.data['risk-of-serious-harm']['behaviour-notes-data'][0]).should(
        'have.property',
        'behaviourDetail',
        'some detail',
      )
    })
  })

  //  Scenario: Add another behaviour note
  it('returns to form when adding another', function test() {
    const page = new BehaviourNotesDataPage(this.application)

    //    Given I have filled in required information for a behaviour note
    page.addNote()

    //    When I save and add another
    page.clickAddAnother()

    //    Then I am taken to a blank "Add a behaviour note" page
    Page.verifyOnPage(BehaviourNotesDataPage, this.application)
    page.assertFormisEmpty()

    //  And I see a success message
    page.shouldShowSuccessMessage('The behaviour note has been saved')
  })
})
