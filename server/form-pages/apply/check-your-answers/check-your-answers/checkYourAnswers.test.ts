import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'

import { applicationFactory } from '../../../../testutils/factories'
import CheckYourAnswers from './checkYourAnswers'

describe('CheckYourAnswers', () => {
  const application = applicationFactory.build({})

  const body = {
    checkYourAnswers: 'confirmed',
  }

  describe('body', () => {
    it('should set the body', () => {
      const page = new CheckYourAnswers(body, application)

      expect(page.body).toEqual(body)
    })
  })

  itShouldHaveNextValue(new CheckYourAnswers(body, application), '')
  itShouldHavePreviousValue(new CheckYourAnswers(body, application), 'dashboard')

  describe('errors', () => {
    it('should return an error when page has not been reviewed', () => {
      const page = new CheckYourAnswers({}, application)

      expect(page.errors()).toEqual({
        checkYourAnswers:
          'You must confirm the information provided is accurate and, where required, it has been verified by all relevant prison departments.',
      })
    })
  })
})
