import { buildDocument } from './documentUtils'
import { applicationFactory } from '../../testutils/factories'
import { getSections, getTaskAnswersAsSummaryListItems } from '../checkYourAnswersUtils'

jest.mock('../checkYourAnswersUtils')

const mockQuestionData = {
  question: 'Question',
  answer: 'Answer',
}

const mockSectionData = {
  title: 'Section',
  name: 'section',
  tasks: [{ title: 'Task' }],
}

describe('documentUtils', () => {
  describe('buildDocument', () => {
    it('returns a correctly structured application document', () => {
      ;(getTaskAnswersAsSummaryListItems as jest.Mock).mockReturnValue([mockQuestionData])
      ;(getSections as jest.Mock).mockReturnValue([mockSectionData])

      const application = applicationFactory.build({
        data: {
          'equality-and-diversity-monitoring': {
            'will-answer-equality-questions': {
              willAnswer: 'yes',
            },
            disability: {
              hasDisability: 'no',
            },
          },
        },
      })

      const expected = {
        sections: [
          {
            title: 'Section',
            tasks: [
              {
                title: 'Task',
                questionsAndAnswers: [
                  {
                    question: 'Question',
                    answer: 'Answer',
                  },
                ],
              },
            ],
          },
        ],
      }

      expect(buildDocument(application)).toEqual(expected)
    })
  })
})
