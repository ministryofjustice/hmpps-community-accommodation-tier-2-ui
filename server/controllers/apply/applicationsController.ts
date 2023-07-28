import { Request, RequestHandler, Response } from 'express'
import PersonService from '../../services/personService'
import { fetchErrorsAndUserInput } from '../../utils/validation'
import ApplicationService from '../../services/applicationService'
import TaskListService from '../../services/taskListService'
import paths from '../../paths/apply'

export default class ApplicationsController {
  constructor(
    private readonly _personService: PersonService,
    private readonly applicationService: ApplicationService,
  ) {}

  index(): RequestHandler {
    return async (req: Request, res: Response) => {
      const applications = await this.applicationService.getAllForLoggedInUser(req.user.token)

      const { errors, errorSummary, userInput } = fetchErrorsAndUserInput(req)

      return res.render('applications/index', {
        errors,
        errorSummary,
        ...userInput,
        applications,
        pageHeading: 'Applications',
      })
    }
  }

  show(): RequestHandler {
    return async (req: Request, res: Response) => {
      const application = await this.applicationService.findApplication(req.user.token, req.params.id)
      const taskList = new TaskListService(application)

      return res.render('applications/taskList', { application, taskList })
    }
  }

  create(): RequestHandler {
    return async (req: Request, res: Response) => {
      const { crn } = req.body

      await this.applicationService.createApplication(req.user.token, crn)

      return res.redirect(paths.applications.new({}))
    }
  }

  new(): RequestHandler {
    return async (req: Request, res: Response) => {
      const { errors, errorSummary, userInput } = fetchErrorsAndUserInput(req)

      return res.render('applications/new', {
        errors,
        errorSummary,
        ...userInput,
        pageHeading: "Enter the person's CRN",
      })
    }
  }
}
