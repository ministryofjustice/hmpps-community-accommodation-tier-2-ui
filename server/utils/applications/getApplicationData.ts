import {
  Cas2HdcApplication as Application,
  Cas2HdcSubmitApplication,
  Cas2HdcUpdateApplication,
} from '@approved-premises/api'

import {
  preferredAreasFromAppData,
  hdcEligibilityDateFromAppData,
  conditionalReleaseDateFromAppData,
  telephoneNumberFromAppData,
} from './managementInfoFromAppData'

export const getApplicationUpdateData = (application: Application): Cas2HdcUpdateApplication => {
  return {
    type: 'CAS2',
    data: application.data,
  }
}

export const getApplicationSubmissionData = (application: Application): Cas2HdcSubmitApplication => {
  return {
    translatedDocument: application.document,
    applicationId: application.id,
    preferredAreas: preferredAreasFromAppData(application),
    hdcEligibilityDate: hdcEligibilityDateFromAppData(application),
    conditionalReleaseDate: conditionalReleaseDateFromAppData(application),
    telephoneNumber: telephoneNumberFromAppData(application),
  }
}
