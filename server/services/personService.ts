import type { FullPerson, OASysRiskOfSeriousHarm, OASysRiskToSelf, RoshRisksEnvelope } from '@approved-premises/api'
import type { PersonClient, RestClientBuilder } from '../data'

export default class PersonService {
  constructor(private readonly personClientFactory: RestClientBuilder<PersonClient>) {}

  async findByPrisonNumber(token: string, nomsNumber: string): Promise<FullPerson> {
    const personClient = this.personClientFactory(token)

    return personClient.search(nomsNumber)
  }

  async getOasysRiskToSelf(token: string, crn: string): Promise<OASysRiskToSelf> {
    const personClient = this.personClientFactory(token)

    return personClient.oasysRiskToSelf(crn)
  }

  async getOasysRosh(token: string, crn: string): Promise<OASysRiskOfSeriousHarm> {
    const personClient = this.personClientFactory(token)

    return personClient.oasysRosh(crn)
  }

  async getRoshRisks(token: string, crn: string): Promise<RoshRisksEnvelope> {
    const personClient = this.personClientFactory(token)

    const risks = await personClient.risks(crn)

    return risks.roshRisks
  }
}
