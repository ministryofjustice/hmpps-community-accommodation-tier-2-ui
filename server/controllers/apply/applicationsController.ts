import { OASysSections } from '@approved-premises/api'
import { Request, RequestHandler, Response } from 'express'
import PersonService from '../../services/personService'
import { fetchErrorsAndUserInput } from '../../utils/validation'

export default class ApplicationsController {
  constructor(private readonly personService: PersonService) {}

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

  show(): RequestHandler {
    return async (req: Request, res: Response) => {
      const { crn } = req.params

      const oasysSections: OASysSections = await this.personService.getOasysSections(req.user.token, crn)

      return res.render('applications/pages/oasys-import/oasys-information', {
        pageHeading: 'Risk of Serious Harm Summary',
        oasysSections: {
          roshSummary: [oasysSections.roshSummary[0]],
        },
      })
    }
  }
}
