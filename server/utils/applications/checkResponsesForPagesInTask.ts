import { FormArtifact, UiTask } from '../../@types/ui'
import { getPage } from './getPage'
import TaskListPage from '../../form-pages/taskListPage'

export const checkResponsesForPagesInTask = (
  formArtifact: FormArtifact,
  task: UiTask,
  callback: (page: TaskListPage, pageName: string) => void,
): void => {
  const pageNames = Object.keys(task.pages)
  let pageName = pageNames?.[0]

  while (pageName && pageName !== 'check-your-answers') {
    const Page = getPage(task.id, pageName, 'applications')
    const body = formArtifact?.data?.[task.id]?.[pageName]

    if (body) {
      // if the user has answered this page, call the callback
      const page = new Page(body, formArtifact)
      callback(page, pageName)
      // skip to the next page
      pageName = page.next()
    } else if (pageNames.indexOf(pageName) + 1 < pageNames.length) {
      // if there are more pages left in the task, skip to the next one
      pageName = pageNames.at(pageNames.indexOf(pageName) + 1)
    } else {
      // break out of while loop
      pageName = ''
    }
  }
}
