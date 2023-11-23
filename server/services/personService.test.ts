import { oasysRiskToSelfFactory, oasysRoshFactory, personFactory, risksFactory } from '../testutils/factories'
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

  describe('findByPrisonNumber', () => {
    it('on success returns the person given their prison number', async () => {
      const person = personFactory.build()
      personClient.search.mockResolvedValue(person)

      const postedPerson = await service.findByPrisonNumber(token, 'prisonNumber')

      expect(postedPerson).toEqual(person)

      expect(personClientFactory).toHaveBeenCalledWith(token)
      expect(personClient.search).toHaveBeenCalledWith('prisonNumber')
    })
  })

  describe('getOasysRiskToSelf', () => {
    it('returns risk to self data', async () => {
      const expectedRiskToSelf = oasysRiskToSelfFactory.build()
      personClient.oasysRiskToSelf.mockResolvedValue(expectedRiskToSelf)

      const oasysSections = await service.getOasysRiskToSelf(token, 'crn')

      expect(oasysSections).toEqual(expectedRiskToSelf)

      expect(personClientFactory).toHaveBeenCalledWith(token)
      expect(personClient.oasysRiskToSelf).toHaveBeenCalledWith('crn')
    })
  })

  describe('getOasysRosh', () => {
    it('returns Rosh data', async () => {
      const expectedRosh = oasysRoshFactory.build()
      personClient.oasysRosh.mockResolvedValue(expectedRosh)

      const oasysSections = await service.getOasysRosh(token, 'crn')

      expect(oasysSections).toEqual(expectedRosh)

      expect(personClientFactory).toHaveBeenCalledWith(token)
      expect(personClient.oasysRosh).toHaveBeenCalledWith('crn')
    })
  })

  describe('getRoshRisks', () => {
    it("on success returns the person's risks given their CRN", async () => {
      const expectedRisks = risksFactory.build()
      personClient.risks.mockResolvedValue(expectedRisks)

      const risks = await service.getRoshRisks(token, 'crn')

      expect(risks).toEqual(expectedRisks.roshRisks)

      expect(personClientFactory).toHaveBeenCalledWith(token)
      expect(personClient.risks).toHaveBeenCalledWith('crn')
    })
  })
})
