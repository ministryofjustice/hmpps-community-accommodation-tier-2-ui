import { Radio, TaskListErrors, YesNoOrDontKnow } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'

export type NonStandardLicenceConditionsBody = {
  nonStandardLicenceConditions: YesNoOrDontKnow
  nonStandardLicenceConditionsDetail: string
}

@Page({
  name: 'non-standard-licence-conditions',
  bodyProperties: ['nonStandardLicenceConditions', 'nonStandardLicenceConditionsDetail'],
})
export default class NonStandardLicenceConditions implements TaskListPage {
  documentTitle = 'Does the person have any non-standard licence conditions?'

  personName = nameOrPlaceholderCopy(this.application.person)

  title

  questions = getQuestions(this.personName)['cpp-details-and-hdc-licence-conditions']['non-standard-licence-conditions']

  body: NonStandardLicenceConditionsBody

  constructor(
    body: Partial<NonStandardLicenceConditionsBody>,
    private readonly application: Application,
  ) {
    this.body = body as NonStandardLicenceConditionsBody
    this.title = this.questions.nonStandardLicenceConditions.question
  }

  previous() {
    return 'cpp-details'
  }

  next() {
    return ''
  }

  items(detailConditionalHtml: string) {
    const items = convertKeyValuePairToRadioItems(
      this.questions.nonStandardLicenceConditions.answers,
      this.body.nonStandardLicenceConditions,
    ) as Array<Radio>

    items.forEach(item => {
      if (item.value === 'yes') {
        item.conditional = { html: detailConditionalHtml }
      }
    })

    const dontKnow = items.pop()

    return [...items, { divider: 'or' }, { ...dontKnow }]
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.nonStandardLicenceConditions) {
      errors.nonStandardLicenceConditions = "Choose either Yes, No or I don't know"
    }
    if (this.body.nonStandardLicenceConditions === 'yes' && !this.body.nonStandardLicenceConditionsDetail) {
      errors.nonStandardLicenceConditionsDetail = 'Describe their non-standard licence conditions'
    }
    return errors
  }

  onSave(): void {
    if (this.body.nonStandardLicenceConditions !== 'yes') {
      delete this.body.nonStandardLicenceConditionsDetail
    }
  }
}
