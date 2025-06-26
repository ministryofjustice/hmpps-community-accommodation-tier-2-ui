import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import CurrentAndPreviousRisk from './currentAndPreviousRisk'

describe('CurrentAndPreviousRisk', () => {
  const person = personFactory.build({ name: 'Roger Smith' })
  const application = applicationFactory.build({ person })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new CurrentAndPreviousRisk({}, application)

      expect(page.title).toEqual("Roger Smith's current and previous risks")
    })
  })

  describe('import date', () => {
    it('sets importDate to false where application contains no OASys import date', () => {
      const page = new CurrentAndPreviousRisk({}, application)

      expect(page.importDate).toEqual(null)
    })
  })

  describe('Questions', () => {
    const page = new CurrentAndPreviousRisk({}, application)

    describe('currentAndPreviousRiskDetail', () => {
      it('has a question', () => {
        expect(page.questions.currentAndPreviousRiskDetail.question).toBeDefined()
      })
    })
  })

  itShouldHaveNextValue(new CurrentAndPreviousRisk({}, application), 'acct')
  itShouldHavePreviousValue(new CurrentAndPreviousRisk({}, application), 'vulnerability')

  describe('errors', () => {
    it('returns an error when the confirmation is blank', () => {
      const page = new CurrentAndPreviousRisk({}, application)
      expect(page.errors()).toEqual({
        currentAndPreviousRiskDetail:
          "Describe Roger Smith's current and previous issues and needs related to self harm and suicide",
        confirmation: 'Confirm that the information is relevant and up to date',
      })
    })
  })

  describe('items', () => {
    it('returns the checkbox as expected', () => {
      const page = new CurrentAndPreviousRisk({}, application)

      expect(page.items()).toEqual([
        { value: 'confirmed', text: 'I confirm this information is relevant and up to date.', checked: false },
      ])
    })
  })

  describe('response', () => {
    const body = { currentAndPreviousRiskDetail: 'some detail', confirmation: 'confirmed' }

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

      const page = new CurrentAndPreviousRisk(body, applicationWithOasysDates)

      expect(page.response()).toEqual({
        'OASys created': '1 January 2024',
        'OASys completed': '2 January 2024',
        'OASys imported': '5 January 2024',
        "Describe Roger Smith's current and previous issues and needs related to self harm and suicide": 'some detail',
        'I confirm this information is relevant and up to date.': 'Confirmed',
      })
    })

    it('returns without OASys dates where they are not present in the application data', () => {
      const page = new CurrentAndPreviousRisk(body, application)

      expect(page.response()).toEqual({
        "Describe Roger Smith's current and previous issues and needs related to self harm and suicide": 'some detail',
        'I confirm this information is relevant and up to date.': 'Confirmed',
      })
    })
  })

  describe('populateFromLegacyRiskSections', () => {
    it('populates currentAndPreviousRiskDetail with both current and historical risk if blank', () => {
      const applicationWithLegacy = applicationFactory.build({
        person,
        data: {
          'risk-to-self': {
            'current-risk': { currentRiskDetail: 'Current risk detail' },
            'historical-risk': { historicalRiskDetail: 'Historical risk detail' },
          },
        },
      })

      const page = new CurrentAndPreviousRisk({}, applicationWithLegacy)
      page.populateFromLegacyRiskSections()

      expect(page.body.currentAndPreviousRiskDetail).toEqual('Current risk detail\n\nHistorical risk detail')
    })

    it('does not overwrite currentAndPreviousRiskDetail if already populated', () => {
      const applicationWithLegacy = applicationFactory.build({
        person,
        data: {
          'risk-to-self': {
            'current-risk': { currentRiskDetail: 'Current risk detail' },
            'historical-risk': { historicalRiskDetail: 'Historical risk detail' },
          },
        },
      })

      const page = new CurrentAndPreviousRisk({ currentAndPreviousRiskDetail: 'Some detail' }, applicationWithLegacy)
      page.populateFromLegacyRiskSections()

      expect(page.body.currentAndPreviousRiskDetail).toEqual('Some detail')
    })

    it('leaves currentAndPreviousRiskDetail blank if neither current-risk nor historical-risk exist', () => {
      const applicationWithoutLegacy = applicationFactory.build({
        person,
        data: {
          'risk-to-self': {},
        },
      })

      const page = new CurrentAndPreviousRisk({}, applicationWithoutLegacy)
      page.populateFromLegacyRiskSections()

      expect(page.body.currentAndPreviousRiskDetail).toEqual('')
    })
  })
})
