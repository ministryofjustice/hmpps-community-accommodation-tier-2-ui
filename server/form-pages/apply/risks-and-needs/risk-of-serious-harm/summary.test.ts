import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import Summary, { SummaryData } from './summary'

describe('Summary', () => {
  const roshSummaryData = {
    status: 'retrieved' as const,
    oasysImportedDate: new Date('2023-09-15'),
    oasysStartedDate: '2023-01-30',
    oasysCompletedDate: '2023-01-31',
    value: {
      overallRisk: 'a risk',
      riskToChildren: 'another risk',
      riskToPublic: 'a third risk',
      riskToKnownAdult: 'a fourth risk',
      riskToStaff: 'a fifth risk',
    },
  } as SummaryData

  const person = personFactory.build({ name: 'Roger Smith' })

  const applicationWithSummaryData = applicationFactory.build({
    person,
    data: { 'risk-of-serious-harm': { 'summary-data': roshSummaryData } },
  })

  const applicationWithoutSummaryData = applicationFactory.build({
    person,
  })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new Summary({}, applicationWithSummaryData)

      expect(page.title).toEqual(`Risk of serious harm (RoSH) summary for Roger Smith`)
    })
  })

  describe('import date', () => {
    it('sets importDate to null where application contains no OASys import date', () => {
      const page = new Summary({}, applicationWithSummaryData)

      expect(page.importDate).toEqual(null)
    })
  })

  describe('risks', () => {
    describe('if the risks have not been found', () => {
      it('sets the risks to undefined', () => {
        const roshSummaryDataWithoutValue = {
          status: 'not_found' as const,
          oasysImportedDate: new Date('2023-09-15'),
        } as SummaryData

        const page = new Summary(
          {},
          {
            ...applicationWithSummaryData,
            data: { 'risk-of-serious-harm': { 'summary-data': roshSummaryDataWithoutValue } },
          },
        )

        expect(page.risks).toBe(undefined)
      })
    })

    describe('if the risks have been found but there are no values', () => {
      it('sets the risks to undefined', () => {
        const roshSummaryDataWithoutValue = {
          status: 'retrieved' as const,
          oasysImportedDate: new Date('2023-09-15'),
        } as SummaryData

        const page = new Summary(
          {},
          {
            ...applicationWithSummaryData,
            data: { 'risk-of-serious-harm': { 'summary-data': roshSummaryDataWithoutValue } },
          },
        )

        expect(page.risks.value).toBe(undefined)
      })
    })

    describe('if risk values exists', () => {
      it('sets the risks', () => {
        const page = new Summary({}, applicationWithSummaryData)
        expect(page.risks).toEqual(roshSummaryData)
      })
    })

    describe('if there is no summary data', () => {
      it('sets the risks to undefined', () => {
        const page = new Summary({}, applicationWithoutSummaryData)

        expect(page.risks).toBe(undefined)
      })
    })
  })

  itShouldHaveNextValue(new Summary({}, applicationWithSummaryData), 'risk-to-others')
  itShouldHavePreviousValue(new Summary({}, applicationWithSummaryData), 'taskList')

  describe('response', () => {
    const body = {
      additionalComments: 'some additional comments',
    }

    const expectedResponse = {
      'OASys created': '30 January 2023',
      'OASys completed': '31 January 2023',
      'OASys imported': '15 September 2023',
      'Overall risk rating': roshSummaryData.value.overallRisk,
      'Risk to children': roshSummaryData.value.riskToChildren,
      'Risk to known adult': roshSummaryData.value.riskToKnownAdult,
      'Risk to public': roshSummaryData.value.riskToPublic,
      'Risk to staff': roshSummaryData.value.riskToStaff,
    }
    it('returns page body if no additional comments have been added', () => {
      const page = new Summary({}, applicationWithSummaryData)

      expect(page.response()).toEqual(expectedResponse)
    })

    it('returns page body and additional comments if a comment is added', () => {
      const page = new Summary(body, applicationWithSummaryData)

      expect(page.response()).toEqual({
        ...expectedResponse,
        'Additional comments (optional)': 'some additional comments',
      })
    })

    it('returns nothing if there is no answer data', () => {
      const page = new Summary({}, applicationWithoutSummaryData)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new Summary({}, applicationWithSummaryData)

      expect(page.errors()).toEqual({})
    })
  })
})
