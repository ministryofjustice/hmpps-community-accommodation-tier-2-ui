import { Request, RequestHandler, Response } from 'express'
import { FullPerson } from '@approved-premises/api'
import SubmittedApplicationService from '../../services/submittedApplicationService'

export default class SubmittedApplicationsController {
  constructor(private readonly submittedApplicationService: SubmittedApplicationService) {}

  index(): RequestHandler {
    return async (req: Request, res: Response) => {
      const applications = await this.submittedApplicationService.getAll(req.user.token)

      return res.render('assess/applications/index', {
        applications,
        pageHeading: 'Submitted Applications',
      })
    }
  }

  show(): RequestHandler {
    return async (req: Request, res: Response) => {
      const application = await this.submittedApplicationService.findApplication(req.user.token, req.params.id)
      const person = application.person as FullPerson

      return res.render('assess/applications/show', {
        application,
        pageHeading: `Application for ${person.nomsNumber}`,
      })
    }
  }

  overview(): RequestHandler {
    return async (req: Request, res: Response) => {
      const application = await this.submittedApplicationService.findApplication(req.user.token, req.params.id)

      const status = application.statusUpdates.length ? application.statusUpdates[0].label : 'Received'

      return res.render('assess/applications/overview', {
        application,
        status,
        pageHeading: 'Overview of application',
      })
    }
  }
}
