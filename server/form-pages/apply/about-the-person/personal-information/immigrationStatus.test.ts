import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import ImmigrationStatus, { ImmigrationStatusBody } from './immigrationStatus'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'

describe('ImmigrationStatus', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Sue Smith' }) })

  const body: ImmigrationStatusBody = {
    immigrationStatus: 'British',
  }

  it('sets the question as the page title', () => {
    const page = new ImmigrationStatus(body, application)

    expect(page.title).toEqual("What is Sue Smith's immigration status?")
  })

  it('sets the body', () => {
    const page = new ImmigrationStatus(body, application)

    expect(page.body).toEqual(body)
  })

  describe('errors', () => {
    it('returns an error if immigrationStatus is not selected', () => {
      const page = new ImmigrationStatus({ immigrationStatus: 'choose' }, application)

      expect(page.errors()).toEqual({
        immigrationStatus: 'Select their immigration status',
      })
    })
  })

  itShouldHaveNextValue(new ImmigrationStatus(body, application), '')
  itShouldHavePreviousValue(new ImmigrationStatus(body, application), 'working-mobile-phone')
})
