//  Feature: user views list of all submitted applications
//    So that I can easily find a submitted application
//    As a user
//    I want to view a list of submitted applications
//
//  Scenario: viewing the list as an admin
//      Given I am logged in as an admin
//      When I visit the submitted applications list page
//      Then I see a list of all submitted applications
//
import SubmissionListPage from '../../pages/submissions/submissionListPage'
import submittedApplicationSummary from '../../../server/testutils/factories/submittedApplicationSummary'
import Page from '../../pages/page'

context('Submitted applications', () => {
  beforeEach(() => {
    cy.task('reset')

    const submittedApplication = submittedApplicationSummary.build({
      id: 'abc123',
      submittedAt: '2022-12-10T21:47:28Z',
      personName: 'Robert Smith',
      crn: 'CRN123',
      nomsNumber: 'NOMS456',
    })
    cy.wrap(submittedApplication).as('submittedApplication')
    cy.task('stubSubmittedApplicationsGet', { applications: [submittedApplication], page: 1 })
  })

  //  Scenario: viewing the dashboard page as an admin
  it('shows the submitted applications', function test() {
    // Given I am logged in as an admin
    cy.task('stubSignIn', ['ROLE_CAS2_ADMIN'])
    cy.task('stubAuthUser')
    cy.signIn()

    //  When I visit the submitted applications list page
    SubmissionListPage.visit([this.submittedApplication])
    const page = Page.verifyOnPage(SubmissionListPage)

    //  Then see the submitted applications
    page.shouldShowSubmittedApplications([this.submittedApplication])
    cy.task('stubSubmittedApplicationsGet', { applications: [this.submittedApplication], page: 2 })
    page.clickPageNumber('2')
    page.shouldShowSubmittedApplications([this.submittedApplication])
  })
})
