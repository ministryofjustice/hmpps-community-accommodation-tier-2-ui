import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import ConfirmConsent from './confirmConsent'
import { applicationFactory, personFactory } from '../../../../testutils/factories/index'
import { getQuestions } from '../../../utils/questions'

describe('ConfirmConsent', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  const questions = getQuestions('Roger Smith')

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new ConfirmConsent({}, application)

      expect(page.title).toEqual("Confirm Roger Smith's consent to apply for Short-Term Accommodation (CAS-2)")
    })
  })

  itShouldHaveNextValue(new ConfirmConsent({}, application), '')
  itShouldHavePreviousValue(new ConfirmConsent({}, application), 'taskList')

  describe('items', () => {
    it('returns the radio with the expected label text', () => {
      const page = new ConfirmConsent({ hasGivenConsent: 'no' }, application)

      expect(page.items('dateHtml', 'refusalDetailHtml')).toEqual([
        {
          value: 'yes',
          text: questions['confirm-consent']['confirm-consent'].hasGivenConsent.answers.yes,
          conditional: { html: 'dateHtml' },
          checked: false,
        },
        {
          value: 'no',
          text: questions['confirm-consent']['confirm-consent'].hasGivenConsent.answers.no,
          conditional: { html: 'refusalDetailHtml' },
          checked: true,
        },
      ])
    })
  })

  describe('errors', () => {
    it('should return errors when yes/no questions are blank', () => {
      const page = new ConfirmConsent({}, application)

      expect(page.errors()).toEqual({
        hasGivenConsent: 'Confirm whether the applicant gave their consent',
      })
    })

    it('should return an error when yes is selected but no date is provided', () => {
      const page = new ConfirmConsent({ hasGivenConsent: 'yes' }, application)

      expect(page.errors()).toEqual({
        consentDate: 'Enter date applicant gave their consent',
      })
    })

    it('should return an error when no is selected but no detail is provided', () => {
      const page = new ConfirmConsent({ hasGivenConsent: 'no' }, application)

      expect(page.errors()).toEqual({
        consentRefusalDetail: 'Enter the applicant’s reason for refusing consent',
      })
    })
  })

  describe('response', () => {
    it('should return the consent date if consent has been given', () => {
      const page = new ConfirmConsent({ hasGivenConsent: 'yes', consentDate: '2023-11-01' }, application)

      expect(page.response()).toEqual({
        'Has Roger Smith given their consent to apply for CAS-2?': 'Yes, Roger Smith has given their consent',
        'When did they give consent?': '1 November 2023',
      })
    })
  })

  it('should return the consent refusal detail if consent has been refused', () => {
    const page = new ConfirmConsent({ hasGivenConsent: 'no', consentRefusalDetail: 'some reasons' }, application)

    expect(page.response()).toEqual({
      'Has Roger Smith given their consent to apply for CAS-2?': 'No, Roger Smith has not given their consent',
      'Why was consent refused?': 'some reasons',
    })
  })
})
