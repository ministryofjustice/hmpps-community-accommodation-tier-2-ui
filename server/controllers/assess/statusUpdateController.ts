import { Request, RequestHandler, Response } from 'express'
import { Cas2SubmittedApplication, FullPerson } from '@approved-premises/api'
import SubmittedApplicationService from '../../services/submittedApplicationService'
import paths from '../../paths/assess'
import { catchValidationErrorOrPropogate, fetchErrorsAndUserInput } from '../../utils/validation'
import { camelToKebabCase } from '../../utils/utils'
import { validateReferer } from '../../utils/viewUtils'
import { AssessmentService } from '../../services'

export default class StatusUpdateController {
  constructor(
    private readonly submittedApplicationService: SubmittedApplicationService,
    private readonly assessmentService: AssessmentService,
  ) {}

  new(): RequestHandler {
    return async (req: Request, res: Response) => {
      const { errors, errorSummary } = fetchErrorsAndUserInput(req)

      const application = await this.submittedApplicationService.findApplication(req.user.token, req.params.id)
      const person = application.person as FullPerson
      const currentStatus = application.assessment.statusUpdates?.length
        ? application.assessment.statusUpdates[0].label
        : 'Received'

      const statuses = await this.submittedApplicationService.getApplicationStatuses(req.user.token)

      const previousPath = this.previousPath(application, req.headers.referer)

      return res.render('assess/statusUpdate/new', {
        application,
        person,
        currentStatus,
        statuses,
        previousPath,
        errors,
        errorSummary,
        pageHeading: `What is the latest status of the application?`,
        questionText: `What is the latest status of ${person.name}'s application?`,
      })
    }
  }

  private previousPath(application: Cas2SubmittedApplication, referer?: string) {
    if (referer?.includes('update-status/further-information')) {
      return paths.submittedApplications.overview({ id: application.id })
    }

    return validateReferer(referer)
  }

  create(): RequestHandler {
    return async (req: Request, res: Response) => {
      const assessmentId = req.params.id
      const { applicationId } = req.query as { applicationId: string }
      const { newStatus } = req.body

      try {
        const statuses = await this.submittedApplicationService.getApplicationStatuses(req.user.token)

        const hasStatusDetails = statuses.some(
          status => Boolean(status.statusDetails?.length) && status.name === newStatus,
        )

        if (hasStatusDetails) {
          return res.redirect(
            paths.statusUpdateDetails.new({ id: applicationId, statusName: camelToKebabCase(newStatus) }),
          )
        }

        await this.assessmentService.updateAssessmentStatus(req.user.token, assessmentId, { newStatus })
        return res.redirect(paths.submittedApplications.overview({ id: applicationId }))
      } catch (err) {
        return catchValidationErrorOrPropogate(req, res, err, paths.statusUpdate.new({ id: applicationId }))
      }
    }
  }
}
