import { SubmitCas2Application, UpdateApplication } from '@approved-premises/api'
import ApplicationClient from './applicationClient'
import { applicationFactory, applicationNoteFactory } from '../testutils/factories'
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
    it('should return an application when a crn is posted', async () => {
      const application = applicationFactory.build()

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to create an Application with risks',
        withRequest: {
          method: 'POST',
          path: paths.applications.new.pattern,
          body: {
            crn: application.person.crn,
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 201,
          body: application,
        },
      })

      const result = await applicationClient.create(application.person.crn)

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
        telephoneNumber: '123',
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

  describe('addNote', () => {
    it('should create a note', async () => {
      const application = applicationFactory.build()
      const body = {
        note: 'some note',
      }

      const applicationNote = applicationNoteFactory.build({ body: body.note })

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to add a note to an application',
        withRequest: {
          method: 'POST',
          path: paths.submissions.applicationNotes.create({ id: application.id }),
          body,
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: applicationNote,
        },
      })

      const result = await applicationClient.addNote(application.id, body.note)

      expect(result).toEqual(applicationNote)
    })
  })
})
