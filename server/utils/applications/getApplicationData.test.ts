import { applicationFactory } from '../../testutils/factories'
import { getApplicationUpdateData } from './getApplicationData'

describe('getApplicationUpdateData', () => {
  it('returns the application data', () => {
    const mockApplication = applicationFactory.build()
    expect(getApplicationUpdateData(mockApplication)).toEqual({
      type: 'CAS2',
      data: mockApplication.data,
    })
  })
})
