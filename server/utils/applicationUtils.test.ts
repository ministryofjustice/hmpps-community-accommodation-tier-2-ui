import { QuestionAndAnswer } from '@approved-premises/ui'

import { applicationFactory, applicationSummaryFactory } from '../testutils/factories'

import {
  documentSummaryListRows,
  inProgressApplicationTableRows,
  submittedApplicationTableRows,
  assessmentsTableRows,
  getStatusTag,
  prisonDashboardTableRows,
  hasOasys,
  arePreTaskListTasksIncomplete,
} from './applicationUtils'
import submittedApplicationSummary from '../testutils/factories/submittedApplicationSummary'

describe('inProgressApplicationTableRows', () => {
  it('returns an array of applications as table rows', async () => {
    const applicationA = applicationSummaryFactory.build({ personName: 'A', createdAt: '2022-11-10T21:47:28Z' })
    const applicationB = applicationSummaryFactory.build({ personName: 'B', createdAt: '2022-11-11T21:47:28Z' })

    const result = inProgressApplicationTableRows([applicationA, applicationB])

    expect(result).toEqual([
      [
        {
          html: `<a href=/applications/${applicationA.id} data-cy-id="${applicationA.id}">A</a>`,
        },
        {
          text: applicationA.nomsNumber,
        },
        {
          text: applicationA.crn,
        },
        {
          text: '10 November 2022',
        },
        {
          html: `<a id="cancel-${applicationA.id}" href=/applications/${applicationA.id}/cancel>Cancel</a>`,
        },
      ],
      [
        {
          html: `<a href=/applications/${applicationB.id} data-cy-id="${applicationB.id}">B</a>`,
        },
        {
          text: applicationB.nomsNumber,
        },
        {
          text: applicationB.crn,
        },
        {
          text: '11 November 2022',
        },
        {
          html: `<a id="cancel-${applicationB.id}" href=/applications/${applicationB.id}/cancel>Cancel</a>`,
        },
      ],
    ])
  })
})

describe('submittedApplicationTableRows', () => {
  it('returns an array of applications as table rows', async () => {
    const applicationA = applicationSummaryFactory.build({ personName: 'A', submittedAt: '2022-12-10T21:47:28Z' })
    const applicationB = applicationSummaryFactory.build({ personName: 'B', submittedAt: '2022-12-11T21:47:28Z' })

    const result = submittedApplicationTableRows([applicationA, applicationB])

    expect(result).toEqual([
      [
        {
          html: `<a href=/applications/${applicationA.id}/overview data-cy-id="${applicationA.id}">A</a>`,
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
          text: applicationB.crn,
        },
        {
          text: '11 December 2022',
        },
        {
          html: '<strong class="govuk-tag govuk-tag--light-blue">More information requested</strong>',
        },
      ],
    ])
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
          text: applicationA.createdByUserName,
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
          text: applicationB.createdByUserName,
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
          text: applicationA.createdByUserName,
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
          text: applicationB.createdByUserName,
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
