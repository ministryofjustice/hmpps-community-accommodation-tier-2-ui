import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Page } from '../../utils/decorators'
import TasklistPage from '../../tasklistPage'
// import { sentenceCase } from '../../../utils/utils'

type DescribePrisonInformationBody = {
}

@Page({
  name: 'prison-information',
  bodyProperties: [],
})
export default class DescribePrisonInformation implements TasklistPage {
  title = 'Prison information'

  questions = {}

  body: DescribePrisonInformationBody

  constructor(body: Partial<DescribePrisonInformationBody>) {
    this.body = body as DescribePrisonInformationBody
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
