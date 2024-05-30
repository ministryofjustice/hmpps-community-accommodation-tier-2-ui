import { Request, RequestHandler, Response } from 'express'
import { FullPerson } from '@approved-premises/api'
import SubmittedApplicationService from '../../services/submittedApplicationService'
import assessPaths from '../../paths/assess'
import { getPaginationDetails } from '../../utils/getPaginationDetails'
import { catchValidationErrorOrPropogate, fetchErrorsAndUserInput } from '../../utils/validation'
import { assessmentHasExistingData } from '../../utils/assessmentUtils'

export default class SubmittedApplicationsController {
  constructor(private readonly submittedApplicationService: SubmittedApplicationService) {}

  index(): RequestHandler {
    return async (req: Request, res: Response) => {
      const { pageNumber, hrefPrefix } = getPaginationDetails(req, assessPaths.submittedApplications.index({}))

      const result = await this.submittedApplicationService.getAll(req.user.token, pageNumber)

      return res.render('assess/applications/index', {
        applications: result.data,
        pageNumber: Number(result.pageNumber),
        totalPages: Number(result.totalPages),
        hrefPrefix,
        pageHeading: 'Submitted Applications',
      })
    }
  }

  show(): RequestHandler {
    return async (req: Request, res: Response) => {
      const application = await this.submittedApplicationService.findApplication(req.user.token, req.params.id)
      const person = application.person as FullPerson

      return res.render('assess/applications/show', {
        application,
        pageHeading: `Application for ${person.nomsNumber}`,
      })
    }
  }

  overview(): RequestHandler {
    return async (req: Request, res: Response) => {
      const { errors, errorSummary } = fetchErrorsAndUserInput(req)

      const application = await this.submittedApplicationService.findApplication(req.user.token, req.params.id)

      const status = application.assessment.statusUpdates?.length
        ? application.assessment.statusUpdates[0].label
        : 'Received'

      return res.render('assess/applications/overview', {
        application,
        status,
        errors,
        errorSummary,
        pageHeading: 'Overview of application',
        assessmentHasExistingData: assessmentHasExistingData(application.assessment),
      })
    }
  }

  addNote() {
    return async (req: Request, res: Response) => {
      const { id } = req.params
      const { applicationId } = req.query as { applicationId: string }
      const { note } = req.body

      try {
        await this.submittedApplicationService.addApplicationNote(req.user.token, id, note)
        req.flash('success', 'Your note was saved.')
        res.redirect(assessPaths.submittedApplications.overview({ id: applicationId }))
      } catch (err) {
        if (err.status === 400) {
          req.flash('errors', {
            note: { text: 'Enter a note for the referrer' },
          })
          req.flash('errorSummary', [{ text: 'Enter a note for the referrer', href: '#note' }])
          res.redirect(assessPaths.submittedApplications.overview({ id: applicationId }))
        } else {
          catchValidationErrorOrPropogate(
            req,
            res,
            err,
            assessPaths.submittedApplications.overview({ id: applicationId }),
          )
        }
      }
    }
  }
}
