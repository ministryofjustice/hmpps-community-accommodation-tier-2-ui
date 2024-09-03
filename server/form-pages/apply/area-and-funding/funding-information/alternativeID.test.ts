import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { applicationFactory } from '../../../../testutils/factories/index'
import AlternativeIdentification, { AlternativeIdentificationBody } from './alternativeID'

describe('AlternativeIdentification', () => {
  const application = applicationFactory.build({})

  itShouldHaveNextValue(new AlternativeIdentification({}, application), 'national-insurance')
  itShouldHavePreviousValue(new AlternativeIdentification({}, application), 'identification')

  describe('errors', () => {
    it('returns error if no document is selected', () => {
      const page = new AlternativeIdentification({}, application)

      expect(page.errors()).toEqual({
        alternativeIDDocuments: "Select an ID document or 'Other type of identification'",
      })
    })

    it('returns an error if other is selected but no other document is entered', () => {
      const page = new AlternativeIdentification({ alternativeIDDocuments: ['other'] }, application)

      expect(page.errors()).toEqual({ other: 'Enter the other type of ID' })
    })
  })

  describe('items', () => {
    it('returns items as expected', () => {
      const page = new AlternativeIdentification({}, application)

      const conditional = 'some html'

      const expected = [
        { divider: 'Work and employment' },
        { checked: false, text: 'Employer letter/contract of employment', value: 'contract' },
        { checked: false, text: 'Trade union membership card', value: 'tradeUnion' },
        { checked: false, text: 'Invoices (self-employed)', value: 'invoice' },
        { checked: false, text: 'HMRC correspondence', value: 'hmrc' },
        { divider: 'Citizenship and nationality' },
        { checked: false, text: 'CitizenCard', value: 'citizenCard' },
        { checked: false, text: 'Foreign birth certificate', value: 'foreignBirthCertificate' },
        {
          checked: false,
          text: 'British citizen registration/naturalisation certificate',
          value: 'citizenCertificate',
        },
        { checked: false, text: 'Permanent residence card', value: 'residenceCard' },
        { checked: false, text: 'Residence permit', value: 'residencePermit' },
        { checked: false, text: 'Biometric Residence Permit', value: 'biometricResidencePermit' },
        { checked: false, text: 'Local authority rent card', value: 'laRentCard' },
        { divider: 'Marriage and civil partnership' },
        { checked: false, text: 'Original marriage/civil partnership certificate', value: 'marriageCertificate' },
        { checked: false, text: 'Divorce or annulment papers', value: 'divorcePapers' },
        { checked: false, text: 'Dissolution of marriage/civil partnership papers', value: 'dissolutionPapers' },
        { divider: 'Financial' },
        { checked: false, text: 'Building society passbook', value: 'buildingSociety' },
        { checked: false, text: 'Council tax documents', value: 'councilTax' },
        { checked: false, text: 'Life assurance or insurance policies', value: 'insurance' },
        { checked: false, text: 'Personal cheque book', value: 'chequeBook' },
        { checked: false, text: 'Mortgage repayment policies', value: 'mortgage' },
        { checked: false, text: 'Saving account book', value: 'savingAccount' },
        { divider: 'Young people and students' },
        { checked: false, text: 'Student ID card', value: 'studentID' },
        { checked: false, text: 'Educational institution letter (student)', value: 'educationalInstitution' },
        { checked: false, text: 'Young Scot card', value: 'youngScot' },
        { divider: 'Other' },
        { checked: false, text: 'Deed poll certificate', value: 'deedPoll' },
        { checked: false, text: 'Vehicle registration/motor insurance documents', value: 'vehicleRegistration' },
        { checked: false, text: 'NHS medical card', value: 'nhsCard' },
        { checked: false, text: 'Other type of identification', value: 'other', conditional: { html: conditional } },
        { divider: 'or' },
        { checked: false, text: 'No ID available', value: 'none' },
      ]

      expect(page.items(conditional)).toEqual(expected)
    })
  })

  describe('onSave', () => {
    it('removes "other" alternative ID data if "other" is not selected', () => {
      const body: Partial<AlternativeIdentificationBody> = {
        alternativeIDDocuments: ['citizenCard', 'insurance'],
        other: 'Other ID document',
      }

      const page = new AlternativeIdentification(body, application)

      page.onSave()

      expect(page.body).toEqual({
        alternativeIDDocuments: ['citizenCard', 'insurance'],
      })
    })

    it('does not remove "other" alternative ID data if "other" is selected', () => {
      const body: Partial<AlternativeIdentificationBody> = {
        alternativeIDDocuments: ['citizenCard', 'other'],
        other: 'Other ID document',
      }

      const page = new AlternativeIdentification(body, application)

      page.onSave()

      expect(page.body).toEqual({
        alternativeIDDocuments: ['citizenCard', 'other'],
        other: 'Other ID document',
      })
    })
  })
})
