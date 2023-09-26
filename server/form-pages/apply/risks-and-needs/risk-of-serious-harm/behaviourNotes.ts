import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { createQueryString, nameOrPlaceholderCopy } from '../../../../utils/utils'
import paths from '../../../../paths/apply'

type BehaviourNotesBody = Record<string, never>

@Page({
  name: 'behaviour-notes',
  bodyProperties: [],
})
export default class BehaviourNotes implements TaskListPage {
  documentTitle = 'Behaviour notes for the person'

  title = `Behaviour notes for ${nameOrPlaceholderCopy(this.application.person)}`

  body: BehaviourNotesBody

  behaviourNotes: { behaviourDetail: string; removeLink: string }[]

  constructor(
    body: Partial<BehaviourNotesBody>,
    private readonly application: Application,
  ) {
    if (this.hasExistingNotes(application)) {
      const behaviourNotesData = application.data['risk-of-serious-harm']['behaviour-notes-data'] as [
        { behaviourDetail: string },
      ]

      this.behaviourNotes = behaviourNotesData.map((note, index) => {
        const query = {
          redirectPage: 'behaviour-notes',
        }

        return {
          ...note,
          removeLink: `${paths.applications.removeFromList({
            id: application.id,
            task: 'risk-of-serious-harm',
            page: 'behaviour-notes-data',
            index: index.toString(),
          })}?${createQueryString(query)}`,
        }
      })
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
