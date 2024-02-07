import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'

import { applicationFactory, personFactory, restrictedPersonFactory } from '../../../../testutils/factories'
import CheckYourAnswers from './checkYourAnswers'

describe('CheckYourAnswers', () => {
  let application = applicationFactory.build({})

  const body = {
    checkYourAnswers: 'confirmed',
  }

  describe('body', () => {
    it('should set the body', () => {
      const page = new CheckYourAnswers(body, application)

      expect(page.body).toEqual(body)
    })
  })

  describe('title', () => {
    it('should set the title', () => {
      const page = new CheckYourAnswers(body, application)

      expect(page.title).toEqual('Check your answers before sending your application')
    })
  })

  describe('applicationSummary', () => {
    it('returns data for application summary', () => {
      const person = personFactory.build({ name: 'name', nomsNumber: '123', prisonName: 'prison-name' })
      application = applicationFactory.build({
        person,
        createdBy: { email: 'createdByEmail', name: 'createdByName' },
      })

      const page = new CheckYourAnswers(body, application)

      expect(page.applicationSummary()).toEqual({
        id: application.id,
        name: person.name,
        prisonNumber: person.nomsNumber,
        prisonName: person.prisonName,
        referrerName: application.createdBy.name,
        contactEmail: application.createdBy.email,
        view: 'checkYourAnswers',
      })
    })

    describe('when person type is not FullPerson', () => {
      it('returns data for the application summary', () => {
        const person = restrictedPersonFactory.build({})
        application = applicationFactory.build({
          person,
          createdBy: { email: 'createdByEmail', name: 'createdByName' },
        })

        const page = new CheckYourAnswers(body, application)

        expect(page.applicationSummary()).toEqual({
          id: application.id,
          name: null,
          prisonNumber: null,
          prisonName: null,
          referrerName: application.createdBy.name,
          contactEmail: application.createdBy.email,
          view: 'checkYourAnswers',
        })
      })
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
