import { Request, RequestHandler, Response } from 'express'
import { UpdateCas2Assessment } from '@approved-premises/api'
import { SubmittedApplicationService, AssessmentService } from '../../services'
import { catchValidationErrorOrPropogate, fetchErrorsAndUserInput } from '../../utils/validation'
import { assessmentHasExistingData } from '../../utils/assessmentUtils'
import paths from '../../paths/assess'

export default class AssessmentsController {
  constructor(
    private readonly submittedApplicationService: SubmittedApplicationService,
    private readonly assessmentService: AssessmentService,
  ) {}

  show(): RequestHandler {
    return async (req: Request, res: Response) => {
      const { errors, errorSummary, userInput } = fetchErrorsAndUserInput(req)

      try {
        const application = await this.submittedApplicationService.findApplication(req.user.token, req.params.id)

        return res.render('assess/applications/assessments/show', {
          errors,
          errorSummary,
          ...userInput,
          application,
          assessmentHasExistingData: assessmentHasExistingData(application.assessment),
          assessorName: application.assessment.assessorName,
          nacroReferralId: application.assessment.nacroReferralId,
          pageHeading: 'Add assessment details',
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

  update(): RequestHandler {
    return async (req: Request, res: Response) => {
      const updateData = {
        assessorName: req.body.assessorName,
        nacroReferralId: req.body.nacroReferralId,
      } as UpdateCas2Assessment

      try {
        const application = await this.submittedApplicationService.findApplication(req.user.token, req.params.id)

        await this.assessmentService.updateAssessment(req.user.token, application.assessment.id, updateData)

        req.flash('success', 'Assessment details were saved.')
        return res.redirect(paths.submittedApplications.overview({ id: req.params.id }))
      } catch (err) {
        return catchValidationErrorOrPropogate(req, res, err, paths.assessmentDetails.show({ id: req.params.id }))
      }
    }
  }
}
