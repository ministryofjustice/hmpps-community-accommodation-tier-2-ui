import { Cas2Application as Application } from '@approved-premises/api'
import { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getQuestions } from '../../../utils/questions'

export type GangAffiliationsBody = {
  hasGangAffiliations: YesOrNo
  gangName: string
  gangOperationArea: string
  rivalGangDetail: string
}

@Page({
  name: 'gang-affiliations',
  bodyProperties: ['hasGangAffiliations', 'gangName', 'gangOperationArea', 'rivalGangDetail'],
})
export default class GangAffiliations implements TaskListPage {
  documentTitle = 'Does the person have any gang affiliations?'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Does ${nameOrPlaceholderCopy(this.application.person)} have any gang affiliations?`

  questions = getQuestions(this.personName)['area-information']['gang-affiliations']

  body: GangAffiliationsBody

  constructor(
    body: Partial<GangAffiliationsBody>,
    private readonly application: Application,
  ) {
    this.body = body as GangAffiliationsBody
  }

  previous() {
    return 'exclusion-zones'
  }

  next() {
    return 'family-accommodation'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.hasGangAffiliations) {
      errors.hasGangAffiliations = 'Select yes if they have gang affiliations'
    }

    if (this.body.hasGangAffiliations === 'yes' && !this.body.gangName) {
      errors.gangName = `Enter the gang's name`
    }

    if (this.body.hasGangAffiliations === 'yes' && !this.body.gangOperationArea) {
      errors.gangOperationArea = 'Describe the area the gang operates in'
    }

    return errors
  }

  onSave(): void {
    if (this.body.hasGangAffiliations !== 'yes') {
      delete this.body.gangName
      delete this.body.gangOperationArea
      delete this.body.rivalGangDetail
    }
  }
}
