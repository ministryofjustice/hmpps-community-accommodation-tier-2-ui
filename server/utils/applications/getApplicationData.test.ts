import { applicationFactory } from '../../testutils/factories'
import applicationDataJson from '../../../integration_tests/fixtures/applicationData.json'
import { getApplicationSubmissionData, getApplicationUpdateData } from './getApplicationData'

describe('getApplicationUpdateData', () => {
  it('returns the application data', () => {
    const mockApplication = applicationFactory.build()
    expect(getApplicationUpdateData(mockApplication)).toEqual({
      type: 'CAS2',
      data: mockApplication.data,
    })
  })
})

describe('getApplicationSubmissionData', () => {
  it('returns the submission data', () => {
    const mockApplication = applicationFactory.build({ data: applicationDataJson })

    expect(getApplicationSubmissionData(mockApplication)).toEqual({
      applicationId: mockApplication.id,
      translatedDocument: mockApplication.document,
      preferredAreas: 'London | Birmingham',
      hdcEligibilityDate: '2026-02-22',
      conditionalReleaseDate: '2026-03-28',
      telephoneNumber: '1234567',
    })
  })
})
