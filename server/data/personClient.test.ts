import PersonClient from './personClient'
import { oasysRiskToSelfFactory, oasysSectionsFactory, personFactory, oasysRoshFactory } from '../testutils/factories'
import paths from '../paths/api'

import describeClient from '../testutils/describeClient'

describeClient('PersonClient', provider => {
  let personClient: PersonClient

  const token = 'token-1'

  beforeEach(() => {
    personClient = new PersonClient(token)
  })

  describe('oasysSections', () => {
    it('should return the sections of OASys when there is optional selected sections', async () => {
      const crn = 'crn'
      const optionalSections = [1, 2, 3]
      const oasysSections = oasysSectionsFactory.build()

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to get the optional selected sections of OASys for a person',
        withRequest: {
          method: 'GET',
          path: paths.people.oasys.sections({ crn }),
          query: {
            'selected-sections': ['1', '2', '3'],
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: oasysSections,
        },
      })

      const result = await personClient.oasysSections(crn, optionalSections)

      expect(result).toEqual(oasysSections)
    })

    it('should return the sections of OASys with no optional selected sections', async () => {
      const crn = 'crn'
      const oasysSections = oasysSectionsFactory.build()

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to get sections of OASys for a person',
        withRequest: {
          method: 'GET',
          path: paths.people.oasys.sections({ crn }),
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: oasysSections,
        },
      })

      const result = await personClient.oasysSections(crn)

      expect(result).toEqual(oasysSections)
    })
  })

  describe('oasysRiskToSelf', () => {
    it('should return the Risk to Self data', async () => {
      const crn = 'crn'
      const oasysRiskToSelf = oasysRiskToSelfFactory.build()

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to get the optional selected sections of OASys for a person',
        withRequest: {
          method: 'GET',
          path: paths.people.oasys.riskToSelf({ crn }),
          query: {},
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: oasysRiskToSelf,
        },
      })

      const result = await personClient.oasysRiskToSelf(crn)

      expect(result).toEqual(oasysRiskToSelf)
    })
  })

  describe('oasysRosh', () => {
    it('should return the Rosh data', async () => {
      const crn = 'crn'
      const oasysRosh = oasysRoshFactory.build()

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to get the optional selected sections of OASys for a person',
        withRequest: {
          method: 'GET',
          path: paths.people.oasys.rosh({ crn }),
          query: {},
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: oasysRosh,
        },
      })

      const result = await personClient.oasysRosh(crn)

      expect(result).toEqual(oasysRosh)
    })
  })

  describe('search', () => {
    it('should return a person', async () => {
      const person = personFactory.build()

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to search for a person',
        withRequest: {
          method: 'GET',
          path: `/people/search`,
          query: {
            crn: 'crn',
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: person,
        },
      })

      const result = await personClient.search('crn')

      expect(result).toEqual(person)
    })
  })
})
