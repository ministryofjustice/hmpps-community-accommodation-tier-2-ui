import type { Response } from 'express'
import type { PersonRisksUI } from '@approved-premises/ui'
import type {
  ActiveOffence,
  Adjudication,
  OASysSection,
  OASysSections,
  Person,
  PersonAcctAlert,
  PrisonCaseNote,
} from '@approved-premises/api'
import type { PersonClient, RestClientBuilder } from '../data'
import { mapApiPersonRisksForUi } from '../utils/utils'

export default class PersonService {
  constructor(private readonly personClientFactory: RestClientBuilder<PersonClient>) {}

  async getOasysSections(token: string, crn: string, selectedSections: Array<number> = []): Promise<OASysSections> {
    const personClient = this.personClientFactory(token)

    const oasysSections = await personClient.oasysSections(crn, selectedSections)

    return oasysSections
  }

  async getOasysSelections(token: string, crn: string): Promise<Array<OASysSection>> {
    const personClient = this.personClientFactory(token)

    const oasysSections = await personClient.oasysSelections(crn)

    return oasysSections
  }

  async getPersonRisks(token: string, crn: string): Promise<PersonRisksUI> {
    const personClient = this.personClientFactory(token)

    const risks = await personClient.risks(crn)

    return mapApiPersonRisksForUi(risks)
  }

  // async getPrisonCaseNotes(token: string, crn: string): Promise<Array<PrisonCaseNote>> {
  //   const personClient = this.personClientFactory(token)

  //   const prisonCaseNotes = await personClient.prisonCaseNotes(crn)

  //   return prisonCaseNotes
  // }

  async findByCrn(token: string, crn: string): Promise<Person> {
    const personClient = this.personClientFactory(token)

    const person = await personClient.search(crn)
    return person
  }
}
