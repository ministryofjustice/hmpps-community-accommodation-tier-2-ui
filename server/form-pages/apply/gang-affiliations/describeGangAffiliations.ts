import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Page } from '../../utils/decorators'
import TasklistPage from '../../tasklistPage'
// import { sentenceCase } from '../../../utils/utils'

type DescribeGangAffiliationsBody = {
}

@Page({
  name: 'gang-affiliations',
  bodyProperties: [],
})
export default class DescribeGangAffiliations implements TasklistPage {
  title = 'Gang affiliations'

  questions = {}

  body: DescribeGangAffiliationsBody

  constructor(body: Partial<DescribeGangAffiliationsBody>) {
    this.body = body as DescribeGangAffiliationsBody
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
