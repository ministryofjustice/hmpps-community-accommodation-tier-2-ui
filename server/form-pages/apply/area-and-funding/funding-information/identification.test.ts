import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { applicationFactory } from '../../../../testutils/factories/index'
import Identification from './identification'

describe('Identification', () => {
  const application = applicationFactory.build({})

  itShouldHaveNextValue(new Identification({ idDocuments: ['none'] }, application), 'alternative-identification')
  itShouldHaveNextValue(new Identification({ idDocuments: ['travelPass'] }, application), 'national-insurance')

  itShouldHavePreviousValue(new Identification({}, application), 'funding-source')

  describe('errors', () => {
    it('returns error if no document is selected', () => {
      const page = new Identification({}, application)

      expect(page.errors()).toEqual({ idDocuments: "Select an ID document or 'None of these options'" })
    })
  })

  describe('items', () => {
    it('returns items as expected', () => {
      const page = new Identification({}, application)

      const expected = [
        {
          attributes: {
            'data-selector': 'documents',
          },
          checked: false,
          text: 'Passport',
          value: 'passport',
        },
        {
          attributes: {
            'data-selector': 'documents',
          },
          checked: false,
          text: 'Travel pass with photograph',
          value: 'travelPass',
        },
        {
          attributes: {
            'data-selector': 'documents',
          },
          checked: false,
          text: 'Birth certificate',
          value: 'birthCertificate',
        },
        {
          attributes: {
            'data-selector': 'documents',
          },
          checked: false,
          text: 'Bank account or debit card',
          value: 'bankOrDebitCard',
        },
        {
          attributes: {
            'data-selector': 'documents',
          },
          checked: false,
          text: 'Bank, building society or Post Office card account statements',
          value: 'bankStatements',
        },
        {
          attributes: {
            'data-selector': 'documents',
          },
          checked: false,
          text: 'UK photo driving licence',
          hint: { text: 'Can be provisional' },
          value: 'drivingLicence',
        },
        {
          attributes: {
            'data-selector': 'documents',
          },
          checked: false,
          text: 'Recent wage slip',
          hint: { text: 'With payee name and NI number' },
          value: 'wageSlip',
        },
        {
          divider: 'or',
        },
        {
          checked: false,
          text: 'None of these options',
          value: 'none',
        },
      ]
      expect(page.items()).toEqual(expected)
    })
  })
})
