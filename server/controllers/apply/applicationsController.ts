import { OASysSections } from '@approved-premises/api'
import { Request, RequestHandler, Response } from 'express'
import PersonService from '../../services/personService'
import { fetchErrorsAndUserInput } from '../../utils/validation'
import ApplicationService from '../../services/applicationService'
import paths from '../../paths/apply'

export default class ApplicationsController {
  constructor(private readonly personService: PersonService, private readonly applicationService: ApplicationService) {}

  new(): RequestHandler {
    return async (req: Request, res: Response) => {
      const applications = await this.applicationService.getAllApplications(req.user?.token as string)

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

  show(): RequestHandler {
    return async (req: Request, res: Response) => {
      const { crn } = req.params

      const oasysSections: OASysSections = await this.personService.getOasysSections(req.user?.token as string, crn)

      return res.render('applications/pages/risks/risks', {
        pageHeading: 'Risk of Serious Harm Summary',
        oasysSections: {
          roshSummary: [oasysSections.roshSummary[0]],
        },
        crn,
      })
    }
  }

  create(): RequestHandler {
    return async (req: Request, res: Response) => {
      const { crn } = req.body

      await this.applicationService.createApplication(req.user?.token as string, crn)

      return res.redirect(paths.applications.new({}))
    }
  }
}
