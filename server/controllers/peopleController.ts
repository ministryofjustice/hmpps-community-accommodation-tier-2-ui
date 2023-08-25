import type { Request, RequestHandler, Response } from 'express'
import paths from '../paths/apply'
import { errorMessage, errorSummary } from '../utils/validation'
import { isFullPerson } from '../utils/utils'
import PersonService from '../services/personService'
import ApplicationService from '../services/applicationService'
import { RestrictedPersonError } from '../utils/errors'

export default class PeopleController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly personService: PersonService,
  ) {}

  find(): RequestHandler {
    return async (req: Request, res: Response) => {
      const { crn } = req.body

      if (crn) {
        try {
          const person = await this.personService.findByCrn(req.user.token, crn)

          if (!isFullPerson(person)) {
            throw new RestrictedPersonError(crn)
          }
          const application = await this.applicationService.createApplication(req.user.token, person.crn)
          res.redirect(paths.applications.show({ id: application.id }))
        } catch (err) {
          if (err.status === 404) {
            this.addErrorMessagesToFlash(req, `No person with a CRN of '${crn}' was found`)
          } else if (err.status === 403) {
            this.addErrorMessagesToFlash(req, 'You do not have permission to access this CRN')
          } else if (err.type === 'RESTRICTED_PERSON') {
            this.addErrorMessagesToFlash(req, `The CRN ${crn} is restricted`)
          } else {
            throw err
          }

          res.redirect(req.headers.referer)
        }
      } else {
        this.addErrorMessagesToFlash(req, 'You must enter a CRN')
        res.redirect(req.headers.referer)
      }
    }
  }

  addErrorMessagesToFlash(request: Request, message: string) {
    request.flash('errors', {
      crn: errorMessage('crn', message),
    })
    request.flash('errorSummary', [errorSummary('crn', message)])
    request.flash('userInput', request.body)
  }
}
