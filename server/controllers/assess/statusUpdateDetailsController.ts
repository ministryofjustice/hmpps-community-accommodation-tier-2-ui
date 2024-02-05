import { Request, RequestHandler, Response } from 'express'
import { FullPerson } from '@approved-premises/api'
import SubmittedApplicationService from '../../services/submittedApplicationService'
import paths from '../../paths/assess'
import { ValidationError } from '../../utils/errors'
import { catchValidationErrorOrPropogate, fetchErrorsAndUserInput } from '../../utils/validation'
import { camelToKebabCase, kebabToCamelCase } from '../../utils/utils'
import { getStatusDetailsByStatusName, getStatusDetailQuestionText } from '../../utils/assessUtils'
import errorLookups from '../../i18n/en/errors.json'

export default class StatusUpdateDetailsController {
  constructor(private readonly submittedApplicationService: SubmittedApplicationService) {}

  new(): RequestHandler {
    return async (req: Request, res: Response) => {
      const { errors, errorSummary } = fetchErrorsAndUserInput(req)
      const statusName = kebabToCamelCase(req.params.statusName)

      try {
        const statuses = await this.submittedApplicationService.getApplicationStatuses(req.user.token)
        const isStatusValid = statuses.some(status => status.name === statusName)

        if (!isStatusValid) {
          throw new ValidationError({ newStatus: 'Select an application status' })
        }

        const statusDetails = getStatusDetailsByStatusName(statuses, statusName)

        const application = await this.submittedApplicationService.findApplication(req.user.token, req.params.id)
        const person = application.person as FullPerson

        const currentStatus = application.statusUpdates.length ? application.statusUpdates[0].label : 'Received'

        return res.render('assess/statusUpdateDetails/new', {
          application,
          person,
          currentStatus,
          statusName,
          statusDetails,
          errors,
          errorSummary,
          pageHeading: getStatusDetailQuestionText(statusName),
          questionText: getStatusDetailQuestionText(statusName),
        })
      } catch (err) {
        return catchValidationErrorOrPropogate(
          req,
          res,
          err,
          paths.submittedApplications.overview({ id: req.params.id }),
        )
      }
    }
  }

  create(): RequestHandler {
    return async (req: Request, res: Response) => {
      const applicationId = req.params.id
      const { statusName } = req.params

      const { newStatus } = req.body

      const newStatusDetails =
        typeof req.body.newStatusDetails === 'string' ? [req.body.newStatusDetails] : req.body.newStatusDetails

      try {
        if (!newStatusDetails) {
          throw new ValidationError({ newStatusDetails: errorLookups.newStatusDetails[newStatus]?.empty })
        }

        await this.submittedApplicationService.updateApplicationStatus(req.user.token, applicationId, {
          newStatus,
          newStatusDetails,
        })

        res.redirect(paths.submittedApplications.overview({ id: applicationId }))
      } catch (err) {
        catchValidationErrorOrPropogate(
          req,
          res,
          err,
          paths.statusUpdateDetails.new({ id: applicationId, statusName: camelToKebabCase(statusName) }),
        )
      }
    }
  }
}
