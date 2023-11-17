import { Cas2SubmittedApplication as SubmittedApplication, FullPerson } from '@approved-premises/api'
import Page from '../page'
import { DateFormats } from '../../../server/utils/dateUtils'

export default class SubmittedApplicationOverviewPage extends Page {
  constructor(private readonly application: SubmittedApplication) {
    const person = application.person as FullPerson
    super(person.name, person.name)
  }

  shouldShowApplicationSummaryDetails(application: SubmittedApplication): void {
    const person = application.person as FullPerson
    cy.get('h1').contains(person.name)
    cy.get('p').contains(
      `This application was submitted on ${DateFormats.isoDateToUIDate(application.submittedAt, {
        format: 'medium',
      })}.`,
    )
  }

  shouldShowTimeline(application: SubmittedApplication): void {
    const sortedTimelineEvents = application.statusUpdates.sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })

    cy.get('.moj-timeline').within(() => {
      cy.get('.moj-timeline__item').should('have.length', application.statusUpdates.length + 1)

      cy.get('.moj-timeline__item').each(($el, index) => {
        if (index !== application.statusUpdates.length) {
          cy.wrap($el).within(() => {
            cy.get('.moj-timeline__header').should('contain', sortedTimelineEvents[index].label)
            cy.get('time').should('have.attr', { time: sortedTimelineEvents[index].updatedAt })
            cy.get('time').should('contain', DateFormats.isoDateTimeToUIDateTime(sortedTimelineEvents[index].updatedAt))
          })
        } else {
          cy.wrap($el).within(() => {
            cy.get('.moj-timeline__header').should('contain', `Application submitted`)
            cy.get('.moj-timeline__byline').should('contain', `by ${application.submittedBy.name}`)
            cy.get('time').should('have.attr', { time: application.submittedAt })
            cy.get('time').should('contain', DateFormats.isoDateTimeToUIDateTime(application.submittedAt))
          })
        }
      })
    })
  }

  static visit(application: SubmittedApplication): SubmittedApplicationOverviewPage {
    cy.visit(`/assess/applications/${application.id}/overview`)
    return new SubmittedApplicationOverviewPage(application)
  }
}
