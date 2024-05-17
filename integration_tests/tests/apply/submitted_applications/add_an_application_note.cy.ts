//  Feature: Referrer adds a note to a submitted application
//    So that I can communicate with assessors about a submitted application
//    As an referrer
//    I want to add a note to the application
//
//  Background:
//    Given a submitted application exists
//    And I am logged in as a referrer
//    When I visit the application overview for that application
//
//  Scenario: successfully add a note to an application
//    And I add a note
//    Then I see a success message
//
//  Scenario: fail to add a note to an application
//    And I add a note
//    Then I see an error message

import SubmittedApplicationOverviewPage from '../../../pages/apply/submittedApplicationOverviewPage'
import { applicationFactory, applicationNoteFactory } from '../../../../server/testutils/factories'
import { fullPersonFactory } from '../../../../server/testutils/factories/person'
import Page from '../../../pages/page'

context('Referrer adds a note to a submitted application', () => {
  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    // Given a submitted application exists
    cy.fixture('applicationData.json').then(applicationData => {
      cy.fixture('applicationDocument.json').then(applicationDocument => {
        const submittedApplication = applicationFactory.build({
          id: 'abc123',
          data: applicationData,
          document: applicationDocument,
          status: 'submitted',
          submittedAt: '2022-12-10T21:47:28Z',
          person: fullPersonFactory.build({ name: 'Robert Smith' }),
          telephoneNumber: '0800 123',
        })
        cy.wrap(submittedApplication).as('application')
      })
    })
  })

  beforeEach(function test() {
    // Given I am logged in as a referrer
    cy.signIn()

    // When I visit the application overview for that application
    cy.task('stubApplicationGet', { application: this.application })
    SubmittedApplicationOverviewPage.visit(this.application)
  })

  //  Scenario: successfully add a note to an application
  it('shows a success message', function test() {
    //  And I add a note
    const note = applicationNoteFactory.build()
    const page = Page.verifyOnPage(SubmittedApplicationOverviewPage, this.application)
    cy.task('stubAddNote', { applicationId: this.application.id, note })
    page.addANote()

    //  Then I see a success message
    page.shouldShowSuccessMessage('Your note was saved.')
  })

  //  Scenario: fail to add a note to an application
  it('shows an error message', function test() {
    //  And I add a note
    const page = Page.verifyOnPage(SubmittedApplicationOverviewPage, this.application)
    cy.task('stubAddNoteBadRequest', { applicationId: this.application.id })
    page.addANote()

    //   Then I see an error message
    page.shouldShowErrorMessage()
  })
})
