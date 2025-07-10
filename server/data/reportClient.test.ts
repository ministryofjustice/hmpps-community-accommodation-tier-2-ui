import { Response } from 'express'
import { createMock } from '@golevelup/ts-jest'

import ReportClient from './reportClient'
import paths from '../paths/api'

import describeClient from '../testutils/describeClient'

describeClient('ReportClient', provider => {
  let client: ReportClient

  const token = 'token-1'

  beforeEach(() => {
    client = new ReportClient(token)
  })

  describe('getReport', () => {
    it('should pipe the requested report from the API', async () => {
      const response = createMock<Response>({})

      await provider.addInteraction({
        state: 'Server is healthy',
        uponReceiving: 'A request to get an application report',
        withRequest: {
          method: 'GET',
          path: paths.reports.show({ name: 'submitted-applications' }),
          query: {},
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        willRespondWith: {
          status: 200,
        },
      })

      await client.getReport('submitted-applications', response)

      expect(response.set).toHaveBeenCalledWith(
        'Content-Disposition',
        `attachment; filename="cas2-submitted-applications-report.xlsx"`,
      )
    })
  })
})
