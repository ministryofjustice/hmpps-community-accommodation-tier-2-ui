import { Cas2Application as Application } from '@approved-premises/api'
import { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

type FamilyAccommodationBody = {
  familyProperty: YesOrNo
}

@Page({
  name: 'family-accommodation',
  bodyProperties: ['familyProperty'],
})
export default class FamilyAccommodation implements TaskListPage {
  documentTitle = 'Family accommodation for the person'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Family accommodation for ${nameOrPlaceholderCopy(this.application.person)}`

  questions = getQuestions(this.personName)['area-information']['family-accommodation']

  body: FamilyAccommodationBody

  constructor(
    body: Partial<FamilyAccommodationBody>,
    private readonly application: Application,
  ) {
    this.body = body as FamilyAccommodationBody
  }

  previous() {
    return 'gang-affiliations'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.familyProperty) {
      errors.familyProperty = 'Select yes if they want to apply to live with their children in a family property'
    }

    return errors
  }
}
