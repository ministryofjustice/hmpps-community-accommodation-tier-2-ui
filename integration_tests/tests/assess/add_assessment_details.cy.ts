//  Feature: Assessor adds assessment details
//    So that I can distinguish between submitted applications
//    As an external NACRO assessor
//    I want to add assessment details to a submitted application
//  Scenario: saves assessment details
//    Given a submitted application exists
//    And I am logged in as a NACRO assessor
//    When I visit the add assessment details page for that application
//    And I enter assessment details
//    Then I should see a success message
//    And the assessment details
//  Scenario: saves if only the assessor name is given
//    Given a submitted application exists
//    And I am logged in as a NACRO assessor
//    When I visit the add assessment details page for that application
//    And I enter the assessor name
//    Then I should see a success message
//    And the assessment details
//  Scenario: saves if only the nacro referral ID is given
//    Given a submitted application exists
//    And I am logged in as a NACRO assessor
//    When I visit the add assessment details page for that application
//    And I enter the nacro referral ID
//    Then I should see a success message
//    And the assessment details
//  Scenario: saves when no assessment details are given
//    Given a submitted application exists
//    And I am logged in as a NACRO assessor
//    When I visit the add assessment details page for that application
//    And I enter no assessment details
//    Then I should see a success message
//    And the assessment details
//  Scenario: updates assessment details
//    Given a submitted application exists
//    And I am logged in as a NACRO assessor
//    When I visit the add assessment details page for that application
//    And I enter assessment details
//    Then I should see a success message
//

import AddAssessmentDetailsPage from '../../pages/assess/addAssessmentDetailsPage'
import SubmittedApplicationOverviewPage from '../../pages/assess/submittedApplicationOverviewPage'
import { assessmentFactory, submittedApplicationFactory } from '../../../server/testutils/factories'
import Page from '../../pages/page'

context('Assessor adds assessment details to submitted application', () => {
  let assessment = assessmentFactory.build({ nacroReferralId: null, assessorName: null })
  let submittedApplication = submittedApplicationFactory.build({ assessment })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAssessorUser')
  })

  beforeEach(() => {
    // Given a submitted application exists
    cy.task('stubSubmittedApplicationGet', { application: submittedApplication })

    // And I am logged in as a NACRO assessor
    cy.signIn()
  })

  it('saves assessment details', () => {
    // When I visit the add assessment details page for that application
    const page = SubmittedApplicationOverviewPage.visit(submittedApplication)
    page.clickAssessmentDetailsLink()
    const assessmentPage = Page.verifyOnPage(AddAssessmentDetailsPage, submittedApplication)

    // And I enter assessment details
    const assessorName = 'John Doe'
    const nacroReferralId = '123456'

    cy.task('stubAssessmentPut', { assessment: submittedApplication.assessment })
    cy.task('stubSubmittedApplicationGet', {
      application: {
        ...submittedApplication,
        assessment: { ...submittedApplication.assessment, nacroReferralId, assessorName },
      },
    })

    assessmentPage.addAssessorName(assessorName)
    assessmentPage.addNacroReferralId(nacroReferralId)
    assessmentPage.saveAssessmentDetails()

    // Then I should see a success message
    const overviewPage = Page.verifyOnPage(SubmittedApplicationOverviewPage, submittedApplication)
    overviewPage.shouldShowSuccessMessage('Assessment details were saved')

    // And the assessment details
    overviewPage.shouldShowAssessmentDetails(assessorName, nacroReferralId)
  })

  it('saves if only assessor name given', () => {
    // When I visit the add assessment details page for that application
    const page = AddAssessmentDetailsPage.visit(submittedApplication)

    // And I enter the assessor name
    const assessorName = 'Aadland Bertrand'

    cy.task('stubAssessmentPut', { assessment: submittedApplication.assessment })
    cy.task('stubSubmittedApplicationGet', {
      application: {
        ...submittedApplication,
        assessment: { ...submittedApplication.assessment, assessorName },
      },
    })
    page.addAssessorName(assessorName)
    page.saveAssessmentDetails()

    // Then I should see a success message
    const overviewPage = Page.verifyOnPage(SubmittedApplicationOverviewPage, submittedApplication)
    overviewPage.shouldShowSuccessMessage('Assessment details were saved')

    // And the assessment details
    overviewPage.shouldShowAssessmentDetails(assessorName)
  })

  it('saves if only nacro referral ID is given', () => {
    // When I visit the add assessment details page for that application
    const page = AddAssessmentDetailsPage.visit(submittedApplication)

    // And I enter the nacro referral ID
    const nacroReferralId = '222'

    cy.task('stubAssessmentPut', { assessment: submittedApplication.assessment })
    cy.task('stubSubmittedApplicationGet', {
      application: {
        ...submittedApplication,
        assessment: { ...submittedApplication.assessment, nacroReferralId },
      },
    })
    page.addNacroReferralId(nacroReferralId)
    page.saveAssessmentDetails()

    // Then I should see a success message
    const overviewPage = Page.verifyOnPage(SubmittedApplicationOverviewPage, submittedApplication)
    overviewPage.shouldShowSuccessMessage('Assessment details were saved')

    // And the assessment details
    overviewPage.shouldShowAssessmentDetails(undefined, nacroReferralId)
  })

  it('saves when no assessment details are given', () => {
    // When I visit the add assessment details page for that application
    const page = AddAssessmentDetailsPage.visit(submittedApplication)

    // And I enter no assessment details
    cy.task('stubAssessmentPut', { assessment: submittedApplication.assessment })
    page.saveAssessmentDetails()

    // Then I should see a success message
    const overviewPage = Page.verifyOnPage(SubmittedApplicationOverviewPage, submittedApplication)
    overviewPage.shouldShowSuccessMessage('Assessment details were saved')

    // And the assessment details
    overviewPage.shouldShowAssessmentDetails()
  })

  it('updates assessment details', () => {
    assessment = assessmentFactory.build({ nacroReferralId: '654321', assessorName: 'Jane Doe' })
    submittedApplication = submittedApplicationFactory.build({ assessment })

    // Given a submitted application exists
    cy.task('stubSubmittedApplicationGet', { application: submittedApplication })

    // When I visit the add assessment details page for that application
    const overviewPage = SubmittedApplicationOverviewPage.visit(submittedApplication)
    overviewPage.clickAssessmentDetailsLink(true)
    const assessmentPage = Page.verifyOnPage(AddAssessmentDetailsPage, submittedApplication)

    // And I enter assessment details
    const assessorName = 'New assessor'
    const nacroReferralId = '111000'

    cy.task('stubAssessmentPut', { assessment: submittedApplication.assessment })
    cy.task('stubSubmittedApplicationGet', {
      application: {
        ...submittedApplication,
        assessment: { ...submittedApplication.assessment, nacroReferralId, assessorName },
      },
    })

    assessmentPage.addAssessorName(assessorName)
    assessmentPage.addNacroReferralId(nacroReferralId)
    assessmentPage.saveAssessmentDetails()

    // Then I should see a success message
    overviewPage.shouldShowSuccessMessage('Assessment details were saved')

    // And the assessment details
    overviewPage.shouldShowAssessmentDetails(assessorName, nacroReferralId)
  })
})
