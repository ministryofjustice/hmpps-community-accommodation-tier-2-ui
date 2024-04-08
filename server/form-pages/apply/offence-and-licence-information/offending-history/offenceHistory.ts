import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { OffenceHistoryDataBody } from './custom-forms/offenceHistoryData'
import { createQueryString, nameOrPlaceholderCopy } from '../../../../utils/utils'
import paths from '../../../../paths/apply'
import { getQuestions } from '../../../utils/questions'

type OffenceHistoryBody = Record<string, never>

type OffenceHistoryUI = {
  offenceGroupName: string
  offenceCategoryTag: string
  offenceCategoryText: string
  numberOfOffences: string
  sentenceTypes: string
  summary: string
  removeLink: string
}

@Page({
  name: 'offence-history',
  bodyProperties: [''],
})
export default class OffenceHistory implements TaskListPage {
  personName = nameOrPlaceholderCopy(this.application.person)

  documentTitle = 'Offence history'

  title = `Offence history for ${this.personName}`

  body: OffenceHistoryBody

  offences: OffenceHistoryUI[]

  pageName = 'offence-history'

  dataPageName = 'offence-history-data'

  taskName = 'offending-history'

  offenceCategories = getQuestions('')['offending-history']['offence-history-data'].offenceCategory.answers

  constructor(
    body: Partial<OffenceHistoryBody>,
    private readonly application: Application,
  ) {
    if (application.data[this.taskName]?.[this.dataPageName]) {
      const offenceHistoryData = application.data[this.taskName][this.dataPageName] as [OffenceHistoryDataBody]

      const query = {
        redirectPage: this.pageName,
      }

      this.offences = offenceHistoryData
        .filter(offence => offence.numberOfOffences)
        .map((offence, index) => {
          const offenceCategoryText = this.offenceCategories[offence.offenceCategory]

          return {
            offenceGroupName: offence.offenceGroupName,
            offenceCategoryTag: this.getOffenceCategoryTag(offence.offenceCategory, offenceCategoryText),
            offenceCategoryText,
            numberOfOffences: offence.numberOfOffences,
            sentenceTypes: offence.sentenceTypes,
            summary: offence.summary,
            removeLink: `${paths.applications.removeFromList({
              id: application.id,
              task: this.taskName,
              page: this.dataPageName,
              index: index.toString(),
            })}?${createQueryString(query)}`,
          }
        })
    }
    this.body = body as OffenceHistoryBody
  }

  previous() {
    return 'any-previous-convictions'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    return errors
  }

  response() {
    const response = {}

    this.offences?.forEach(offence => {
      const { offenceCategoryTag, offenceGroupName, numberOfOffences, sentenceTypes, summary } = offence

      const offenceString = `${offenceGroupName}\r\nNumber of offences: ${numberOfOffences}\r\nSentence types: ${sentenceTypes}\r\n\nDetails: ${summary}`
      response[offenceCategoryTag] = offenceString
    })

    return response
  }

  getOffenceCategoryTag(offenceCategory: string, offenceCategoryText: string) {
    return `<strong class="govuk-tag govuk-tag--${this.getOffenceTagColour(
      offenceCategory,
    )}">${offenceCategoryText}</strong>`
  }

  getOffenceTagColour(offenceCategory: string) {
    switch (offenceCategory) {
      case 'stalkingOrHarassment':
        return 'blue'
      case 'weaponsOrFirearms':
        return 'red'
      case 'arson':
        return 'yellow'
      case 'violence':
        return 'pink'
      case 'domesticAbuse':
        return 'purple'
      case 'hateCrime':
        return 'green'
      case 'drugs':
        return 'custom-brown'
      default:
        return 'grey'
    }
  }

  tableRows() {
    if (this.offences) {
      return this.offences.map(offence => {
        return [
          {
            text: offence.offenceGroupName,
          },
          {
            text: offence.offenceCategoryText,
          },
          {
            text: offence.numberOfOffences,
          },
          {
            html: `<a href=${offence.removeLink}>Remove</a>`,
          },
        ]
      })
    }
    return []
  }
}
