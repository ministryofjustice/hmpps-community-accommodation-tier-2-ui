import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import ConfirmDetails from './confirmDetails'
import { applicationFactory, personFactory } from '../../../../testutils/factories/index'

describe('ConfirmDetails', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  itShouldHaveNextValue(new ConfirmDetails({}, application), 'job-title')
  itShouldHavePreviousValue(new ConfirmDetails({}, application), 'taskList')

  it('writes the user name and email to the referrerDetails property', () => {
    const page = new ConfirmDetails({}, application)

    expect(page.referrerDetails).toEqual({ name: application.createdBy.name, email: application.createdBy.email })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new ConfirmDetails({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
