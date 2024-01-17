import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import SupportWorkerPreference, { SupportWorkerPreferenceBody } from './supportWorkerPreference'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'

describe('SupportWorkerPreference', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Sue Smith' }) })

  const body: SupportWorkerPreferenceBody = {
    hasSupportWorkerPreference: 'yes',
    supportWorkerPreference: 'female',
  }

  it('sets the question as the page title', () => {
    const page = new SupportWorkerPreference(body, application)

    expect(page.title).toEqual('Does Sue Smith have a gender preference for their support worker?')
  })

  it('sets the body', () => {
    const page = new SupportWorkerPreference(body, application)

    expect(page.body).toEqual(body)
  })

  describe('errors', () => {
    it('returns an error if hasSupportWorkerPreference is not set', () => {
      const page = new SupportWorkerPreference({ hasSupportWorkerPreference: null }, application)

      expect(page.errors()).toEqual({
        hasSupportWorkerPreference: `Choose either Yes, No or I don't know`,
      })
    })

    describe('when hasSupportWorkerPreference is yes', () => {
      it('returns an error if supportWorkerPreference is not set', () => {
        const page = new SupportWorkerPreference({ ...body, supportWorkerPreference: null }, application)

        expect(page.errors()).toEqual({
          supportWorkerPreference: 'Choose either Male or Female',
        })
      })
    })
  })

  itShouldHaveNextValue(new SupportWorkerPreference(body, application), '')
  itShouldHavePreviousValue(new SupportWorkerPreference(body, application), 'pregnancy-information')

  describe('onSave', () => {
    it('removes support worker data if question is not set to "yes"', () => {
      const pageBody: SupportWorkerPreferenceBody = {
        hasSupportWorkerPreference: 'dontKnow',
        supportWorkerPreference: 'female',
      }

      const page = new SupportWorkerPreference(pageBody, application)

      page.onSave()

      expect(page.body).toEqual({
        hasSupportWorkerPreference: 'dontKnow',
      })
    })
  })
})
