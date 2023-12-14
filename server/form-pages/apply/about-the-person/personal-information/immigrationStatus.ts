import { Cas2Application as Application } from '@approved-premises/api'
import { SelectItem, TaskListErrors } from '@approved-premises/ui'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'
import { isPersonMale } from '../../../../utils/personUtils'

export type ImmigrationStatusBody = {
  immigrationStatus: string
}

@Page({
  name: 'immigration-status',
  bodyProperties: ['immigrationStatus'],
})
export default class ImmigrationStatus implements TaskListPage {
  documentTitle = "What is the person's immigration status?"

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `What is ${nameOrPlaceholderCopy(this.application.person)}'s immigration status?`

  questions = getQuestions(this.personName)['personal-information']['immigration-status']

  body: ImmigrationStatusBody

  immigrationStatusSelectItems: Array<SelectItem>

  constructor(
    body: Partial<ImmigrationStatusBody>,
    private readonly application: Application,
  ) {
    this.body = body as ImmigrationStatusBody
    this.immigrationStatusSelectItems = this.getImmigrationStatusAsItemsForSelect(this.body.immigrationStatus)
  }

  private getImmigrationStatusAsItemsForSelect(selectedItem: string): Array<SelectItem> {
    const items = [
      {
        value: 'choose',
        text: 'Select immigration status',
        selected: selectedItem === '',
      },
    ]

    Object.keys(this.questions.immigrationStatus.answers).forEach(value => {
      items.push({
        value,
        text: this.questions.immigrationStatus.answers[value] as string,
        selected: selectedItem === value,
      })
    })

    return items
  }

  previous() {
    return 'working-mobile-phone'
  }

  next() {
    if (isPersonMale(this.application.person)) {
      return ''
    }

    return 'pregnancy-information'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (this.body.immigrationStatus === 'choose') {
      errors.immigrationStatus = 'Select their immigration status'
    }

    return errors
  }
}
