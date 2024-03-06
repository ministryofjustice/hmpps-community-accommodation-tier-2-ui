import { itShouldHavePreviousValue, itShouldHaveNextValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import NonStandardLicenceConditions, { NonStandardLicenceConditionsBody } from './nonStandardLicenceConditions'

describe('NonStandardLicenceConditions', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new NonStandardLicenceConditions({}, application)

      expect(page.title).toEqual('Does Roger Smith have any non-standard licence conditions?')
    })
  })

  itShouldHavePreviousValue(new NonStandardLicenceConditions({}, application), 'cpp-details')
  itShouldHaveNextValue(new NonStandardLicenceConditions({}, application), '')

  describe('items', () => {
    it('returns the radio with the expected label text', () => {
      const page = new NonStandardLicenceConditions(
        {
          nonStandardLicenceConditions: 'no',
        },
        application,
      )

      expect(page.items('some html')).toEqual([
        {
          value: 'yes',
          text: 'Yes',
          checked: false,
          conditional: { html: 'some html' },
        },
        {
          value: 'no',
          text: 'No',
          checked: true,
        },
        {
          divider: 'or',
        },
        {
          value: 'dontKnow',
          text: `I don't know`,
          checked: false,
        },
      ])
    })
  })

  describe('errors', () => {
    describe('when they have not provided any answer', () => {
      it('returns an error', () => {
        const page = new NonStandardLicenceConditions({}, application)
        expect(page.errors()).toEqual({
          nonStandardLicenceConditions: "Choose either Yes, No or I don't know",
        })
      })
    })
    describe('when they have not provided detail', () => {
      it('returns an error', () => {
        const page = new NonStandardLicenceConditions({ nonStandardLicenceConditions: 'yes' }, application)
        expect(page.errors()).toEqual({
          nonStandardLicenceConditionsDetail: 'Describe their non-standard licence conditions',
        })
      })
    })
  })

  describe('onSave', () => {
    it('removes non-standard license conditions data when the question is not set to "yes"', () => {
      const body: NonStandardLicenceConditionsBody = {
        nonStandardLicenceConditions: 'dontKnow',
        nonStandardLicenceConditionsDetail: 'Non-standard license condition detail',
      }

      const page = new NonStandardLicenceConditions(body, application)

      page.onSave()

      expect(page.body).toEqual({
        nonStandardLicenceConditions: 'dontKnow',
      })
    })
  })
})
