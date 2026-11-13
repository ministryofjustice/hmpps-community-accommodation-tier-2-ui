/* istanbul ignore file */

import PersonClient from './personClient'
import ApplicationClient from './applicationClient'
import AssessmentClient from './assessmentClient'
import SubmittedApplicationClient from './submittedApplicationClient'
import ReferenceDataClient from './referenceDataClient'

import HmppsAuthClient from './hmppsAuthClient'
import { createRedisClient } from './redisClient'
import TokenStore from './tokenStore'
import ReportClient from './reportClient'
import applicationInfoSupplier from '../applicationInfo'

const applicationInfo = applicationInfoSupplier()

type RestClientBuilder<T> = (token: string) => T

export const dataAccess = () => ({
  applicationInfo,
  hmppsAuthClient: new HmppsAuthClient(new TokenStore(createRedisClient())),
  personClient: ((token: string) => new PersonClient(token)) as RestClientBuilder<PersonClient>,
  applicationClient: ((token: string) => new ApplicationClient(token)) as RestClientBuilder<ApplicationClient>,
  assessmentClient: ((token: string) => new AssessmentClient(token)) as RestClientBuilder<AssessmentClient>,
  submittedApplicationClient: ((token: string) =>
    new SubmittedApplicationClient(token)) as RestClientBuilder<SubmittedApplicationClient>,
  referenceDataClient: ((token: string) => new ReferenceDataClient(token)) as RestClientBuilder<ReferenceDataClient>,
  reportClient: ((token: string) => new ReportClient(token)) as RestClientBuilder<ReportClient>,
})

export type DataAccess = ReturnType<typeof dataAccess>

export {
  applicationInfo,
  HmppsAuthClient,
  PersonClient,
  RestClientBuilder,
  ApplicationClient,
  AssessmentClient,
  SubmittedApplicationClient,
  ReferenceDataClient,
}
