import type { Request } from 'express'
import { Unit, Cas2Application as Application, Cas2Application, Cas2ApplicationSummary } from '@approved-premises/api'
import {
  DataServices,
  GroupedApplications,
  PaginatedResponse,
  PaginatedResponseWithFormattedData,
} from '@approved-premises/ui'
import { getBody, getPageName, getTaskName, pageBodyShallowEquals } from '../form-pages/utils'
import type { ApplicationClient, RestClientBuilder } from '../data'
import { getApplicationSubmissionData, getApplicationUpdateData } from '../utils/applications/getApplicationData'
import TaskListPage, { TaskListPageInterface } from '../form-pages/taskListPage'
import CheckYourAnswers from '../form-pages/apply/check-your-answers/check-your-answers/checkYourAnswers'
import { ValidationError } from '../utils/errors'
import deleteOrphanedFollowOnAnswers from '../utils/applications/deleteOrphanedData'
import { DateFormats } from '../utils/dateUtils'
import { getStatusTag } from '../utils/applicationUtils'
import applyPaths from '../paths/apply'

export default class ApplicationService {
  constructor(private readonly applicationClientFactory: RestClientBuilder<ApplicationClient>) {}

  async createApplication(token: string, crn: string): Promise<Application> {
    const applicationClient = this.applicationClientFactory(token)

    const application = await applicationClient.create(crn)

    return application
  }

  async findApplication(token: string, id: string): Promise<Application> {
    const applicationClient = this.applicationClientFactory(token)

    const application = await applicationClient.find(id)

    return application
  }

  async getAllForLoggedInUser(token: string): Promise<GroupedApplications> {
    const applicationClient = this.applicationClientFactory(token)
    const [inProgress, submitted, transferredOut] = await Promise.all([
      applicationClient.getApplicationsForUser('CREATED'),
      applicationClient.getApplicationsForUser('ALLOCATED'),
      applicationClient.getApplicationsForUser('DEALLOCATED'),
    ])

    return {
      inProgress,
      submitted,
      transferredOut,
    } as GroupedApplications
  }

  async getAllByPrison(
    token: string,
    prisonCode: string,
    pageNumber: number = 1,
  ): Promise<PaginatedResponse<Cas2ApplicationSummary>> {
    const applicationClient = this.applicationClientFactory(token)

    return applicationClient.getApplicationsForPrison(prisonCode, pageNumber, 'ALLOCATED')
  }

  async getPrisonNewTransferredIn(
    token: string,
    prisonCode: string,
    pageNumber: number = 1,
  ): Promise<PaginatedResponseWithFormattedData> {
    const applicationClient = this.applicationClientFactory(token)

    const applications = await applicationClient.getApplicationsForPrison(prisonCode, pageNumber, 'UNALLOCATED')

    const newData = applications.data.map(application => {
      return [
        {
          html: `<a href=${applyPaths.applications.overview({ id: application.id })} data-cy-id="unallocatedId-${application.id}">${application.personName}</a>`,
        },
        { text: application.nomsNumber },
        application.hdcEligibilityDate
          ? { text: DateFormats.isoDateToUIDate(application.hdcEligibilityDate, { format: 'medium' }) }
          : { text: undefined },
        { html: getStatusTag(application.latestStatusUpdate?.label, application.latestStatusUpdate?.statusId) },
      ]
    })

    return { ...applications, data: newData }
  }

  async save(page: TaskListPage, request: Request) {
    const errors = page.errors()

    if (Object.keys(errors).length) {
      throw new ValidationError<typeof page>(errors)
    } else {
      const application = await this.findApplication(request.user.token, request.params.id)
      const client = this.applicationClientFactory(request.user.token)

      if (typeof page.onSave === 'function') {
        page.onSave()
      }

      const pageName = getPageName(page.constructor)
      const taskName = getTaskName(page.constructor)
      const oldBody = application.data?.[taskName]?.[pageName]

      application.data = this.addPageDataToApplicationData(application.data, taskName, pageName, page)
      application.data = deleteOrphanedFollowOnAnswers(application.data)
      application.data = this.deleteCheckYourAnswersIfPageChange(application.data, pageName, oldBody, page.body)

      await client.update(application.id, getApplicationUpdateData(application))
    }
  }

  private addPageDataToApplicationData(
    applicationData: Unit,
    taskName: string,
    pageName: string,
    page: TaskListPage,
  ): Unit {
    const newApplicationData = applicationData || {}
    newApplicationData[taskName] = newApplicationData[taskName] || {}
    newApplicationData[taskName][pageName] = page.body
    return newApplicationData
  }

  private deleteCheckYourAnswersIfPageChange(applicationData: Unit, pageName: string, oldBody: Unit, newBody: Unit) {
    const checkYourAnswersTaskName = getTaskName(CheckYourAnswers)
    const checkYourAnswersPageName = getPageName(CheckYourAnswers)

    const pageHasChangedSinceLastSave = () => {
      return !oldBody || !pageBodyShallowEquals(oldBody, newBody)
    }

    if (pageName !== checkYourAnswersPageName) {
      if (pageHasChangedSinceLastSave()) {
        delete applicationData[checkYourAnswersTaskName]
      }
    }

    return applicationData
  }

  async saveData(taskData: Unit, request: Request) {
    const application = await this.findApplication(request.user.token, request.params.id)
    const client = this.applicationClientFactory(request.user.token)

    application.data = {
      ...application.data,
      ...taskData,
    }

    await client.update(application.id, getApplicationUpdateData(application))
  }

  async appendToList(page: TaskListPage, request: Request) {
    const errors = page.errors()

    if (Object.keys(errors).length) {
      throw new ValidationError<typeof page>(errors)
    } else {
      const application = await this.findApplication(request.user.token, request.params.id)
      const client = this.applicationClientFactory(request.user.token)

      const pageName = getPageName(page.constructor)
      const taskName = getTaskName(page.constructor)

      /* eslint-disable no-underscore-dangle */
      delete request.body._csrf

      if (this.hasPageData(application, taskName, pageName)) {
        application.data[taskName][pageName].push(request.body)
      } else {
        application.data = application.data || {}
        application.data[taskName] = application.data[taskName] || {}
        application.data[taskName][pageName] = [{ ...request.body }]
      }

      await client.update(application.id, getApplicationUpdateData(application))
    }
  }

  async removeFromList(request: Request) {
    const application = await this.findApplication(request.user.token, request.params.id)
    const client = this.applicationClientFactory(request.user.token)

    const { page, task, index } = request.params

    if (this.hasPageData(application, task, page)) {
      application.data[task][page].splice(index, 1)
      await client.update(application.id, getApplicationUpdateData(application))
    }
  }

  private hasPageData(application: Application, taskName: string, pageName: string) {
    return application.data && application.data[taskName] && application.data[taskName][pageName]
  }

  async initializePage(
    Page: TaskListPageInterface,
    request: Request,
    dataServices: DataServices,
    userInput?: Record<string, unknown>,
  ): Promise<TaskListPage> {
    const application = await this.findApplication(request.user.token, request.params.id)
    const body = getBody(Page, application, request, userInput)

    const page = Page.initialize
      ? await Page.initialize(body, application, request.user.token, dataServices)
      : new Page(body, application, request.session.previousPage)

    return page
  }

  async submit(token: string, application: Cas2Application) {
    const client = this.applicationClientFactory(token)

    await client.submit(application.id, getApplicationSubmissionData(application))
  }

  async cancel(token: string, application: Cas2Application) {
    const client = this.applicationClientFactory(token)

    await client.abandon(application.id)
  }
}
