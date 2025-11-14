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
import { applicationFactory, timelineEventsFactory, assessmentFactory } from '../../../../server/testutils/factories'
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
          data: applicationData,
          document: applicationDocument,
          status: 'submitted',
          submittedAt: '2022-12-10T21:47:28Z',
          person: fullPersonFactory.build({ name: 'Robert Smith' }),
          telephoneNumber: '0800 123',
          assessment: assessmentFactory.build(),
          timelineEvents: [
            timelineEventsFactory.build({
              occurredAt: DateFormats.dateObjToIsoDateTime(faker.date.future()),
              createdByName: 'Anne Other Assessor',
              label: 'Awaiting decision',
              body: null,
            }),
            timelineEventsFactory.build({
              occurredAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
              createdByName: 'Anne Assessor',
              label: 'More information requested',
              body: 'Personal information',
            }),
            timelineEventsFactory.build({
              occurredAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
              type: 'cas2_note',
              createdByName: 'Anne Assessor',
              label: 'Note',
              body: 'Note text',
            }),
            timelineEventsFactory.build({
              occurredAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
              type: 'cas2_application_submitted',
              createdByName: 'Anne Assessor',
              label: 'Application submitted',
              body: null,
            }),
            timelineEventsFactory.build({
              occurredAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
              type: 'cas2_prison_transfer',
              createdByName: 'Anne Assessor',
              label: 'Prison transfer',
            }),
            timelineEventsFactory.build({
              occurredAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
              type: 'cas2_new_pom_assigned',
              label: 'New prison offender manager assigned',
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
