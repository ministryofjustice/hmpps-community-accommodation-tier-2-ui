import { Request, RequestHandler, Response } from 'express'
import { Cas2Application } from '@approved-premises/api'
import PersonService from '../../services/personService'
import { fetchErrorsAndUserInput } from '../../utils/validation'
import ApplicationService from '../../services/applicationService'
import {
  eligibilityIsDenied,
  eligibilityIsConfirmed,
  firstPageOfBeforeYouStartSection,
} from '../../utils/applications/utils'
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

      if (eligibilityIsConfirmed(application)) {
        const taskList = new TaskListService(application)
        return res.render('applications/taskList', { application, taskList })
      }

      if (eligibilityIsDenied(application)) {
        return res.render('applications/ineligible', this.ineligibleViewParams(application))
      }

      return res.redirect(firstPageOfBeforeYouStartSection(application))
    }
  }

  private ineligibleViewParams(application: Cas2Application): Record<string, string | Cas2Application> {
    const panelText = `${application.person.name} is not eligible for CAS-2 accommodation`
    const changeAnswerPath = paths.applications.pages.show({
      id: application.id,
      task: 'confirm-eligibility',
      page: 'confirm-eligibility',
    })
    const newApplicationPath = paths.applications.new({})
    return { application, panelText, changeAnswerPath, newApplicationPath }
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
