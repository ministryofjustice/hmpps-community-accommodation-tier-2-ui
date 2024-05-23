import { Request, RequestHandler, Response } from 'express'
import { nameOrPlaceholderCopy } from '../../../utils/utils'
import { fetchErrorsAndUserInput, errorSummary as buildErrorSummary } from '../../../utils/validation'
import { ApplicationService } from '../../../services'
import paths from '../../../paths/apply'

export default class CancelController {
  constructor(private readonly applicationService: ApplicationService) {}

  new(): RequestHandler {
    return async (req: Request, res: Response) => {
      const application = await this.applicationService.findApplication(req.user.token, req.params.id)

      const { errors, errorSummary } = fetchErrorsAndUserInput(req)

      const questionCopy = `Are you sure you would like to cancel ${nameOrPlaceholderCopy(application.person, 'this person')}'s application?`

      return res.render('applications/cancel', { application, errors, errorSummary, questionCopy })
    }
  }

  update(): RequestHandler {
    return async (req: Request, res: Response) => {
      const { cancelYesOrNo } = req.body
      const applicationId = req.params.id

      if (cancelYesOrNo === 'yes') {
        try {
          const application = await this.applicationService.findApplication(req.user.token, applicationId)
          await this.applicationService.cancel(req.user.token, application)
          req.flash('success', `The application for ${nameOrPlaceholderCopy(application.person)} has been cancelled.`)
        } catch (err) {
          req.flash('errorSummary', [
            buildErrorSummary(`cancel-${applicationId}`, 'There was an error cancelling the application.'),
          ])
        }
      }

      return res.redirect(paths.applications.index({}))
    }
  }
}
