import { OASysSections } from '@approved-premises/api'
import { Request, RequestHandler, Response } from 'express'
import PersonService from '../../services/personService'
import { fetchErrorsAndUserInput } from '../../utils/validation'
import ApplicationService from '../../services/applicationService'
import TasklistService from '../../services/tasklistService'
import paths from '../../paths/apply'

export default class ApplicationsController {
  constructor(private readonly personService: PersonService, private readonly applicationService: ApplicationService) {}

  new(): RequestHandler {
    return async (req: Request, res: Response) => {
      const applications = await this.applicationService.getAllApplications(req.user.token)

      const { errors, errorSummary, userInput } = fetchErrorsAndUserInput(req)

      return res.render('applications/new', {
        errors,
        errorSummary,
        ...userInput,
        pageHeading: "Enter the person's CRN",
        applications,
      })
    }
  }

  // show(): RequestHandler {
  //   return async (req: Request, res: Response) => {
  //     const { crn } = req.params
  //     console.log('CRN', crn)

  //     return res.render('applications/health-needs/substance', {
  //       pageHeading: 'Heading set in controller',
  //       oasysSections: {
  //         roshSummary: [],
  //       },
  //       crn,
  //     })
  //   }
  // }

  show(): RequestHandler {
    return async (req: Request, res: Response) => {
      const application = await this.applicationService.findApplication(req.user.token, req.params.id)
      const taskList = new TasklistService(application)
      console.log('**APPLICATION STATUS**: ', application.status)
      res.render('applications/tasklist', { application, taskList })
      // if (application.status !== 'inProgress') {
      //   const referrer = req.headers.referer
      //   res.render('applications/show', { application, referrer })
      // } else {
      //   res.render('applications/tasklist', { application, taskList })
      // }
    }
  }

  create(): RequestHandler {
    return async (req: Request, res: Response) => {
      const { crn } = req.body

      await this.applicationService.createApplication(req.user.token, crn)

      return res.redirect(paths.applications.new({}))
    }
  }
}
