import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import CurrentRisk from './currentRisk'

describe('CurrentRisk', () => {
  const person = personFactory.build({ name: 'Roger Smith' })
  const application = applicationFactory.build({ person })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new CurrentRisk({}, application)

      expect(page.title).toEqual("Roger Smith's current risks")
    })
  })

  describe('import date', () => {
    it('sets importDate to false where application contains no OASys import date', () => {
      const page = new CurrentRisk({}, application)

      expect(page.importDate).toEqual(null)
    })
  })

  describe('Questions', () => {
    const page = new CurrentRisk({}, application)

    describe('currentRiskDetail', () => {
      it('has a question', () => {
        expect(page.questions.currentRiskDetail.question).toBeDefined()
      })
    })
  })

  itShouldHaveNextValue(new CurrentRisk({}, application), 'historical-risk')
  itShouldHavePreviousValue(new CurrentRisk({}, application), 'vulnerability')

  describe('errors', () => {
    it('returns an error when the confirmation is blank', () => {
      const page = new CurrentRisk({}, application)
      expect(page.errors()).toEqual({
        currentRiskDetail: "Describe Roger Smith's current issues and needs related to self harm and suicide",
        confirmation: 'Confirm that the information is relevant and up to date',
      })
    })
  })

  describe('items', () => {
    it('returns the checkbox as expected', () => {
      const page = new CurrentRisk({}, application)

      expect(page.items()).toEqual([
        { value: 'confirmed', text: 'I confirm this information is relevant and up to date.', checked: false },
      ])
    })
  })

  describe('response', () => {
    const body = { currentRiskDetail: 'some detail', confirmation: 'confirmed' }

    it('returns with OASys dates where they are in the application data', () => {
      const applicationWithOasysDates = applicationFactory.build({
        person,
        data: {
          'risk-to-self': {
            'oasys-import': {
              oasysImportedDate: '2024-01-05',
              oasysStartedDate: '2024-01-01',
              oasysCompletedDate: '2024-01-02',
            },
          },
        },
      })

      const page = new CurrentRisk(body, applicationWithOasysDates)

      expect(page.response()).toEqual({
        'OASys created': '1 January 2024',
        'OASys completed': '2 January 2024',
        'OASys imported': '5 January 2024',
        "Describe Roger Smith's current issues and needs related to self harm and suicide": 'some detail',
        'I confirm this information is relevant and up to date.': 'Confirmed',
      })
    })

    it('returns without OASys dates where they are not present in the application data', () => {
      const page = new CurrentRisk(body, application)

      expect(page.response()).toEqual({
        "Describe Roger Smith's current issues and needs related to self harm and suicide": 'some detail',
        'I confirm this information is relevant and up to date.': 'Confirmed',
      })
    })
  })
})
