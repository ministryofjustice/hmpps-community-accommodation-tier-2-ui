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
      const { prisonNumber } = req.body

      if (prisonNumber) {
        try {
          const person = await this.personService.findByPrisonNumber(req.user.token, prisonNumber)

          const application = await this.applicationService.createApplication(req.user.token, person.crn)
          res.redirect(paths.applications.show({ id: application.id }))
        } catch (err) {
          if (err.status === 404) {
            this.addErrorMessagesToFlash(req, `No person with a prison number of '${prisonNumber}' was found`)
          } else if (err.status === 403) {
            this.addErrorMessagesToFlash(req, `You do not have permission to access the prison number ${prisonNumber}`)
          } else {
            throw err
          }

          res.redirect(req.headers.referer)
        }
      } else {
        this.addErrorMessagesToFlash(req, 'You must enter a prison number')
        res.redirect(req.headers.referer)
      }
    }
  }

  addErrorMessagesToFlash(request: Request, message: string) {
    request.flash('errors', {
      prisonNumber: errorMessage('prisonNumber', message),
    })
    request.flash('errorSummary', [errorSummary('prisonNumber', message)])
    request.flash('userInput', request.body)
  }
}
