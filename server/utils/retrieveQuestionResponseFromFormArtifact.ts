import {
  ApprovedPremisesApplication as Application,
  ApprovedPremisesAssessment as Assessment,
} from '@approved-premises/api'
import { TasklistPageInterface } from '../form-pages/tasklistPage'
import { getPageName, pageDataFromApplication } from '../form-pages/utils'
import { SessionDataError } from './errors'
import { camelCase } from './utils'
import { FormArtifact } from '../@types/ui'

/**
 * Retrieves response for a given question from the application object or throws an error if it does not exist.
 * @param formArtifact the application or assessment to fetch the response from.
 * @param Page the page to retrieve the response from.
 * @param {string} question the question that we need the response for. Defaults to the camel-cased name of the `Page`.
 * @returns the response for the given Page/question.
 */
export const retrieveQuestionResponseFromFormArtifact = (
  formArtifact: FormArtifact,
  Page: unknown,
  question?: string,
) => {
  const pageData = pageDataFromApplication(Page as TasklistPageInterface, formArtifact)
  const pageName = getPageName(Page)
  const q = question || camelCase(pageName)

  if (!pageData) {
    throw new SessionDataError(`Question ${q} was not found in the session`)
  }

  const response = pageData[q]

  if (!response) {
    throw new SessionDataError(`Question ${q} was not found in the session`)
  }

  return response
}

/**
 * Retrieves response for a given question from the application object or returns undefined if it does not exist.
 * @param applicationOrAssessment the application or assessment to fetch the response from.
 * @param Page the page to retrieve the response from.
 * @param {string} question the question that we need the response for. Defaults to the camel-cased name of the `Page`.
 * @returns the response for the given page/question.
 */
export const retrieveOptionalQuestionResponseFromApplicationOrAssessment = (
  applicationOrAssessment: Application | Assessment,
  Page: TasklistPageInterface,
  question?: string,
) => {
  let response

  try {
    response = retrieveQuestionResponseFromFormArtifact(applicationOrAssessment, Page, question)
  } catch (e) {
    response = undefined
  }

  return response
}
