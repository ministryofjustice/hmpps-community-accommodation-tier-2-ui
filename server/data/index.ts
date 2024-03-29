/* eslint-disable import/first */
/*
 * Do appinsights first as it does some magic instrumentation work, i.e. it affects other 'require's
 * In particular, applicationinsights automatically collects bunyan logs
 */
/* istanbul ignore file */

import { initialiseAppInsights, buildAppInsightsClient } from '../utils/azureAppInsights'
import PersonClient from './personClient'
import ApplicationClient from './applicationClient'
import AssessmentClient from './assessmentClient'
import SubmittedApplicationClient from './submittedApplicationClient'
import ReferenceDataClient from './referenceDataClient'

initialiseAppInsights()
buildAppInsightsClient()

import HmppsAuthClient from './hmppsAuthClient'
import { createRedisClient } from './redisClient'
import TokenStore from './tokenStore'
import ReportClient from './reportClient'

type RestClientBuilder<T> = (token: string) => T

export const dataAccess = () => ({
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
  HmppsAuthClient,
  PersonClient,
  RestClientBuilder,
  ApplicationClient,
  AssessmentClient,
  SubmittedApplicationClient,
  ReferenceDataClient,
}
