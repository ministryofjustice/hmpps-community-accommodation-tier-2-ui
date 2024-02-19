//  Feature: Referrer views a submitted application overview
//    So that I can revisit a submitted application
//    As an referrer
//    I want to view the overview of a particular submitted application
//
//  Scenario: visits submitted application overview page
//    Given a submitted application exists
//    And I am logged in as a referrer
//    When I visit the application overview for that application
//    Then I see the submitted application overview

import { faker } from '@faker-js/faker'
import { DateFormats } from '../../../../server/utils/dateUtils'
import SubmittedApplicationOverviewPage from '../../../pages/apply/submittedApplicationOverviewPage'
import { externalUserFactory, statusUpdateFactory, applicationFactory } from '../../../../server/testutils/factories'
import { fullPersonFactory } from '../../../../server/testutils/factories/person'
import Page from '../../../pages/page'

context('View submitted application overview', () => {
  beforeEach(() => {
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
          statusUpdates: [
            statusUpdateFactory.build({
              updatedAt: DateFormats.dateObjToIsoDateTime(faker.date.future()),
              updatedBy: externalUserFactory.build({ name: 'Anne Other Assessor' }),
              name: 'awaitingDecision',
              label: 'Awaiting decision',
              description: 'All information has been received and the application is awaiting assessment.',
            }),
            statusUpdateFactory.build({
              updatedAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
              updatedBy: externalUserFactory.build({ name: 'Anne Assessor' }),
              name: 'moreInfoRequested',
              label: 'More information requested',
              description:
                'More information about the application has been requested from the POM (Prison Offender Manager).',
            }),
          ],
        })
        cy.wrap(submittedApplication).as('application')
      })
    })

    // Given I am logged in
    cy.signIn()
  })

  it('shows the submitted application', function test() {
    //  When I visit the submitted application overview page
    cy.task('stubApplicationGet', { application: this.application })

    SubmittedApplicationOverviewPage.visit(this.application)

    // Then I see the submitted application overview
    const page = Page.verifyOnPage(SubmittedApplicationOverviewPage, this.application)
    page.shouldShowApplicationSummaryDetails(this.application)
    page.shouldShowTimeline(this.application)
  })
})
