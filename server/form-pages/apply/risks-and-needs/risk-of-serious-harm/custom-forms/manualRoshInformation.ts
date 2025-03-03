import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../../utils/decorators'
import TaskListPage from '../../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../../utils/utils'
import { getQuestions } from '../../../../utils/questions'
import { convertKeyValuePairToRadioItems } from '../../../../../utils/formUtils'
import errorLookups from '../../../../../i18n/en/errors.json'
import { DateFormats } from '../../../../../utils/dateUtils'

export type ManualRoshBody = {
  riskToChildren: string
  riskToPublic: string
  riskToKnownAdult: string
  riskToStaff: string
  overallRisk: string
}

const applicationQuestions = getQuestions('')

export const options = applicationQuestions['risk-of-serious-harm']['manual-rosh-information']

@Page({
  name: 'manual-rosh-information',
  bodyProperties: ['riskToChildren', 'riskToPublic', 'riskToKnownAdult', 'riskToStaff', 'overallRisk', 'createdAt'],
})
export default class ManualRoshInformation implements TaskListPage {
  documentTitle = `Create a RoSH summary for this person`

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Create a RoSH summary for ${this.personName}`

  selectText = `Select the risk levels for ${this.personName} in the community.`

  body: ManualRoshBody

  questions = getQuestions(this.personName)['risk-of-serious-harm']['manual-rosh-information']

  taskName = 'risk-of-serious-harm'

  createdAt = new Date().toISOString()

  constructor(
    body: Partial<ManualRoshBody>,
    private readonly application: Application,
  ) {
    this.body = body as ManualRoshBody
  }

  previous() {
    return 'taskList'
  }

  next() {
    return 'risk-to-others'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    Object.keys(this.body).forEach(key => {
      const typedKey = key as keyof ManualRoshBody

      if (!this.body[typedKey]) {
        errors[typedKey] = errorLookups.manualRoshInformation[typedKey].empty
      }
    })

    return errors
  }

  items(fieldName: keyof ManualRoshBody) {
    const originalOptions = this.questions[fieldName].answers

    const transformedOptions = Object.fromEntries(
      Object.entries(originalOptions).map(([_key, value]) => [value, value]),
    )

    return convertKeyValuePairToRadioItems(transformedOptions, this.body[fieldName])
  }

  response() {
    return {}
  }
}
