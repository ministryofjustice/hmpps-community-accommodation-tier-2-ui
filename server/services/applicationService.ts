import type { Request } from 'express'
import { AnyValue, Cas2Application as Application, Cas2Application } from '@approved-premises/api'
import type { DataServices, GroupedApplications } from '@approved-premises/ui'
import { getBody, getPageName, getTaskName, pageBodyShallowEquals } from '../form-pages/utils'
import type { ApplicationClient, RestClientBuilder } from '../data'
import { getApplicationSubmissionData, getApplicationUpdateData } from '../utils/applications/getApplicationData'
import TaskListPage, { TaskListPageInterface } from '../form-pages/taskListPage'
import CheckYourAnswers from '../form-pages/apply/check-your-answers/check-your-answers/checkYourAnswers'
import { ValidationError } from '../utils/errors'

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

    const allApplications = await applicationClient.all()

    const result = {
      inProgress: [],
      submitted: [],
    } as GroupedApplications

    allApplications.map(async application => {
      if (application.status === 'inProgress') {
        result.inProgress.push(application)
      } else if (application.status === 'submitted') {
        result.submitted.push(application)
      }
    })

    return result
  }

  async save(page: TaskListPage, request: Request) {
    const errors = page.errors()

    if (Object.keys(errors).length) {
      throw new ValidationError<typeof page>(errors)
    } else {
      const application = await this.findApplication(request.user.token, request.params.id)
      const client = this.applicationClientFactory(request.user.token)

      const pageName = getPageName(page.constructor)
      const taskName = getTaskName(page.constructor)
      const oldBody = application.data?.[taskName]?.[pageName]

      application.data = this.addPageDataToApplicationData(application.data, taskName, pageName, page)
      application.data = this.deleteOrphanedFollowOnAnswers(application.data)
      application.data = this.deleteCheckYourAnswersIfPageChange(application.data, pageName, oldBody, page.body)

      await client.update(application.id, getApplicationUpdateData(application))
    }
  }

  private addPageDataToApplicationData(
    applicationData: AnyValue,
    taskName: string,
    pageName: string,
    page: TaskListPage,
  ): AnyValue {
    const newApplicationData = applicationData || {}
    newApplicationData[taskName] = newApplicationData[taskName] || {}
    newApplicationData[taskName][pageName] = page.body
    return newApplicationData
  }

  private deleteCheckYourAnswersIfPageChange(
    applicationData: AnyValue,
    pageName: string,
    oldBody: AnyValue,
    newBody: AnyValue,
  ) {
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

  private deleteOrphanedFollowOnAnswers(applicationData: AnyValue): AnyValue {
    const deleteOrphanedFundingInformation = () => {
      delete applicationData['funding-information'].identification
      delete applicationData['funding-information']['alternative-identification']
    }

    const deleteOrphanedEqualityInformation = () => {
      Object.keys(applicationData['equality-and-diversity-monitoring']).forEach(key => {
        if (key !== 'will-answer-equality-questions') {
          delete applicationData['equality-and-diversity-monitoring'][key]
        }
      })
    }

    const deleteOrphanedOffendingHistoryInformation = () => {
      delete applicationData['offending-history']['offence-history-data']
    }

    const hasOrphanedInformation = ({
      taskName,
      pageName,
      questionKey,
      answerToCheck,
    }: {
      taskName: string
      pageName: string
      questionKey: string
      answerToCheck: string
    }) => {
      return applicationData[taskName]?.[pageName]?.[questionKey] === answerToCheck
    }

    if (
      hasOrphanedInformation({
        taskName: 'funding-information',
        pageName: 'funding-source',
        questionKey: 'fundingSource',
        answerToCheck: 'personalSavings',
      })
    ) {
      deleteOrphanedFundingInformation()
    }

    if (
      hasOrphanedInformation({
        taskName: 'equality-and-diversity-monitoring',
        pageName: 'will-answer-equality-questions',
        questionKey: 'willAnswer',
        answerToCheck: 'no',
      })
    ) {
      deleteOrphanedEqualityInformation()
    }

    if (
      hasOrphanedInformation({
        taskName: 'offending-history',
        pageName: 'any-previous-convictions',
        questionKey: 'hasAnyPreviousConvictions',
        answerToCheck: 'no',
      })
    ) {
      deleteOrphanedOffendingHistoryInformation()
    }
    return applicationData
  }

  async saveData(taskData: AnyValue, request: Request) {
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
}
