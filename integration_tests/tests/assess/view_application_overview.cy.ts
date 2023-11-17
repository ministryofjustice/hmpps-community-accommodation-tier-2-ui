//  Feature: Assessor views a submitted application overview
//    So that I can assess a submitted application
//    As an external NACRO assessor
//    I want to view the overview of a particular submitted application
//
//  Scenario: visits submitted application overview page
//    Given a submitted application exists
//    And I am logged in as a NACRO assessor
//    When I visit the application overview for that application
//    Then I see the submitted application overview
//
//  Scenario: navigate to the 'update status' page
//    Given I'm viewing the submitted application overview
//    When I click the 'Update status' button
//    Then I am taken to the 'Update status' page

import { faker } from '@faker-js/faker'
import {
  externalUserFactory,
  statusUpdateFactory,
  submittedApplicationFactory,
} from '../../../server/testutils/factories/index'
import { DateFormats } from '../../../server/utils/dateUtils'
import SubmittedApplicationOverviewPage from '../../pages/assess/submittedApplicationOverviewPage'
import UpdateApplicationStatusPage from '../../pages/assess/updateApplicationStatusPage'
import Page from '../../pages/page'

context('Assessor views a submitted application overview', () => {
  const submittedApplication = submittedApplicationFactory.build({
    statusUpdates: [
      statusUpdateFactory.build({
        updatedAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
        updatedBy: externalUserFactory.build({ username: 'Anne_Assessor' }),
        name: 'moreInfoRequested',
        label: 'More information requested',
        description:
          'More information about the application has been requested from the POM (Prison Offender Manager).',
      }),
      statusUpdateFactory.build({
        updatedAt: DateFormats.dateObjToIsoDateTime(faker.date.future()),
        updatedBy: externalUserFactory.build({ username: 'Anne Other Assessor' }),
        name: 'awaitingDecision',
        label: 'Awaiting decision',
        description: 'All information has been received and the application is awaiting assessment.',
      }),
    ],
  })

  beforeEach(() => {
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

  //  Scenario: visits submitted application overview page
  // ----------------------------------------------
  it('displays submitted application overview', () => {
    // When I visit the application overview for that application
    const page = SubmittedApplicationOverviewPage.visit(submittedApplication)

    // Then I see the submitted application overview
    page.shouldShowApplicationSummaryDetails(submittedApplication)
    page.shouldShowTimeline(submittedApplication)
  })

  //  Scenario: navigate to the 'update status' page
  // ----------------------------------------------
  it('allows me to navigate to the update status page', function test() {
    //  Given I'm viewing the submitted application overview
    const page = SubmittedApplicationOverviewPage.visit(submittedApplication)

    //  When I click the 'Update status' button
    cy.task('stubGetApplicationStatuses')
    page.clickLink('Update application status')

    //  Then I am taken to the 'Update status' page
    Page.verifyOnPage(UpdateApplicationStatusPage, submittedApplication)
  })
})
