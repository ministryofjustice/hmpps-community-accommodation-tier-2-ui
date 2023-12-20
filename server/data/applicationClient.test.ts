import { SubmitCas2Application, UpdateApplication } from '@approved-premises/api'
import ApplicationClient from './applicationClient'
import { applicationFactory } from '../testutils/factories'
import { fullPersonFactory } from '../testutils/factories/person'
import paths from '../paths/api'
import describeClient from '../testutils/describeClient'

describeClient('ApplicationClient', provider => {
  let applicationClient: ApplicationClient

  const token = 'token-1'

  beforeEach(() => {
    applicationClient = new ApplicationClient(token)
  })

  describe('find', () => {
    it('should return an application', async () => {
      const application = applicationFactory.build()

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request for an application',
        withRequest: {
          method: 'GET',
          path: paths.applications.show({ id: application.id }),
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: application,
        },
      })

      const result = await applicationClient.find(application.id)

      expect(result).toEqual(application)
    })
  })

  describe('create', () => {
    it('should return an application when a new application is posted', async () => {
      const person = fullPersonFactory.build()
      const application = applicationFactory.build({ person })
      const newApplication = {
        crn: person.crn,
        nomsNumber: person.nomsNumber,
        pncNumber: person.pncNumber,
        name: person.name,
        dateOfBirth: person.dateOfBirth,
        nationality: person.nationality,
        sex: person.sex,
        prisonName: person.prisonName,
        personStatus: person.status,
      }

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to create an Application with risks',
        withRequest: {
          method: 'POST',
          path: paths.applications.new.pattern,
          body: { ...newApplication },
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 201,
          body: application,
        },
      })

      const result = await applicationClient.create(newApplication)

      expect(result).toEqual(application)
    })
  })

  describe('all', () => {
    it('should get all previous applications', async () => {
      const previousApplications = applicationFactory.buildList(5)

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request for all applications',
        withRequest: {
          method: 'GET',
          path: paths.applications.index.pattern,
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: previousApplications,
        },
      })

      const result = await applicationClient.all()

      expect(result).toEqual(previousApplications)
    })
  })

  describe('update', () => {
    it('should return an application when a PUT request is made', async () => {
      const application = applicationFactory.build()
      const data = {
        data: application.data,
        type: 'CAS2',
      } as UpdateApplication

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'Request to update an application',
        withRequest: {
          method: 'PUT',
          path: paths.applications.update({ id: application.id }),
          body: JSON.stringify(data),
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: application,
        },
      })

      const result = await applicationClient.update(application.id, data)

      expect(result).toEqual(application)
    })
  })

  describe('submit', () => {
    it('should submit an application', async () => {
      const application = applicationFactory.build()
      const data = {
        translatedDocument: application.document,
        applicationId: application.id,
      } as SubmitCas2Application

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to submit an application',
        withRequest: {
          method: 'POST',
          path: paths.submissions.create.pattern,
          body: data,
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
        },
      })

      await applicationClient.submit(application.id, data)
    })
  })
})
