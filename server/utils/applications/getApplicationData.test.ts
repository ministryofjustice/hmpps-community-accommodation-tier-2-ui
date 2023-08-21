import { applicationFactory } from '../../testutils/factories'
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
    const mockApplication = applicationFactory.build()
    expect(getApplicationSubmissionData(mockApplication)).toEqual({
      type: 'CAS2',
      translatedDocument: mockApplication.document,
    })
  })
})
