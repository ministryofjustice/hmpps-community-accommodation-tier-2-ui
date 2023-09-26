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
  documentTitle = 'Behaviour notes for the person'

  title = `Behaviour notes for ${nameOrPlaceholderCopy(this.application.person)}`

  body: BehaviourNotesBody

  behaviourNotes: { behaviourDetail: string }

  constructor(
    body: Partial<BehaviourNotesBody>,
    private readonly application: Application,
  ) {
    if (this.hasExistingNotes(application)) {
      this.behaviourNotes = application.data['risk-of-serious-harm']['behaviour-notes-data']
    }
    this.body = body as BehaviourNotesBody
  }

  private hasExistingNotes(application: Application) {
    return application.data['risk-of-serious-harm'] && application.data['risk-of-serious-harm']['behaviour-notes-data']
  }

  previous() {
    return 'cell-share-information'
  }

  next() {
    return 'additional-risk-information'
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
