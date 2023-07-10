/* istanbul ignore file */

import type { Router } from 'express'
// import type { Services } from '../services'
import Apply from '../form-pages/apply'

import type { Controllers } from '../controllers'
import paths from '../paths/apply'

import actions from './utils'

export default function routes(controllers: Controllers, router: Router): Router {
  const { pages } = Apply
  const { get, post, put } = actions(router)
  const { applicationsController, pagesController, peopleController } = controllers

  // get(paths.applications.start.pattern, applicationsController.start(), { auditEvent: 'START_APPLICATION' })
  // get(paths.applications.index.pattern, applicationsController.index(), { auditEvent: 'LIST_APPLICATIONS' })
  get(paths.applications.new.pattern, applicationsController.new())
  get(paths.applications.show.pattern, applicationsController.show())
  post(paths.applications.create.pattern, applicationsController.create())
  // post(paths.applications.submission.pattern, applicationsController.submit(), { auditEvent: 'SUBMIT_APPLICATION' })

  post(paths.applications.people.find.pattern, peopleController.find())

  Object.keys(pages).forEach((taskKey: string) => {
    Object.keys(pages[taskKey]).forEach((pageKey: string) => {
      const { pattern } = paths.applications.show.path(`tasks/${taskKey}/pages/${pageKey}`)
      console.log('apply routes: ', pattern)
      get(pattern, pagesController.show(taskKey, pageKey))
      put(pattern, pagesController.update(taskKey, pageKey))
    })
  })

  return router
}
