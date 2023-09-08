import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

type CellShareInformationBody = Record<string, never>

@Page({
  name: 'cell-share-information',
  bodyProperties: [],
})
export default class CellShareInformation implements TaskListPage {
  title = `Cell share information for ${nameOrPlaceholderCopy(this.application.person)}`

  body: CellShareInformationBody

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

    return errors
  }

  response() {
    const response = {}

    return response
  }
}
