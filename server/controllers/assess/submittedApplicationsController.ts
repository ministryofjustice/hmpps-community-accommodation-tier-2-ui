import { Request, RequestHandler, Response } from 'express'
import { Cas2StatusUpdate, FullPerson } from '@approved-premises/api'
import { UiTimelineEvent } from '@approved-premises/ui'
import SubmittedApplicationService from '../../services/submittedApplicationService'
import { DateFormats } from '../../utils/dateUtils'

export default class SubmittedApplicationsController {
  constructor(private readonly submittedApplicationService: SubmittedApplicationService) {}

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

  private getSubmittedTimelineEvent(name: string, submittedAt: string): UiTimelineEvent {
    return {
      label: { text: 'Application submitted' },
      byline: {
        text: name,
      },
      datetime: {
        timestamp: submittedAt,
        date: DateFormats.isoDateTimeToUIDateTime(submittedAt),
      },
      description: {
        text: 'The application was received by an assessor.',
      },
    }
  }

  private getStatusTimelineEvents(statusUpdates: Array<Cas2StatusUpdate>): Array<UiTimelineEvent> {
    return statusUpdates
      .sort((a, b) => Number(DateFormats.isoToDateObj(b.updatedAt)) - Number(DateFormats.isoToDateObj(a.updatedAt)))
      .map(statusUpdate => {
        return {
          label: { text: statusUpdate.label },
          byline: {
            text: statusUpdate.updatedBy.username,
          },
          datetime: {
            timestamp: statusUpdate.updatedAt,
            date: DateFormats.isoDateTimeToUIDateTime(statusUpdate.updatedAt),
          },
          description: {
            text: statusUpdate.description,
          },
        }
      })
  }

  overview(): RequestHandler {
    return async (req: Request, res: Response) => {
      const application = await this.submittedApplicationService.findApplication(req.user.token, req.params.id)

      const timelineEvents: Array<UiTimelineEvent> = [
        ...this.getStatusTimelineEvents(application.statusUpdates),
        this.getSubmittedTimelineEvent(application.submittedBy.name, application.submittedAt),
      ]

      return res.render('assess/applications/overview', {
        application,
        pageHeading: 'Overview of application',
        timelineEvents,
      })
    }
  }
}
