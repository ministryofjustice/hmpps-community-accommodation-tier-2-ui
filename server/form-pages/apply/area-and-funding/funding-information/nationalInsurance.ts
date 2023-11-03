import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

type NationalInsuranceBody = { nationalInsuranceNumber: string }

@Page({
  name: 'national-insurance',
  bodyProperties: ['nationalInsuranceNumber'],
})
export default class NationalInsurance implements TaskListPage {
  title

  documentTitle = "What is the person's National Insurance number?"

  questions

  body: NationalInsuranceBody

  constructor(
    body: Partial<NationalInsuranceBody>,
    private readonly application: Application,
  ) {
    this.body = body as NationalInsuranceBody
    this.questions = getQuestions(nameOrPlaceholderCopy(this.application.person))['funding-information'][
      'national-insurance'
    ]
    this.title = this.questions.nationalInsuranceNumber.question
  }

  previous() {
    if (this.application.data?.['funding-information']?.['funding-source']?.fundingSource === 'personalSavings') {
      return 'funding-source'
    }
    if (this.application.data?.['funding-information']?.identification?.idDocuments === 'none') {
      return 'alternative-identification'
    }
    return 'identification'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    return errors
  }
}
