import PersonClient from './personClient'
import { oasysRiskToSelfFactory, personFactory, oasysRoshFactory, risksFactory } from '../testutils/factories'
import paths from '../paths/api'

import describeClient from '../testutils/describeClient'

describeClient('PersonClient', provider => {
  let personClient: PersonClient

  const token = 'token-1'

  beforeEach(() => {
    personClient = new PersonClient(token)
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
          path: `/cas2/people/search`,
          query: {
            nomsNumber: 'nomsNumber',
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

      const result = await personClient.search('nomsNumber')

      expect(result).toEqual(person)
    })
  })

  describe('risks', () => {
    it('should return the risks for a person', async () => {
      const crn = 'crn'
      const risks = risksFactory.build()

      provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to get the risks for a person',
        withRequest: {
          method: 'GET',
          path: `/cas2/people/${crn}/risks`,
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
          body: risks,
        },
      })

      const result = await personClient.risks(crn)

      expect(result).toEqual(risks)
    })
  })
})
