import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Page } from '../../../utils/decorators'
import TasklistPage from '../../../tasklistPage'
// import { sentenceCase } from '../../../utils/utils'

type DescribeAssistiveNeedsBody = {
}

@Page({
  name: 'assistive-needs',
  bodyProperties: [],
})
export default class DescribeAssistiveNeeds implements TasklistPage {
  title = 'Physical health'

  questions = {}

  body: DescribeAssistiveNeedsBody

  constructor(body: Partial<DescribeAssistiveNeedsBody>) {
    this.body = body as DescribeAssistiveNeedsBody
  }

  previous() {
    return 'dashboard'
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

    Object.keys(response).forEach(key => {
      if (!response[key]) {
        delete response[key]
      }
    })

    return response
  }

}
