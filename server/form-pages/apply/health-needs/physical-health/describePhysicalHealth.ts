import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Page } from '../../../utils/decorators'
import TasklistPage from '../../../tasklistPage'
// import { sentenceCase } from '../../../utils/utils'

type DescribePhysicalHealthBody = {
}

@Page({
  name: 'physical-health',
  bodyProperties: [],
})
export default class DescribePhysicalHealth implements TasklistPage {
  title = 'Physical health'

  questions = {}

  body: DescribePhysicalHealthBody

  constructor(body: Partial<DescribePhysicalHealthBody>) {
    this.body = body as DescribePhysicalHealthBody
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
