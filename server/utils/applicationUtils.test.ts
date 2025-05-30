import { QuestionAndAnswer } from '@approved-premises/ui'

import { applicationFactory, applicationSummaryFactory } from '../testutils/factories'

import {
  documentSummaryListRows,
  assessmentsTableRows,
  getStatusTag,
  prisonDashboardTableRows,
  hasOasys,
  arePreTaskListTasksIncomplete,
  indexTabItems,
  getStatusTagColourByName,
} from './applicationUtils'

import submittedApplicationSummary from '../testutils/factories/submittedApplicationSummary'

describe('indexTabItems', () => {
  const inProgressApplicationA = applicationSummaryFactory.build({ personName: 'A', createdAt: '2022-11-10T21:47:28Z' })
  const inProgressApplicationB = applicationSummaryFactory.build({ personName: 'B', createdAt: '2022-11-11T21:47:28Z' })
  const submittedApplicationA = applicationSummaryFactory.build({
    personName: 'A',
    submittedAt: '2022-12-10T21:47:28Z',
  })
  const submittedApplicationB = applicationSummaryFactory.build({
    personName: 'B',
    submittedAt: '2022-12-11T21:47:28Z',
  })

  const transferredApplication = applicationSummaryFactory.build({
    personName: 'B',
    submittedAt: '2022-12-11T21:47:28Z',
  })

  const result = indexTabItems({
    inProgress: [inProgressApplicationA, inProgressApplicationB],
    submitted: [submittedApplicationA, submittedApplicationB],
    transferredOut: [transferredApplication],
  })

  it('returns data for In Progress tab', () => {
    expect(result.inProgressTab).toEqual({
      label: 'In progress',
      id: 'applications',
      headings: [
        {
          text: 'Person',
        },
        {
          text: 'Prison number',
        },
        {
          text: 'Case reference number (CRN)',
        },
        {
          text: 'Date started',
        },
        {
          text: 'Actions',
        },
      ],
      rows: [
        [
          {
            html: `<a href=/applications/${inProgressApplicationA.id} data-cy-id="${inProgressApplicationA.id}">A</a>`,
          },
          {
            text: inProgressApplicationA.nomsNumber,
          },
          {
            text: inProgressApplicationA.crn,
          },
          {
            text: '10 November 2022',
          },
          {
            html: `<a id="cancel-${inProgressApplicationA.id}" href=/applications/${inProgressApplicationA.id}/cancel>Cancel</a>`,
          },
        ],
        [
          {
            html: `<a href=/applications/${inProgressApplicationB.id} data-cy-id="${inProgressApplicationB.id}">B</a>`,
          },
          {
            text: inProgressApplicationB.nomsNumber,
          },
          {
            text: inProgressApplicationB.crn,
          },
          {
            text: '11 November 2022',
          },
          {
            html: `<a id="cancel-${inProgressApplicationB.id}" href=/applications/${inProgressApplicationB.id}/cancel>Cancel</a>`,
          },
        ],
      ],
    })
  })

  it('returns data for submitted tab', () => {
    expect(result.submittedTab).toEqual({
      label: 'Submitted',
      id: 'submitted',
      headings: [
        {
          text: 'Person',
        },
        {
          text: 'Prison number',
        },
        {
          text: 'Case reference number (CRN)',
        },
        {
          text: 'Date submitted',
        },
        {
          text: 'Status',
        },
      ],
      rows: [
        [
          {
            html: `<a href=/applications/${submittedApplicationA.id}/overview data-cy-id="${submittedApplicationA.id}">A</a>`,
          },
          {
            text: submittedApplicationA.nomsNumber,
          },
          {
            text: submittedApplicationA.crn,
          },
          {
            text: '10 December 2022',
          },
          {
            html: '<strong class="govuk-tag govuk-tag--light-blue">More information requested</strong>',
          },
        ],
        [
          {
            html: `<a href=/applications/${submittedApplicationB.id}/overview data-cy-id="${submittedApplicationB.id}">B</a>`,
          },
          {
            text: submittedApplicationB.nomsNumber,
          },
          {
            text: submittedApplicationB.crn,
          },
          {
            text: '11 December 2022',
          },
          {
            html: '<strong class="govuk-tag govuk-tag--light-blue">More information requested</strong>',
          },
        ],
      ],
    })
  })
})

describe('prisonDashboardTableRows', () => {
  it('returns an array of applications as table rows', async () => {
    const applicationA = applicationSummaryFactory.build({
      personName: 'A',
      hdcEligibilityDate: '2024-12-10T21:47:28Z',
    })
    const applicationB = applicationSummaryFactory.build({
      personName: 'B',
      hdcEligibilityDate: '2024-12-11T21:47:28Z',
    })

    const result = prisonDashboardTableRows([applicationA, applicationB])

    expect(result).toEqual([
      [
        {
          html: `<a href=/applications/${applicationA.id}/overview data-cy-id="${applicationA.id}">A</a>`,
        },
        {
          text: applicationA.nomsNumber,
        },
        {
          text: applicationA.allocatedPomName,
        },
        {
          text: '10 December 2024',
        },
        {
          html: '<strong class="govuk-tag govuk-tag--light-blue">More information requested</strong>',
        },
      ],
      [
        {
          html: `<a href=/applications/${applicationB.id}/overview data-cy-id="${applicationB.id}">B</a>`,
        },
        {
          text: applicationB.nomsNumber,
        },
        {
          text: applicationB.allocatedPomName,
        },
        {
          text: '11 December 2024',
        },
        {
          html: '<strong class="govuk-tag govuk-tag--light-blue">More information requested</strong>',
        },
      ],
    ])
  })

  it('returns null for hdcEligibilityDate if it is undefined', async () => {
    const applicationA = applicationSummaryFactory.build({
      personName: 'A',
      hdcEligibilityDate: null,
    })
    const applicationB = applicationSummaryFactory.build({
      personName: 'B',
      hdcEligibilityDate: '2024-12-11T21:47:28Z',
    })

    const result = prisonDashboardTableRows([applicationA, applicationB])

    expect(result).toEqual([
      [
        {
          html: `<a href=/applications/${applicationA.id}/overview data-cy-id="${applicationA.id}">A</a>`,
        },
        {
          text: applicationA.nomsNumber,
        },
        {
          text: applicationA.allocatedPomName,
        },
        null,
        {
          html: '<strong class="govuk-tag govuk-tag--light-blue">More information requested</strong>',
        },
      ],
      [
        {
          html: `<a href=/applications/${applicationB.id}/overview data-cy-id="${applicationB.id}">B</a>`,
        },
        {
          text: applicationB.nomsNumber,
        },
        {
          text: applicationB.allocatedPomName,
        },
        {
          text: '11 December 2024',
        },
        {
          html: '<strong class="govuk-tag govuk-tag--light-blue">More information requested</strong>',
        },
      ],
    ])
  })
})

describe('assessmentsTableRows', () => {
  it('returns an array of applications as table rows', async () => {
    const applicationA = submittedApplicationSummary.build({
      submittedAt: '2022-12-10T21:47:28Z',
      personName: 'A',
    })
    const applicationB = submittedApplicationSummary.build({
      submittedAt: '2022-12-11T21:47:28Z',
      personName: 'B',
    })

    const result = assessmentsTableRows([applicationA, applicationB])

    expect(result).toEqual([
      [
        {
          html: `<a href=/assess/applications/${applicationA.id}/overview data-cy-id="${applicationA.id}">A</a>`,
        },
        {
          text: applicationA.nomsNumber,
        },
        {
          text: applicationA.crn,
        },
        {
          text: '10 December 2022',
        },
      ],
      [
        {
          html: `<a href=/assess/applications/${applicationB.id}/overview data-cy-id="${applicationB.id}">B</a>`,
        },
        {
          text: applicationB.nomsNumber,
        },
        {
          text: applicationB.crn,
        },
        {
          text: '11 December 2022',
        },
      ],
    ])
  })
})

describe('documentSummaryListRows', () => {
  it('returns an array of summary list rows', () => {
    const questionsAndAnswers: Array<QuestionAndAnswer> = [
      { question: 'Question 1', answer: 'Answer 1' },
      { question: 'Question 2', answer: 'Answer 2' },
    ]
    const rows = documentSummaryListRows(questionsAndAnswers)
    expect(rows).toEqual([
      {
        key: { html: 'Question 1' },
        value: { html: 'Answer 1' },
      },
      {
        key: { html: 'Question 2' },
        value: { html: 'Answer 2' },
      },
    ])
  })

  describe('getStatusTag', () => {
    it('returns the correct HTML string', () => {
      const expected = `<strong class="govuk-tag govuk-tag--light-blue">More information requested</strong>`
      expect(getStatusTag('More information requested', 'f5cd423b-08eb-4efb-96ff-5cc6bb073905')).toEqual(expected)
    })

    it('returns the Received string if status is undefined', () => {
      const expected = `<strong class="govuk-tag govuk-tag--grey">Received</strong>`
      expect(getStatusTag(undefined, undefined)).toEqual(expected)
    })
  })

  describe('getStatusTagColourByName', () => {
    it('returns "light-blue" for "moreInfoRequested"', () => {
      expect(getStatusTagColourByName('moreInfoRequested')).toEqual('light-blue')
    })

    it('returns "yellow" for "awaitingDecision"', () => {
      expect(getStatusTagColourByName('awaitingDecision')).toEqual('yellow')
    })

    it('returns "yellow" for "onWaitingList"', () => {
      expect(getStatusTagColourByName('onWaitingList')).toEqual('yellow')
    })

    it('returns "purple" for "placeOffered"', () => {
      expect(getStatusTagColourByName('placeOffered')).toEqual('purple')
    })

    it('returns "green" for "offerAccepted"', () => {
      expect(getStatusTagColourByName('offerAccepted')).toEqual('green')
    })

    it('returns "orange" for "offerDeclined"', () => {
      expect(getStatusTagColourByName('offerDeclined')).toEqual('orange')
    })

    it('returns "pink" for "withdrawn"', () => {
      expect(getStatusTagColourByName('withdrawn')).toEqual('pink')
    })

    it('returns "pink" for "cancelled"', () => {
      expect(getStatusTagColourByName('cancelled')).toEqual('pink')
    })

    it('returns "green" for "awaitingArrival"', () => {
      expect(getStatusTagColourByName('awaitingArrival')).toEqual('green')
    })

    it('returns "grey" for an unknown status', () => {
      expect(getStatusTagColourByName('unknownStatus')).toEqual('grey')
    })

    it('returns "grey" for an empty string', () => {
      expect(getStatusTagColourByName('')).toEqual('grey')
    })

    it('returns "grey" for undefined', () => {
      expect(getStatusTagColourByName(undefined)).toEqual('grey')
    })

    it('returns "grey" for null', () => {
      expect(getStatusTagColourByName(null)).toEqual('grey')
    })
  })

  describe('hasOasys', () => {
    it('returns true when there is an oasys import date', () => {
      const application = applicationFactory.build({
        data: {
          'risk-to-self': {
            'oasys-import': {
              oasysImportedDate: '2023-09-21T15:47:51.430Z',
              oasysStartedDate: '2023-09-10',
              oasysCompletedDate: '2023-09-11',
            },
          },
        },
      })

      expect(hasOasys(application, 'risk-to-self')).toEqual(true)
    })

    it('returns true when there is an old oasys', () => {
      const application = applicationFactory.build({
        data: {
          'risk-of-serious-harm': {
            'old-oasys': {
              hasOldOasys: 'yes',
              oasysCompletedDate: '2023-09-11',
            },
          },
        },
      })

      expect(hasOasys(application, 'risk-of-serious-harm')).toEqual(true)
    })

    it('returns false when there is no import date or old oasys', () => {
      const application = applicationFactory.build({
        data: {
          'risk-of-serious-harm': {
            'old-oasys': {
              hasOldOasys: 'no',
              oasysCompletedDate: '2023-09-11',
            },
          },
        },
      })

      expect(hasOasys(application, 'risk-of-serious-harm')).toEqual(false)
    })
  })
})

describe('arePreTaskListTasksIncomplete', () => {
  it('returns false if all there is data for all three tasks', () => {
    const application = applicationFactory.build({
      data: {
        'confirm-eligibility': {
          'confirm-eligibility': {
            isEligible: 'yes',
          },
        },
        'confirm-consent': {
          'confirm-consent': {
            hasGivenConsent: 'yes',
            consentDate: '2023-01-01',
            'consentDate-year': '2023',
            'consentDate-month': '1',
            'consentDate-day': '1',
          },
        },
        'hdc-licence-dates': {
          'hdc-licence-dates': {
            hdcEligibilityDate: '2026-02-22',
            'hdcEligibilityDate-year': '2026',
            'hdcEligibilityDate-month': '2',
            'hdcEligibilityDate-day': '22',
            conditionalReleaseDate: '2026-03-28',
            'conditionalReleaseDate-year': '2026',
            'conditionalReleaseDate-month': '3',
            'conditionalReleaseDate-day': '28',
          },
          'hdc-warning': {},
          'hdc-ineligible': {},
        },
      },
    })

    expect(arePreTaskListTasksIncomplete(application)).toEqual(false)
  })

  it('returns true if all there is data for none of the tasks', () => {
    const application = applicationFactory.build({
      data: {
        'referrer-details': {
          'confirm-details': { name: 'Eric Dier', email: 'eric.dier@moj.gov.uk' },
          'job-title': { jobTitle: 'POM' },
          'contact-number': { telephone: '1234567' },
        },
      },
    })

    expect(arePreTaskListTasksIncomplete(application)).toEqual(true)
  })

  it('returns true if all there is data for some of the tasks', () => {
    const application = applicationFactory.build({
      data: {
        'confirm-eligibility': {
          'confirm-eligibility': {
            isEligible: 'yes',
          },
        },
        'confirm-consent': {
          'confirm-consent': {
            hasGivenConsent: 'yes',
            consentDate: '2023-01-01',
            'consentDate-year': '2023',
            'consentDate-month': '1',
            'consentDate-day': '1',
          },
        },
      },
    })

    expect(arePreTaskListTasksIncomplete(application)).toEqual(true)
  })
})
