import type { OASysRiskToSelf, OASysSections, Person } from '@approved-premises/api'

import RestClient from './restClient'
import config, { ApiConfig } from '../config'
import paths from '../paths/api'
import { createQueryString } from '../utils/utils'

export default class PersonClient {
  restClient: RestClient

  constructor(token: string) {
    this.restClient = new RestClient('personClient', config.apis.approvedPremises as ApiConfig, token)
  }

  async oasysSections(crn: string, selectedSections?: Array<number>): Promise<OASysSections> {
    const queryString: string = createQueryString({ 'selected-sections': selectedSections })

    const path = `${paths.people.oasys.sections({ crn })}${queryString ? `?${queryString}` : ''}`

    const response = (await this.restClient.get({ path })) as OASysSections

    return response
  }

  async oasysRiskToSelf(crn: string): Promise<OASysRiskToSelf> {
    const path = paths.people.oasys.riskToSelf({ crn })

    const response = (await this.restClient.get({ path })) as OASysRiskToSelf

    return response
  }

  async search(crn: string): Promise<Person> {
    const query = { crn } as Record<string, string | boolean>

    const path = `${paths.people.search({})}?${createQueryString(query)}`
    const response = await this.restClient.get({
      path,
    })

    return response as Person
  }
}
