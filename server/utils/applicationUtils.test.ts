import { QuestionAndAnswer } from '@approved-premises/ui'
import { applicationSummaryFactory } from '../testutils/factories'
import {
  documentSummaryListRows,
  inProgressApplicationTableRows,
  submittedApplicationTableRows,
  assessmentsTableRows,
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
})
