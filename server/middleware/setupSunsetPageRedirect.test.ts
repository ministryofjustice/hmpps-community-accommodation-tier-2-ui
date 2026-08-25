import type { Request, Response } from 'express'
import { createMock, DeepMocked } from '@golevelup/ts-jest'
import setupSunsetPageRedirect from './setupSunsetPageRedirect'

import staticPaths from '../paths/static'
import reportPaths from '../paths/report'
import applicationPaths from '../paths/apply'
import assessPaths from '../paths/assess'
import config from '../config'

describe('setupSunsetPageRedirect', () => {
  let req: DeepMocked<Request>
  let res: DeepMocked<Response>
  const next = jest.fn()

  const handler = setupSunsetPageRedirect()

  beforeEach(() => {
    jest.resetAllMocks()

    req = createMock<Request>()
    res = createMock<Response>()
    config.flags.phase2DisableSubmittedApplications = true
  })

  afterEach(() => {
    config.flags.phase2DisableSubmittedApplications = false
  })

  it.each([
    [staticPaths.static.noLongerApply.pattern],
    [staticPaths.static.accessibilityStatement.pattern],
    [staticPaths.static.cookiesPolicy.pattern],
    [staticPaths.static.maintenancePage.pattern],
    [staticPaths.static.privacyNotice.pattern],
  ])('should not redirect for static path %s even when feature flag is enabled', async (path: string) => {
    req.path = path

    await handler(req, res, next)

    expect(next).toHaveBeenCalled()
  })

  it.each([[reportPaths.report.new.pattern], [reportPaths.report.create.pattern]])(
    'should not redirect for report path %s even when feature flag is enabled',
    async (path: string) => {
      req.path = path

      await handler(req, res, next)

      expect(next).toHaveBeenCalled()
    },
  )

  it.each([
    [applicationPaths.applications.index.pattern],
    [applicationPaths.applications.show.pattern],
    [applicationPaths.applications.people.find.pattern],
  ])('should redirect for application path %s when feature flag is enabled', async (path: string) => {
    req.path = path

    await handler(req, res, next)

    expect(res.redirect).toHaveBeenCalledWith(staticPaths.static.noLongerApply({}))
  })

  it.each([
    [assessPaths.submittedApplications.index.pattern],
    [assessPaths.assessmentDetails.update.pattern],
    [assessPaths.statusUpdate.create.pattern],
    [assessPaths.statusUpdateDetails.new.pattern],
  ])('should redirect for assess path %s when feature flag is enabled', async (path: string) => {
    req.path = path

    await handler(req, res, next)

    expect(res.redirect).toHaveBeenCalledWith(staticPaths.static.noLongerApply({}))
  })
})
