import { oasysSectionsFactory, personFactory } from '../testutils/factories'
import PersonService from './personService'
import { PersonClient } from '../data'

jest.mock('../data/personClient.ts')

describe('Person Service', () => {
  const personClient = new PersonClient(null) as jest.Mocked<PersonClient>
  const personClientFactory = jest.fn()

  const service = new PersonService(personClientFactory)

  const token = 'SOME_TOKEN'

  beforeEach(() => {
    jest.resetAllMocks()
    personClientFactory.mockReturnValue(personClient)
  })

  describe('findByCrn', () => {
    it('on success returns the person given their CRN', async () => {
      const person = personFactory.build()
      personClient.search.mockResolvedValue(person)

      const postedPerson = await service.findByCrn(token, 'crn')

      expect(postedPerson).toEqual(person)

      expect(personClientFactory).toHaveBeenCalledWith(token)
      expect(personClient.search).toHaveBeenCalledWith('crn')
    })
  })

  describe('getOasysSections', () => {
    it('returns oasysSections', async () => {
      const expectedOasysSections = oasysSectionsFactory.build()
      personClient.oasysSections.mockResolvedValue(expectedOasysSections)

      const oasysSections = await service.getOasysSections(token, 'crn')

      expect(oasysSections).toEqual(expectedOasysSections)

      expect(personClientFactory).toHaveBeenCalledWith(token)
      expect(personClient.oasysSections).toHaveBeenCalledWith('crn')
    })
  })
})
