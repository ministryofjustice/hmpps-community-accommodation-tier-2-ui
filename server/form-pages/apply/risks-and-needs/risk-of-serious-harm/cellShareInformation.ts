import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

type CellShareInformationBody = { hasCellShareComments: YesOrNo; cellShareInformationDetail: string }

@Page({
  name: 'cell-share-information',
  bodyProperties: ['hasCellShareComments', 'cellShareInformationDetail'],
})
export default class CellShareInformation implements TaskListPage {
  documentTitle = 'Cell share information for the person'

  title = `Cell share information for ${nameOrPlaceholderCopy(this.application.person)}`

  body: CellShareInformationBody

  questions = {
    hasCellShareComments: {
      question: 'Are there any comments to add about cell sharing?',
    },
    cellShareInformationDetail: {
      question: 'Cell sharing information',
    },
  }

  constructor(
    body: Partial<CellShareInformationBody>,
    private readonly application: Application,
  ) {
    this.body = body as CellShareInformationBody
  }

  previous() {
    return 'risk-management-arrangements'
  }

  next() {
    return 'behaviour-notes'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.hasCellShareComments) {
      errors.hasCellShareComments = 'Select whether there are any comments about cell sharing'
    }
    if (this.body.hasCellShareComments === 'yes' && !this.body.cellShareInformationDetail) {
      errors.cellShareInformationDetail = 'Enter cell sharing information'
    }

    return errors
  }

  response() {
    const response = {
      [this.questions.hasCellShareComments.question]: this.body.hasCellShareComments,
      [this.questions.cellShareInformationDetail.question]: this.body.cellShareInformationDetail,
    }

    return response
  }
}
