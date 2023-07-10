import { Cas2Application as Application } from '@approved-premises/api'


import {
  retrieveOptionalQuestionResponseFromApplicationOrAssessment,
  retrieveQuestionResponseFromFormArtifact,
} from '../retrieveQuestionResponseFromFormArtifact'
import { FormArtifact } from '../../@types/ui'

// type FirstClassFields<T> = T extends UpdateCas2Application
//   ? Omit<UpdateCas2Application, 'data'>
//   : T extends SubmitCas2Application
//   ? Omit<SubmitCas2Application, 'translatedDocument'>
//   : never

type QuestionResponseFunction = (formArtifact: FormArtifact, Page: unknown, question?: string) => unknown

// export const getApplicationUpdateData = (application: Application): UpdateCas2Application => {
//   return {
//     data: application.data,
//     isInapplicable: isInapplicable(application),
//     ...getUpdateFirstClassFields(application),
//   }
// }

// export const getApplicationSubmissionData = (application: Application): SubmitCas2Application => {
//   return {
//     translatedDocument: application.document,
//     ...getSubmitFirstClassFields(application),
//   }
// }

// const firstClassFields = <T>(
//   application: Application,
//   retrieveQuestionResponse: QuestionResponseFunction,
// ): FirstClassFields<T> => {
//   const apType = retrieveQuestionResponse(application, SelectApType, 'type') as ApType
//   const targetLocation = retrieveQuestionResponse(application, DescribeLocationFactors, 'postcodeArea')
//   const releaseType = getReleaseType(application, retrieveQuestionResponse)
//   const arrivalDate = arrivalDateFromApplication(application)
//   const isEmergencyApplication = noticeTypeFromApplication(application) === 'emergency'

//   return {
//     isWomensApplication: false,
//     isPipeApplication: isPipeApplication(apType),
//     isEsapApplication: isEsapApplication(apType),
//     targetLocation,
//     releaseType,
//     arrivalDate,
//     isEmergencyApplication,
//   } as FirstClassFields<T>
// }

// const getUpdateFirstClassFields = (application: Application): FirstClassFields<UpdateCas2Application> => {
//   return firstClassFields(application, retrieveOptionalQuestionResponseFromApplicationOrAssessment)
// }

// const getSubmitFirstClassFields = (application: Application): FirstClassFields<SubmitCas2Application> => {
//   return firstClassFields(application, retrieveQuestionResponseFromFormArtifact)
// }

