import type {
  OASysRiskOfSeriousHarm,
  OASysRiskToSelf,
  OASysSections,
  Person,
  RoshRisksEnvelope,
} from '@approved-premises/api'
import type { PersonClient, RestClientBuilder } from '../data'

export default class PersonService {
  constructor(private readonly personClientFactory: RestClientBuilder<PersonClient>) {}

  async findByCrn(token: string, crn: string): Promise<Person> {
    const personClient = this.personClientFactory(token)

    const person = await personClient.search(crn)
    return person
  }

  async getOasysSections(token: string, crn: string): Promise<OASysSections> {
    const personClient = this.personClientFactory(token)

    const oasysSections = await personClient.oasysSections(crn)
    return oasysSections
  }

  async getOasysRiskToSelf(token: string, crn: string): Promise<OASysRiskToSelf> {
    const personClient = this.personClientFactory(token)

    const riskToSelf = await personClient.oasysRiskToSelf(crn)
    return riskToSelf
  }

  async getOasysRosh(token: string, crn: string): Promise<OASysRiskOfSeriousHarm> {
    const personClient = this.personClientFactory(token)

    const rosh = await personClient.oasysRosh(crn)
    return rosh
  }

  async getRoshRisks(token: string, crn: string): Promise<RoshRisksEnvelope> {
    const personClient = this.personClientFactory(token)

    const risks = await personClient.risks(crn)

    return risks.roshRisks
  }
}
