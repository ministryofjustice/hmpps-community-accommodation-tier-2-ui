import { Cas2Application as Application, SubmitCas2Application, UpdateApplication } from '@approved-premises/api'

export const getApplicationUpdateData = (application: Application): UpdateApplication => {
  return {
    type: 'CAS2',
    data: application.data,
  }
}

export const getApplicationSubmissionData = (application: Application): SubmitCas2Application => {
  return {
    translatedDocument: application.document,
    applicationId: application.id,
  }
}
