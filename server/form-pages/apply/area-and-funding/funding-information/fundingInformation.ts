import type { Radio, TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

export const fundingSources = {
  personalSavings: 'Personal money or savings',
  benefits: 'Benefits',
}
const benefitsHint =
  'This includes Housing Benefit and Universal Credit, Disability Living Allowance, and Employment and Support Allowance'

export type FundingSources = keyof typeof fundingSources

type FundingSourceBody = {
  fundingSource: FundingSources
}

@Page({
  name: 'funding-source',
  bodyProperties: ['fundingSource'],
})
export default class FundingSource implements TaskListPage {
  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Funding information for ${this.personName}`

  questions = {
    fundingSource: `How will ${nameOrPlaceholderCopy(
      this.application.person,
    )} pay for their accommodation and service charge?`,
  }

  body: FundingSourceBody

  constructor(
    body: Partial<FundingSourceBody>,
    private readonly application: Application,
  ) {
    this.body = body as FundingSourceBody
  }

  previous() {
    return 'taskList'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.fundingSource) {
      errors.fundingSource = 'Select a funding source'
    }
    return errors
  }

  response() {
    const response = {
      [this.questions.fundingSource]: fundingSources[this.body.fundingSource],
    }

    Object.keys(response).forEach(key => {
      if (!response[key]) {
        delete response[key]
      }
    })

    return response
  }

  items() {
    const items = convertKeyValuePairToRadioItems(fundingSources, this.body.fundingSource) as [Radio]
    return items.map(radio => {
      if (radio.value === 'benefits') {
        return { ...radio, hint: { text: benefitsHint } }
      }
      return radio
    })
  }
}
