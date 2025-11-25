//  Feature: Referrer views a submitted application
//
//  Scenario: view a submitted application
//    Given I am logged in
//    And I have submitted an application
//    When I view a submitted application
//    Then I should see the read-only version of the answers submitted
//    And I see a print button

import { Cas2Application } from '@approved-premises/api'
import SubmissionPage from '../../../pages/submissions/submissionPage'
import { applicationFactory } from '../../../../server/testutils/factories'
import { fullPersonFactory } from '../../../../server/testutils/factories/person'

context('View submitted application', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    // I have submitted an application
    cy.fixture('applicationData.json').then(applicationData => {
      cy.fixture('applicationDocument.json').then(applicationDocument => {
        const application = applicationFactory.build({
          data: applicationData,
          document: applicationDocument,
          status: 'submitted',
          submittedAt: '2022-12-10T21:47:28Z',
          person: fullPersonFactory.build({ name: 'Robert Smith' }),
          telephoneNumber: '0800 123',
          isTransferredApplication: false,
        })
        cy.wrap(application).as('application')
      })
    })

    // Given I am logged in
    cy.signIn()
  })

  it('shows the submitted application', function test() {
    //  When I view a submitted application
    cy.task('stubApplications', [this.application])
    cy.task('stubApplicationGet', { application: this.application })

    const submittedApplicationPage = SubmissionPage.visit(this.application)
    //  Then I should see the read-only version of the answers submitted
    submittedApplicationPage.hasExpectedSummaryData()
    submittedApplicationPage.doesNotHaveUpdateStatusButton()
    submittedApplicationPage.hasApplicantDetails(this.application)
    submittedApplicationPage.hasSideNavBar(this.application)
    submittedApplicationPage.hasQuestionsAndAnswersFromDocument(this.application.document)

    //  And I see a print button
    submittedApplicationPage.shouldShowPrintButton()
  })

  it('when application is prison transfer it shows the submitted application and the application summary banner is the transferred application banner type', function test() {
    const transferredApplication: Cas2Application = {
      ...this.application,
      isTransferredApplication: true,
    }
    //  When I view a submitted application
    cy.task('stubApplications', [transferredApplication])
    cy.task('stubApplicationGet', { application: transferredApplication })

    const submittedApplicationPage = SubmissionPage.visit(transferredApplication)
    //  Then I should see the read-only version of the answers submitted
    submittedApplicationPage.hasExpectedSummaryDataForTransferredApplication(transferredApplication)
    submittedApplicationPage.doesNotHaveUpdateStatusButton()
    submittedApplicationPage.hasApplicantDetails(this.application)
    submittedApplicationPage.hasSideNavBar(this.application)
    submittedApplicationPage.hasQuestionsAndAnswersFromDocument(this.application.document)

    //  And I see a print button
    submittedApplicationPage.shouldShowPrintButton()
  })
})
