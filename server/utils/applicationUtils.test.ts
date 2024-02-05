import { QuestionAndAnswer } from '@approved-premises/ui'
import { applicationFactory } from '../testutils/factories'
import {
  documentSummaryListRows,
  inProgressApplicationTableRows,
  submittedApplicationTableRows,
} from './applicationUtils'
import { fullPersonFactory } from '../testutils/factories/person'

describe('inProgressApplicationTableRows', () => {
  it('returns an array of applications as table rows', async () => {
    const personA = fullPersonFactory.build({ name: 'A' })
    const personB = fullPersonFactory.build({ name: 'B' })

    const applicationA = applicationFactory.build({
      person: personA,
      createdAt: '2022-11-10T21:47:28Z',
    })
    const applicationB = applicationFactory.build({
      person: personB,
      createdAt: '2022-11-11T21:47:28Z',
    })

    const result = inProgressApplicationTableRows([applicationA, applicationB])

    expect(result).toEqual([
      [
        {
          html: `<a href=/applications/${applicationA.id} data-cy-id="${applicationA.id}">A</a>`,
        },
        {
          text: personA.nomsNumber,
        },
        {
          text: personA.crn,
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
          text: personB.nomsNumber,
        },
        {
          text: applicationB.person.crn,
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
    const personA = fullPersonFactory.build({ name: 'A' })
    const personB = fullPersonFactory.build({ name: 'B' })

    const applicationA = applicationFactory.build({
      person: personA,
      submittedAt: '2022-12-10T21:47:28Z',
    })
    const applicationB = applicationFactory.build({
      person: personB,
      submittedAt: '2022-12-11T21:47:28Z',
    })

    const result = submittedApplicationTableRows([applicationA, applicationB])

    expect(result).toEqual([
      [
        {
          html: `<a href=/applications/${applicationA.id}/overview data-cy-id="${applicationA.id}">A</a>`,
        },
        {
          text: personA.nomsNumber,
        },
        {
          text: personA.crn,
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
          text: personB.nomsNumber,
        },
        {
          text: personB.crn,
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
