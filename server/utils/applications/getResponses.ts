import Apply from '../../form-pages/apply'
import { FormArtifact, PageResponse } from '../../@types/ui'
import { checkResponsesForPagesInTask } from './checkResponsesForPagesInTask'
import { ApplicationOrAssessmentResponse } from './utils'

export const getResponses = (formArtifact: FormArtifact): ApplicationOrAssessmentResponse => {
  const responses = {}

  const formSections = Apply.sections

  formSections.forEach(section => {
    section.tasks.forEach(task => {
      const responsesForTask: Array<PageResponse> = []

      // add answers from each page in the task to list of responses
      checkResponsesForPagesInTask(formArtifact, task, page => responsesForTask.push(page.response()))

      responses[task.id] = responsesForTask
    })
  })

  return responses
}
