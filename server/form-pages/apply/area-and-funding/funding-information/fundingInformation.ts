import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'

export type FundingSources = 'personalSavings' | 'benefits'

type FundingSourceBody = {
  fundingSource: FundingSources
}

@Page({
  name: 'funding-source',
  bodyProperties: ['fundingSource'],
})
export default class FundingSource implements TaskListPage {
  documentTitle = 'How will the person pay for their accommodation and service charge?'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Funding information for ${this.personName}`

  questions

  options: Record<string, string>

  body: FundingSourceBody

  constructor(
    body: Partial<FundingSourceBody>,
    private readonly application: Application,
  ) {
    this.body = body as FundingSourceBody

    const applicationQuestions = getQuestions(this.personName)
    this.questions = applicationQuestions['funding-information']['funding-source']
  }

  previous() {
    return 'taskList'
  }

  next() {
    if (this.body.fundingSource === 'personalSavings') {
      return 'national-insurance'
    }
    return 'identification'
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (this.body.fundingSource !== 'personalSavings' && this.body.fundingSource !== 'benefits') {
      errors.fundingSource = 'Select a funding source'
    }
    return errors
  }
}
