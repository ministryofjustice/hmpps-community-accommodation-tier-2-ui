import type { FullPerson, OASysRiskOfSeriousHarm, OASysRiskToSelf, PersonRisks } from '@approved-premises/api'

import RestClient from './restClient'
import config, { ApiConfig } from '../config'
import paths from '../paths/api'
import { createQueryString } from '../utils/utils'

export default class PersonClient {
  restClient: RestClient

  constructor(token: string) {
    this.restClient = new RestClient('personClient', config.apis.approvedPremises as ApiConfig, token)
  }

  async oasysRiskToSelf(crn: string): Promise<OASysRiskToSelf> {
    return this.restClient.get<OASysRiskToSelf>({
      path: paths.people.oasys.riskToSelf({ crn }),
    })
  }

  async oasysRosh(crn: string): Promise<OASysRiskOfSeriousHarm> {
    return this.restClient.get<OASysRiskOfSeriousHarm>({
      path: paths.people.oasys.rosh({ crn }),
    })
  }

  async search(nomsNumber: string): Promise<FullPerson> {
    return this.restClient.get<FullPerson>({
      path: paths.people.search({}),
      query: createQueryString({ nomsNumber }),
    })
  }

  async risks(crn: string): Promise<PersonRisks> {
    return this.restClient.get<PersonRisks>({
      path: paths.people.risks.show({ crn }),
    })
  }
}
