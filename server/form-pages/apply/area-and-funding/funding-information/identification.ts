import type { Radio, TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToCheckboxItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'

const applicationQuestions = getQuestions('')

export const idDocumentOptions = applicationQuestions['funding-information'].identification.idDocuments.answers

export type IDDocumentOptions = keyof typeof idDocumentOptions

export type IdentificationBody = {
  idDocuments: Array<IDDocumentOptions>
}

@Page({
  name: 'identification',
  bodyProperties: ['idDocuments'],
})
export default class Identification implements TaskListPage {
  documentTitle = 'What identification documentation (ID) does the person have?'

  title

  personName = nameOrPlaceholderCopy(this.application.person)

  questions

  body: IdentificationBody

  guidanceHtml = `The applicant needs ID if they are applying for Universal Credit for financial support, and Housing Benefit to cover their rent.<br /><br />If they want to receive an advance payment of Universal Credit on the day of release, they will need a bank account and photo ID.`

  constructor(
    body: Partial<IdentificationBody>,
    private readonly application: Application,
  ) {
    this.questions = getQuestions(this.personName)['funding-information'].identification.idDocuments
    this.title = this.questions.question
  }

  previous() {
    return 'funding-source'
  }

  next() {
    if (this.body.idDocuments.includes('none')) {
      return 'alternative-identification'
    }
    return 'national-insurance'
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.idDocuments) {
      errors.idDocuments = errorLookups.idDocuments.empty
    }
    return errors
  }

  items() {
    const items = convertKeyValuePairToCheckboxItems(idDocumentOptions, this.body.idDocuments) as [Radio]

    const none = items.pop()

    items.forEach(item => {
      item.attributes = { 'data-selector': 'documents' }
      if (item.value === 'wageSlip') {
        item.hint = { text: 'With payee name and NI number' }
      } else if (item.value === 'drivingLicence') {
        item.hint = { text: 'Can be provisional' }
      }
    })

    return [...items, { divider: 'or' }, { ...none }]
  }
}
