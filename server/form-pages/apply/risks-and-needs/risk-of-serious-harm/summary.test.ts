import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import Summary from './summary'

describe('Summary', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new Summary({}, application)

      expect(page.title).toEqual(`Risk of serious harm (RoSH) summary for Roger Smith`)
    })
  })

  describe('import date', () => {
    it('sets importDate to null where application contains no OASys import date', () => {
      const page = new Summary({}, application)

      expect(page.importDate).toEqual(null)
    })
  })

  itShouldHaveNextValue(new Summary({}, application), 'risk-to-others')
  itShouldHavePreviousValue(new Summary({}, application), 'oasys-import')

  describe('response', () => {
    const body = {
      status: 'retrieved' as const,
      overallRisk: 'a risk',
      riskToChildren: 'another risk',
      riskToPublic: 'a third risk',
      riskToKnownAdult: 'a fourth risk',
      riskToStaff: 'a fifth risk',
      lastUpdated: '2023-09-17',
    }
    it('returns page body if no additional comments have been added', () => {
      const page = new Summary(body, application)

      expect(page.response()).toEqual(body)
    })

    it('returns page body and additional comments if a comment is added', () => {
      const additionalBody = {
        ...body,
        additionalComments: 'some comment',
      }
      const page = new Summary(additionalBody, application)

      expect(page.response()).toEqual({ ...body, 'Additional comments (optional)': 'some comment' })
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new Summary({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
