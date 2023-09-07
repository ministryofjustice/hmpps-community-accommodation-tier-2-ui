import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

type BehaviourNotesBody = Record<string, never>

@Page({
  name: 'behaviour-notes',
  bodyProperties: [],
})
export default class BehaviourNotes implements TaskListPage {
  title = `Behaviour notes for ${nameOrPlaceholderCopy(this.application.person)}`

  body: BehaviourNotesBody

  constructor(
    body: Partial<BehaviourNotesBody>,
    private readonly application: Application,
  ) {
    this.body = body as BehaviourNotesBody
  }

  previous() {
    return 'cell-share-information'
  }

  next() {
    return ''
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
