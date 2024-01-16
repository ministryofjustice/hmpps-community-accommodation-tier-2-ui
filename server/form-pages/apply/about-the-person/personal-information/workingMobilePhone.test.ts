import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import WorkingMobilePhone, { WorkingMobilePhoneBody } from './workingMobilePhone'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'

describe('WorkingMobilePhone', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Sue Smith' }) })

  const body: WorkingMobilePhoneBody = {
    hasWorkingMobilePhone: 'yes',
    mobilePhoneNumber: '11111111111',
    isSmartPhone: 'yes',
  }

  it('sets the question as the page title', () => {
    const page = new WorkingMobilePhone(body, application)

    expect(page.title).toEqual('Will Sue Smith have a working mobile phone when they are released?')
  })

  it('sets the body', () => {
    const page = new WorkingMobilePhone(body, application)

    expect(page.body).toEqual(body)
  })

  describe('errors', () => {
    it('returns an error if hasWorkingMobilePhone is not set', () => {
      const page = new WorkingMobilePhone({ hasWorkingMobilePhone: null }, application)

      expect(page.errors()).toEqual({
        hasWorkingMobilePhone: `Choose either Yes, No or I don't know`,
      })
    })

    describe('when hasWorkingMobilePhone is yes', () => {
      it('returns an error if isSmartPhone is not set', () => {
        const page = new WorkingMobilePhone({ ...body, isSmartPhone: null }, application)

        expect(page.errors()).toEqual({
          isSmartPhone: 'Choose either Yes or No',
        })
      })
    })
  })

  itShouldHaveNextValue(new WorkingMobilePhone(body, application), 'immigration-status')
  itShouldHavePreviousValue(new WorkingMobilePhone(body, application), 'taskList')

  describe('onSave', () => {
    it('removes mobile phone data if question is not set to "yes"', () => {
      const pageBody: WorkingMobilePhoneBody = {
        hasWorkingMobilePhone: 'dontKnow',
        mobilePhoneNumber: '07111111111',
        isSmartPhone: 'yes',
      }

      const page = new WorkingMobilePhone(pageBody, application)

      page.onSave()

      expect(page.body).toEqual({
        hasWorkingMobilePhone: 'dontKnow',
      })
    })
  })
})
