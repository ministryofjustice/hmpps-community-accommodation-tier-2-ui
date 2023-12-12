import { itShouldHavePreviousValue } from '../../../shared-examples'
import ImmigrationStatus, { ImmigrationStatusBody } from './immigrationStatus'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import { isPersonMale } from '../../../../utils/personUtils'

jest.mock('../../../../utils/personUtils')

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

  describe('next', () => {
    beforeEach(() => {
      ;(isPersonMale as jest.Mock).mockReset()
    })

    describe('when the applicant is male', () => {
      it('should not return a page name', () => {
        ;(isPersonMale as jest.Mock).mockImplementation(() => true)

        const page = new ImmigrationStatus(body, application)

        expect(page.next()).toEqual('')
      })
    })

    describe('when the applicant is not male', () => {
      it('should not return pregnancy information page name', () => {
        ;(isPersonMale as jest.Mock).mockImplementation(() => false)

        const page = new ImmigrationStatus(body, application)

        expect(page.next()).toEqual('pregnancy-information')
      })
    })
  })

  itShouldHavePreviousValue(new ImmigrationStatus(body, application), 'working-mobile-phone')
})
