import { Cas2Application as Application, Cas2SubmittedApplication, FullPerson } from '@approved-premises/api'
import { SummaryListItem, FormSection, QuestionAndAnswer } from '@approved-premises/ui'
import Apply from '../form-pages/apply/index'
import CheckYourAnswers from '../form-pages/apply/check-your-answers'
import paths from '../paths/apply'
import { getQuestions } from '../form-pages/utils/questions'
import { nameOrPlaceholderCopy } from './utils'
import { formatLines } from './viewUtils'
import TaskListPage, { TaskListPageInterface } from '../form-pages/taskListPage'
import { UnknownPageError } from './errors'
import { DateFormats } from './dateUtils'

export const checkYourAnswersSections = (application: Application) => {
  const sections = getSections()

  const sectionsWithAnswers = sections.map(section => {
    return {
      title: section.title,
      tasks: section.tasks.map(task => {
        return {
          id: task.id,
          title: task.title,
          rows: getTaskAnswersAsSummaryListItems(task.id, application),
        }
      }),
    }
  })

  return sectionsWithAnswers
}

export const getTaskAnswersAsSummaryListItems = (
  task: string,
  application: Application,
  outputFormat: 'checkYourAnswers' | 'document' = 'checkYourAnswers',
): Array<SummaryListItem | QuestionAndAnswer> => {
  const items: Array<SummaryListItem | QuestionAndAnswer> = []

  // Get the latest question schema
  const questions = getQuestions(nameOrPlaceholderCopy(application.person))

  // Get the page keys stored on the application at creation
  const applicationPageKeys = getKeysForPages(application, task).filter(key => pagesWeNeverWantToPresent(key) === false)

  // Filter out any keys that are no longer in the latest question schema
  const relevantPagesKeys = removeAnyOldPageKeys(questions, task, applicationPageKeys)

  // For each page key we know we have a matching question for, prepare it for display
  relevantPagesKeys.forEach(pageKey => {
    addPageAnswersToItemsArray({
      items,
      application,
      task,
      pageKey,
      questions,
      outputFormat,
    })
  })
  return items
}

export const addPageAnswersToItemsArray = (params: {
  items: Array<SummaryListItem | QuestionAndAnswer>
  application: Application
  task: string
  pageKey: string
  questions: Record<string, unknown>
  outputFormat: 'checkYourAnswers' | 'document'
}) => {
  const { items, application, task, pageKey, questions, outputFormat } = params
  const PageClass = getPage(task, pageKey)

  const body = application?.data?.[task]?.[pageKey]

  const page = new PageClass(body, application)

  if (hasResponseMethod(page)) {
    const response = page.response()

    Object.keys(response).forEach(question => {
      if (outputFormat === 'checkYourAnswers') {
        items.push(summaryListItemForQuestion(application, task, pageKey, { question, answer: response[question] }))
      } else {
        items.push({ question, answer: response[question] })
      }
    })
  } else {
    const questionKeys = Object.keys(application.data[task][pageKey])
    if (containsQuestions(questionKeys)) {
      questionKeys.forEach(questionKey => {
        const answer = getAnswer(application, questions, task, pageKey, questionKey)
        if (!answer) {
          return
        }

        const questionText = questions[task][pageKey]?.[questionKey]?.question

        if (!questionText) {
          return
        }

        if (outputFormat === 'checkYourAnswers') {
          items.push(summaryListItemForQuestion(application, task, pageKey, { question: questionText, answer }))
        } else {
          items.push({ question: questionText, answer })
        }
      })
    }
  }
}

export const getAnswer = (
  application: Application,
  questions: Record<string, unknown>,
  task: string,
  pageKey: string,
  questionKey: string,
) => {
  if (hasDefinedAnswers(questions, task, pageKey, questionKey)) {
    if (Array.isArray(application.data[task][pageKey][questionKey])) {
      return arrayAnswersAsString(application, questions, task, pageKey, questionKey)
    }
    return questions[task][pageKey][questionKey].answers[application.data[task][pageKey][questionKey]]
  }
  return application.data[task][pageKey][questionKey]
}

export const arrayAnswersAsString = (
  application: Application,
  questions: Record<string, unknown>,
  task: string,
  pageKey: string,
  questionKey: string,
): string => {
  const answerKeys = application.data[task][pageKey][questionKey]
  const textAnswers: Array<string> = []
  answerKeys.forEach((answerKey: string) => {
    textAnswers.push(questions[task][pageKey][questionKey].answers[answerKey])
  })
  return textAnswers.join()
}

export const summaryListItemForQuestion = (
  application: Application,
  task: string,
  pageKey: string,
  questionAndAnswer: Record<string, string>,
) => {
  const nonEditablePages = ['summary']
  const nonEditableQuestions = ['OASys created', 'OASys completed', 'OASys imported']

  const { question, answer } = questionAndAnswer

  const actions = {
    items: [
      {
        href: paths.applications.pages.show({ task, page: pageKey, id: application.id }),
        text: 'Change',
        visuallyHiddenText: question,
      },
    ],
  }

  return {
    key: {
      html: question,
    },
    value: { html: formatLines(answer as string) },
    ...(nonEditablePages.includes(pageKey) || nonEditableQuestions.includes(question) ? {} : { actions }),
  }
}

export const getSections = (): Array<FormSection> => {
  const { sections } = Apply

  return sections.filter(section => section.name !== CheckYourAnswers.name)
}

export const getKeysForPages = (application: Application, task: string) => {
  const pages = application.data[task]

  // Allow viewing of the CYA page with incomplete tasks
  if (!pages) {
    return []
  }

  const pagesKeys = Object.keys(pages)

  return pagesKeys
}

const containsQuestions = (questionKeys: Array<string>): boolean => {
  if (!questionKeys.length) {
    return false
  }
  return true
}

const hasDefinedAnswers = (
  questions: Record<string, unknown>,
  task: string,
  pageKey: string,
  questionKey: string,
): boolean => {
  return questions[task][pageKey]?.[questionKey]?.answers
}

export const hasResponseMethod = (page: TaskListPage): boolean => {
  if ('response' in page) {
    return true
  }
  return false
}

export const getPage = (taskName: string, pageName: string): TaskListPageInterface => {
  const pageList = Apply.pages[taskName]

  const Page = pageList[pageName]

  if (!Page) {
    throw new UnknownPageError(pageName)
  }

  return Page as TaskListPageInterface
}

export const getApplicantDetails = (application: Application | Cas2SubmittedApplication): Array<SummaryListItem> => {
  const { crn, nomsNumber, pncNumber, name, dateOfBirth, nationality, sex, prisonName } =
    application.person as FullPerson

  return [
    {
      key: {
        text: 'Full name',
      },
      value: {
        html: name,
      },
    },
    {
      key: {
        text: 'Date of birth',
      },
      value: {
        html: DateFormats.isoDateToUIDate(dateOfBirth, { format: 'short' }),
      },
    },
    {
      key: {
        text: 'Nationality',
      },
      value: {
        html: nationality || 'Unknown',
      },
    },
    {
      key: {
        text: 'Sex',
      },
      value: {
        html: sex,
      },
    },
    {
      key: {
        text: 'Prison number',
      },
      value: {
        html: nomsNumber,
      },
    },
    {
      key: {
        text: 'Prison',
      },
      value: {
        html: prisonName,
      },
    },
    {
      key: {
        text: 'PNC number',
      },
      value: {
        html: pncNumber,
      },
    },
    {
      key: {
        text: 'CRN from NDelius',
      },
      value: {
        html: crn,
      },
    },
  ]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeAnyOldPageKeys = (questions: any, task: string, applicationPageKeys: string[]): string[] => {
  const latestPageKeys = Object.keys(questions[task])
  const matchedKeys = applicationPageKeys.filter(
    key => latestPageKeys.includes(key) || ['acct', 'current-offences', 'offence-history'].includes(key),
  )
  return matchedKeys
}
const pagesWeNeverWantToPresent = (key: string): boolean => {
  return ['summary-data', 'oasys-import'].includes(key)
}
