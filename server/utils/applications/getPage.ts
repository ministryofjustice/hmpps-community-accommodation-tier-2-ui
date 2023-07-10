import { JourneyType } from '../../@types/ui'
import { TasklistPageInterface } from '../../form-pages/tasklistPage'
import { UnknownPageError } from '../errors'
import { journeyPages } from './utils'

export const getPage = (taskName: string, pageName: string, journeyType: JourneyType): TasklistPageInterface => {
  console.log('in getPage')
  console.log('in getPage: journeyType', journeyType)
  console.log('in getPage: taskName', taskName)
  const pageList = journeyPages(journeyType)[taskName]
  console.log('pageList ', pageList)

  const Page = pageList[pageName]

  if (!Page) {
    throw new UnknownPageError(pageName)
  }

  return Page as TasklistPageInterface
}
