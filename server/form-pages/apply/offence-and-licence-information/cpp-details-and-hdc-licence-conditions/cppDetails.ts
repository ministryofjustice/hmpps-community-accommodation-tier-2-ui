import { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'

type CPPDetailsBody = {
  name: string
  probationRegion: string
  email: string
  telephone: string
}

@Page({
  name: 'cpp-details',
  bodyProperties: ['name', 'probationRegion', 'email', 'telephone'],
})
export default class CPPDetails implements TaskListPage {
  documentTitle = "Who is the person's Community Probation Practitioner (CPP)?"

  personName = nameOrPlaceholderCopy(this.application.person)

  title

  questions = getQuestions(this.personName)['cpp-details-and-hdc-licence-conditions']['cpp-details']

  options: Record<string, string>

  body: CPPDetailsBody

  constructor(
    body: Partial<CPPDetailsBody>,
    private readonly application: Application,
  ) {
    this.body = body as CPPDetailsBody
    this.title = this.questions.cppDetails.question
  }

  previous() {
    return 'taskList'
  }

  next() {
    return 'non-standard-licence-conditions'
  }

  response() {
    return {
      [this.title]: `${this.body.name}\r\n${this.body.probationRegion}\r\n${this.body.email}\r\n${this.body.telephone}`,
    }
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.name) {
      errors.name = "Enter the CPP's full name"
    }
    if (!this.body.probationRegion) {
      errors.probationRegion = 'Enter the probation region'
    }
    if (!this.body.email) {
      errors.email = "Enter the CPP's email address"
    }
    if (!this.body.telephone) {
      errors.telephone = "Enter the CPP's contact number"
    }
    return errors
  }
}
