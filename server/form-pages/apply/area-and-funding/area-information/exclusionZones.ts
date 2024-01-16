import { Cas2Application as Application } from '@approved-premises/api'
import { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

export type ExclusionZonesBody = {
  hasExclusionZones: YesOrNo
  exclusionZonesDetail: string
}

@Page({
  name: 'exclusion-zones',
  bodyProperties: ['hasExclusionZones', 'exclusionZonesDetail'],
})
export default class ExclusionZones implements TaskListPage {
  documentTitle = 'Exclusion zones for the person'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Exclusion zones for ${nameOrPlaceholderCopy(this.application.person)}`

  questions = getQuestions(this.personName)['area-information']['exclusion-zones']

  body: ExclusionZonesBody

  constructor(
    body: Partial<ExclusionZonesBody>,
    private readonly application: Application,
  ) {
    this.body = body as ExclusionZonesBody
  }

  previous() {
    return 'second-preferred-area'
  }

  next() {
    return 'gang-affiliations'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.hasExclusionZones) {
      errors.hasExclusionZones = 'Confirm whether they have any exclusion zones'
    }

    if (this.body.hasExclusionZones === 'yes' && !this.body.exclusionZonesDetail) {
      errors.exclusionZonesDetail = 'Provide details about the exclusion zone'
    }

    return errors
  }

  onSave(): void {
    if (this.body.hasExclusionZones !== 'yes') {
      delete this.body.exclusionZonesDetail
    }
  }
}
