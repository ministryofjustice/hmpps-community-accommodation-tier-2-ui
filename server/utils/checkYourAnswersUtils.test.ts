import { SummaryListItem } from '@approved-premises/ui'
import applicationData from '../../integration_tests/fixtures/applicationData.json'
import Apply from '../form-pages/apply'
import * as getQuestionsUtil from '../form-pages/utils/questions'
import { applicationFactory, personFactory } from '../testutils/factories'
import * as checkYourAnswersUtils from './checkYourAnswersUtils'
import { DateFormats } from './dateUtils'
import { UnknownPageError } from './errors'
import { formatLines } from './viewUtils'

jest.mock('./formUtils')
jest.mock('./viewUtils')

const {
  getTaskAnswersAsSummaryListItems,
  addPageAnswersToItemsArray,
  arrayAnswersAsString,
  getAnswer,
  summaryListItemForQuestion,
  checkYourAnswersSections,
  getSections,
  getPage,
  getKeysForPages,
  getApplicantDetails,
  removeAnyOldPageKeys,
} = checkYourAnswersUtils

const { getQuestions } = getQuestionsUtil

type Questions = ReturnType<typeof getQuestions>

const mockQuestions = {
  task1: {
    page1: { question1: { question: 'A question', answers: { yes: 'Yes', no: 'No' } } },
    page2: { question2: { question: 'Another question' } },
  },
  task2: {
    page1: { question1: { question: 'question 3', answers: { yes: 'Yes', no: 'No' } } },
    page2: { question2: { question: 'question 4' } },
  },
} as unknown as Questions

describe('checkYourAnswersUtils', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  const person = personFactory.build({ name: 'Roger Smith' })

  const questions = getQuestions(person.name)

  const application = applicationFactory.build({
    person,
    data: applicationData,
  })

  ;(formatLines as jest.MockedFunction<typeof formatLines>).mockImplementation(text => text)

  describe('checkYourAnswersSections', () => {
    it('returns an array of section tiles', () => {
      const sections = [
        { name: 'section1', tasks: [{ id: 'task1', pages: {}, title: 'Task 1' }], title: 'Section 1' },
        { name: 'section2', tasks: [{ id: 'task2', pages: {}, title: 'Task 2' }], title: 'Section 2' },
      ]

      jest.spyOn(checkYourAnswersUtils, 'getSections').mockImplementationOnce(jest.fn(() => sections))
      jest.spyOn(checkYourAnswersUtils, 'getTaskAnswersAsSummaryListItems').mockImplementation(jest.fn(() => []))

      const expected = [
        { title: 'Section 1', tasks: [{ id: 'task1', title: 'Task 1', rows: [] as Array<SummaryListItem> }] },
        { title: 'Section 2', tasks: [{ id: 'task2', title: 'Task 2', rows: [] as Array<SummaryListItem> }] },
      ]

      expect(checkYourAnswersSections(application)).toEqual(expected)

      jest.clearAllMocks()
    })
  })

  describe('getTaskAnswersAsSummaryListItems', () => {
    it('returns an array of summary list items for a given task', () => {
      const mockApplication = applicationFactory.build({
        data: {
          task1: {
            page1: {
              question1: 'no',
            },
            page2: {
              question2: 'some answer',
            },
          },
        },
      })

      jest.spyOn(getQuestionsUtil, 'getQuestions').mockImplementationOnce(jest.fn(() => mockQuestions))

      jest.spyOn(checkYourAnswersUtils, 'getPage').mockReturnValue(jest.fn())

      const expected = [
        {
          key: { html: 'A question' },
          value: { html: 'No' },
          actions: {
            items: [
              {
                href: `/applications/${mockApplication.id}/tasks/task1/pages/page1`,
                text: 'Change',
                visuallyHiddenText: 'A question',
              },
            ],
          },
        },
        {
          key: { html: 'Another question' },
          value: { html: 'some answer' },
          actions: {
            items: [
              {
                href: `/applications/${mockApplication.id}/tasks/task1/pages/page2`,
                text: 'Change',
                visuallyHiddenText: 'Another question',
              },
            ],
          },
        },
      ]
      expect(getTaskAnswersAsSummaryListItems('task1', mockApplication)).toEqual(expected)
    })

    it('ignores irrelevant page keys', () => {
      jest.spyOn(getQuestionsUtil, 'getQuestions').mockImplementationOnce(jest.fn(() => mockQuestions))

      jest.spyOn(checkYourAnswersUtils, 'getPage').mockReturnValue(jest.fn())

      const removeAnyOldTaskKeysSpy = jest.spyOn(checkYourAnswersUtils, 'removeAnyOldPageKeys')
      const addPageAnswersToItemsArraySpy = jest.spyOn(checkYourAnswersUtils, 'addPageAnswersToItemsArray')

      const mockApplication = applicationFactory.build({
        data: {
          task1: {
            page1: {
              question1: 'no',
            },
            oldPageKey: {
              question1: 'no',
            },
            'oasys-import': {
              question1: 'no',
            },
            'summary-data': {
              question2: 'some answer',
            },
          },
        },
      })

      const expected = [
        {
          key: { html: 'A question' },
          value: { html: 'No' },
          actions: {
            items: [
              {
                href: `/applications/${mockApplication.id}/tasks/task1/pages/page1`,
                text: 'Change',
                visuallyHiddenText: 'A question',
              },
            ],
          },
        },
      ]

      expect(getTaskAnswersAsSummaryListItems('task1', mockApplication)).toEqual(expected)

      expect(removeAnyOldTaskKeysSpy).toHaveBeenCalledWith(mockQuestions, 'task1', ['page1', 'oldPageKey'])
      expect(addPageAnswersToItemsArraySpy).not.toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.anything(),
        'oldPageKey',
        expect.anything(),
        expect.anything(),
      )
    })
  })

  describe('addPageAnswersToItemsArray', () => {
    const mockApplication = applicationFactory.build({
      data: {
        'confirm-eligibility': {
          page1: {
            question1: 'no',
            question2: 'an answer',
          },
        },
      },
    })

    describe('when the output format is checkYourAnswers', () => {
      it('adds each page answer to the items array by default', () => {
        const mockedConfirmEligibilityQuestion = {
          'confirm-eligibility': {
            page1: {
              question1: { question: 'A question', answers: { yes: 'Yes', no: 'No' } },
              question2: { question: 'Another question' },
            },
          },
        } as unknown as Questions

        jest.spyOn(checkYourAnswersUtils, 'getPage').mockReturnValueOnce(jest.fn())

        const items: Array<SummaryListItem> = []

        const expected = [
          {
            key: { html: 'A question' },
            value: { html: 'No' },
            actions: {
              items: [
                {
                  href: `/applications/${mockApplication.id}/tasks/confirm-eligibility/pages/page1`,
                  text: 'Change',
                  visuallyHiddenText: 'A question',
                },
              ],
            },
          },
          {
            key: { html: 'Another question' },
            value: { html: 'an answer' },
            actions: {
              items: [
                {
                  href: `/applications/${mockApplication.id}/tasks/confirm-eligibility/pages/page1`,
                  text: 'Change',
                  visuallyHiddenText: 'Another question',
                },
              ],
            },
          },
        ]

        addPageAnswersToItemsArray({
          items,
          application: mockApplication,
          task: 'confirm-eligibility',
          pageKey: 'page1',
          questions: mockedConfirmEligibilityQuestion,
          outputFormat: 'checkYourAnswers',
        })

        expect(items).toEqual(expected)
      })

      it('does not add questions to the items array if there is no answer', () => {
        jest.spyOn(checkYourAnswersUtils, 'getPage').mockReturnValueOnce(jest.fn())

        const mockApplicationNoAnswers = applicationFactory.build({
          data: {
            'confirm-eligibility': {
              page1: {
                question1: '',
                question2: '',
              },
            },
          },
        })

        const mockedQuestions = {
          'confirm-eligibility': {
            page1: {
              question1: { question: 'A question', answers: { yes: 'Yes', no: 'No' } },
              question2: { question: 'Another question' },
            },
          },
        }

        const items: Array<SummaryListItem> = []

        addPageAnswersToItemsArray({
          items,
          application: mockApplicationNoAnswers,
          task: 'confirm-eligibility',
          pageKey: 'page1',
          questions: mockedQuestions,
          outputFormat: 'checkYourAnswers',
        })

        expect(items).toEqual([])
      })

      it('does not add to the items array if there is no corresponding question for the answer data', () => {
        jest.spyOn(checkYourAnswersUtils, 'getPage').mockReturnValueOnce(jest.fn())

        const mockApplicationRemovedQuestion = applicationFactory.build({
          data: {
            'confirm-eligibility': {
              page1: {
                question1: '',
                question2: '',
              },
            },
          },
        })

        const mockedQuestions = {
          'confirm-eligibility': {
            page2: {
              question3: { question: 'A question', answers: { yes: 'Yes', no: 'No' } },
              question4: { question: 'Another question' },
            },
          },
        }

        const items: Array<SummaryListItem> = []

        addPageAnswersToItemsArray({
          items,
          application: mockApplicationRemovedQuestion,
          task: 'confirm-eligibility',
          pageKey: 'page1',
          questions: mockedQuestions,
          outputFormat: 'checkYourAnswers',
        })

        expect(items).toEqual([])
      })

      it('if there is a page response method, items are generated from its return value', () => {
        const ApplyPage = jest.fn()

        Apply.pages['confirm-eligibility'] = {
          somePage: ApplyPage,
        }

        ApplyPage.mockReturnValueOnce({
          response: () => {
            return { foo: 'bar' }
          },
        })

        const items: Array<SummaryListItem> = []

        jest.spyOn(checkYourAnswersUtils, 'getPage').mockImplementationOnce(jest.fn(() => ApplyPage))
        jest.spyOn(checkYourAnswersUtils, 'getAnswer').mockImplementationOnce(jest.fn())

        const expected = [
          {
            key: { html: 'foo' },
            value: { html: 'bar' },
            actions: {
              items: [
                {
                  href: `/applications/${mockApplication.id}/tasks/confirm-eligibility/pages/page1`,
                  text: 'Change',
                  visuallyHiddenText: 'foo',
                },
              ],
            },
          },
        ]

        addPageAnswersToItemsArray({
          items,
          application: mockApplication,
          task: 'confirm-eligibility',
          pageKey: 'page1',
          questions,
          outputFormat: 'checkYourAnswers',
        })
        expect(items).toEqual(expected)
        expect(checkYourAnswersUtils.getAnswer).toHaveBeenCalledTimes(0)
      })
    })

    describe('when the output format is the document', () => {
      it('adds each question and answer to the items array', () => {
        const mockedConfirmEligibilityQuestion = {
          'confirm-eligibility': {
            page1: {
              question1: { question: 'A question', answers: { yes: 'Yes', no: 'No' } },
              question2: { question: 'Another question' },
            },
          },
        } as unknown as Questions
        jest.spyOn(checkYourAnswersUtils, 'getPage').mockReturnValueOnce(jest.fn())

        const items: Array<SummaryListItem> = []
        const expected = [
          {
            question: 'A question',
            answer: 'No',
          },
          {
            question: 'Another question',
            answer: 'an answer',
          },
        ]
        addPageAnswersToItemsArray({
          items,
          application: mockApplication,
          task: 'confirm-eligibility',
          pageKey: 'page1',
          questions: mockedConfirmEligibilityQuestion,
          outputFormat: 'document',
        })
        expect(items).toEqual(expected)
      })

      it('if there is a page response method, items are generated from its return value', () => {
        const ApplyPage = jest.fn()

        Apply.pages['confirm-eligibility'] = {
          somePage: ApplyPage,
        }

        ApplyPage.mockReturnValueOnce({
          response: () => {
            return { 'A question': 'An answer' }
          },
        })

        const items: Array<SummaryListItem> = []

        jest.spyOn(checkYourAnswersUtils, 'getPage').mockImplementationOnce(jest.fn(() => ApplyPage))
        jest.spyOn(checkYourAnswersUtils, 'getAnswer').mockImplementationOnce(jest.fn())

        const expected = [
          {
            question: 'A question',
            answer: 'An answer',
          },
        ]

        addPageAnswersToItemsArray({
          items,
          application: mockApplication,
          task: 'confirm-eligibility',
          pageKey: 'page1',
          questions,
          outputFormat: 'document',
        })
        expect(items).toEqual(expected)
        expect(checkYourAnswersUtils.getAnswer).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('getAnswer', () => {
    it('returns array answers as string given an array of defined answers', () => {
      const arrayAnswersAsStringSpy = jest.spyOn(checkYourAnswersUtils, 'arrayAnswersAsString')

      getAnswer(application, questions, 'risk-of-serious-harm', 'risk-management-arrangements', 'arrangements')

      expect(arrayAnswersAsStringSpy).toHaveBeenCalledTimes(1)
    })

    it('returns an array answer that is not predefined', () => {
      const expected = {
        'createdDate-day': '1',
        'createdDate-month': '2',
        'createdDate-year': '2012',
        isOngoing: 'no',
        'closedDate-day': '10',
        'closedDate-month': '10',
        'closedDate-year': '2013',
        referringInstitution: 'HMPPS prison',
        acctDetails: 'ACCT details\nsome more details on another line',
      }

      expect(getAnswer(application, questions, 'risk-to-self', 'acct-data', '0')).toEqual(expected)
    })

    it('returns the answer string by default', () => {
      expect(getAnswer(application, questions, 'confirm-eligibility', 'confirm-eligibility', 'isEligible')).toEqual(
        'Yes, I confirm Roger Smith is eligible',
      )
    })
  })

  describe('arrayAnswersAsString', () => {
    it('returns an array of string answers as a comma separated string', () => {
      expect(
        arrayAnswersAsString(
          application,
          questions,
          'risk-of-serious-harm',
          'risk-management-arrangements',
          'arrangements',
        ),
      ).toEqual('MAPPA,MARAC,IOM')
    })
  })

  describe('summaryListItemForQuestion', () => {
    it('returns a summary list item for a given question', () => {
      const question = { question: 'a question', answer: 'an answer' }

      const expected = {
        key: { html: 'a question' },
        value: { html: 'an answer' },
        actions: {
          items: [
            {
              href: `/applications/${application.id}/tasks/task1/pages/page1`,
              text: 'Change',
              visuallyHiddenText: 'a question',
            },
          ],
        },
      }

      expect(summaryListItemForQuestion(application, 'task1', 'page1', question)).toEqual(expected)
    })

    describe('when the question is OASys imported', () => {
      it('returns the task response as a Summary List item without the actions object', () => {
        const question = { question: 'OASys imported', answer: 'an answer' }

        const expected = {
          key: { html: 'OASys imported' },
          value: { html: 'an answer' },
        }

        expect(summaryListItemForQuestion(application, 'task1', 'page1', question)).toEqual(expected)
      })
    })
  })

  describe('getSections', () => {
    it('returns all sections except check your answers', () => {
      const sections = getSections()

      expect(sections.filter(section => section.name === 'Check answers')).toHaveLength(0)
    })
  })

  describe('getKeysForPages', () => {
    it('returns an array of page keys for risk to self', () => {
      expect(getKeysForPages(application, 'risk-to-self')).toEqual([
        'oasys-import',
        'current-risk',
        'vulnerability',
        'historical-risk',
        'acct',
        'acct-data',
        'additional-information',
      ])
    })
  })
})

describe('getPage', () => {
  const FirstApplyPage = jest.fn()
  const SecondApplyPage = jest.fn()

  const applySection1Task1 = {
    id: 'first-apply-section-task-1',
    title: 'First Apply section, task 1',
    actionText: '',
    pages: {
      first: FirstApplyPage,
      second: SecondApplyPage,
    },
  }
  const applySection1Task2 = {
    id: 'first-apply-section-task-2',
    title: 'First Apply section, task 2',
    actionText: '',
    pages: {},
  }

  const applySection2Task1 = {
    id: 'second-apply-section-task-1',
    title: 'Second Apply section, task 1',
    actionText: '',
    pages: {},
  }

  const applySection2Task2 = {
    id: 'second-apply-section-task-2',
    title: 'Second Apply section, task 2',
    actionText: '',
    pages: {},
  }

  const applySection1 = {
    name: 'first-apply-section',
    title: 'First Apply section',
    tasks: [applySection1Task1, applySection1Task2],
  }

  const applySection2 = {
    name: 'second-apply-section',
    title: 'Second Apply section',
    tasks: [applySection2Task1, applySection2Task2],
  }

  Apply.sections = [applySection1, applySection2]

  Apply.pages['first-apply-section-task-1'] = {
    first: FirstApplyPage,
    second: SecondApplyPage,
  }

  it('should return a page from Apply if it exists', () => {
    expect(getPage('first-apply-section-task-1', 'first')).toEqual(FirstApplyPage)
    expect(getPage('first-apply-section-task-1', 'second')).toEqual(SecondApplyPage)
  })

  it('should raise an error if the page is not found', async () => {
    expect(() => {
      getPage('confirm-eligibility', 'bar')
    }).toThrow(UnknownPageError)
  })

  describe('getApplicantDetails', () => {
    it('should return applicant details in the correct format', () => {
      const person = personFactory.build({})

      const application = applicationFactory.build({ person })

      const expected = [
        {
          key: {
            text: 'Full name',
          },
          value: {
            html: person.name,
          },
        },
        {
          key: {
            text: 'Date of birth',
          },
          value: {
            html: DateFormats.isoDateToUIDate(person.dateOfBirth, { format: 'short' }),
          },
        },
        {
          key: {
            text: 'Nationality',
          },
          value: {
            html: person.nationality,
          },
        },
        {
          key: {
            text: 'Sex',
          },
          value: {
            html: person.sex,
          },
        },
        {
          key: {
            text: 'Prison number',
          },
          value: {
            html: person.nomsNumber,
          },
        },
        {
          key: {
            text: 'Prison',
          },
          value: {
            html: person.prisonName,
          },
        },
        {
          key: {
            text: 'PNC number',
          },
          value: {
            html: person.pncNumber,
          },
        },
        {
          key: {
            text: 'CRN from NDelius',
          },
          value: {
            html: person.crn,
          },
        },
      ]

      expect(getApplicantDetails(application)).toEqual(expected)
    })

    it('should return applicant details with nationality as unknown', () => {
      const person = personFactory.build({ nationality: null })

      const application = applicationFactory.build({ person })

      const expected = [
        {
          key: {
            text: 'Full name',
          },
          value: {
            html: person.name,
          },
        },
        {
          key: {
            text: 'Date of birth',
          },
          value: {
            html: DateFormats.isoDateToUIDate(person.dateOfBirth, { format: 'short' }),
          },
        },
        {
          key: {
            text: 'Nationality',
          },
          value: {
            html: 'Unknown',
          },
        },
        {
          key: {
            text: 'Sex',
          },
          value: {
            html: person.sex,
          },
        },
        {
          key: {
            text: 'Prison number',
          },
          value: {
            html: person.nomsNumber,
          },
        },
        {
          key: {
            text: 'Prison',
          },
          value: {
            html: person.prisonName,
          },
        },
        {
          key: {
            text: 'PNC number',
          },
          value: {
            html: person.pncNumber,
          },
        },
        {
          key: {
            text: 'CRN from NDelius',
          },
          value: {
            html: person.crn,
          },
        },
      ]

      expect(getApplicantDetails(application)).toEqual(expected)
    })
  })

  describe('removeAnyOldPageKeys', () => {
    it('should remove any page keys that appear in the application but are no longer part of the latest set of questions', () => {
      const questions = {
        task1: {
          page1: { question1: { question: 'A question', answers: { yes: 'Yes', no: 'No' } } },
          page2: { question2: { question: 'Another question' } },
        },
      } as unknown as Questions
      const applicationPageKeys = ['page1', 'page2', 'oldPageKey']
      const expected = ['page1', 'page2']
      expect(removeAnyOldPageKeys(questions, 'task1', applicationPageKeys)).toEqual(expected)
    })
  })
  it('should retain ACCT, current offences and historic offences even where they do not appear in the question schema', () => {
    const questions = {
      task1: {
        page1: { question1: { question: 'A question', answers: { yes: 'Yes', no: 'No' } } },
        page2: { question2: { question: 'Another question' } },
      },
    } as unknown as Questions
    const applicationPageKeys = ['page1', 'page2', 'oldPageKey', 'acct', 'current-offences', 'offence-history']
    const expected = ['page1', 'page2', 'acct', 'current-offences', 'offence-history']
    expect(removeAnyOldPageKeys(questions, 'task1', applicationPageKeys)).toEqual(expected)
  })
})
