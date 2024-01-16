import { applicationFactory, personFactory } from '../../../../testutils/factories/index'
import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import PregnancyInformation, { PregnancyInformationBody } from './pregnancyInformation'

describe('PregnancyInformation', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Sue Smith' }) })

  const body: PregnancyInformationBody = {
    isPregnant: 'yes',
    dueDate: '2024-03-27',
    'dueDate-month': '10',
    'dueDate-year': '2023',
    'dueDate-day': '01',
  }

  it('sets the question as the page title', () => {
    const page = new PregnancyInformation(body, application)

    expect(page.title).toEqual('Is Sue Smith pregnant?')
  })

  it('sets the body', () => {
    const page = new PregnancyInformation(body, application)

    expect(page.body).toEqual(body)
  })

  describe('errors', () => {
    it('returns an error if isPregnant is not set', () => {
      const page = new PregnancyInformation({ isPregnant: null }, application)

      expect(page.errors()).toEqual({
        isPregnant: `Choose either Yes, No or I don't know`,
      })
    })

    describe('when isPregnant is yes', () => {
      it('returns an error if dueDate is not set', () => {
        const page = new PregnancyInformation({ ...body, 'dueDate-year': null }, application)

        expect(page.errors()).toEqual({
          dueDate: 'Enter the due date',
        })
      })
    })
  })

  itShouldHaveNextValue(new PregnancyInformation(body, application), 'support-worker-preference')
  itShouldHavePreviousValue(new PregnancyInformation(body, application), 'immigration-status')

  describe('response', () => {
    it('returns the pregnancy information', () => {
      const page = new PregnancyInformation(body, application)
      expect(page.response()).toEqual({
        'Is Sue Smith pregnant?': 'Yes',
        'When is their due date?': '1 October 2023',
      })
    })

    describe('and they are not pregnant', () => {
      const bodyWithoutDueDate: PregnancyInformationBody = {
        isPregnant: 'no',
        dueDate: '',
        'dueDate-month': '',
        'dueDate-year': '',
        'dueDate-day': '',
      }

      it("doesn't return the due date", () => {
        const page = new PregnancyInformation(bodyWithoutDueDate, application)

        expect(page.response()).toEqual({
          'Is Sue Smith pregnant?': 'No',
        })
      })
    })
  })

  describe('onSave', () => {
    it('removes due date data if question is not set to "yes"', () => {
      const pageBody: PregnancyInformationBody = {
        isPregnant: 'dontKnow',
        dueDate: '2024-03-27',
        'dueDate-month': '10',
        'dueDate-year': '2023',
        'dueDate-day': '01',
      }

      const page = new PregnancyInformation(pageBody, application)

      page.onSave()

      expect(page.body).toEqual({
        isPregnant: 'dontKnow',
      })
    })
  })
})
