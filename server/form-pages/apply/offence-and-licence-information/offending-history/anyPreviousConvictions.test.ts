import { itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import AnyPreviousConvictions from './anyPreviousConvictions'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'

const yesNoRadios = [
  {
    value: 'yes',
    text: 'Yes',
    checked: false,
  },
  {
    value: 'no',
    text: 'No',
    checked: false,
  },
]

jest.mock('../../../../utils/formUtils', () => ({
  convertKeyValuePairToRadioItems: jest.fn().mockImplementation(() => yesNoRadios),
}))

describe('hasAnyPreviousConvictions', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new AnyPreviousConvictions({}, application)

      expect(page.title).toEqual('Does Roger Smith have any previous convictions?')
    })
  })

  describe('Questions', () => {
    const page = new AnyPreviousConvictions({}, application)

    describe('hasAnyPreviousConvictions', () => {
      it('has a question', () => {
        expect(page.questions.hasAnyPreviousConvictions.question).toBeDefined()
      })
    })
  })

  itShouldHavePreviousValue(new AnyPreviousConvictions({}, application), 'taskList')
  describe('next', () => {
    describe('when there is no offence history', () => {
      const page = new AnyPreviousConvictions({}, application)
      expect(page.next()).toEqual('')
    })
    describe('when there is offence history', () => {
      describe('when no offences have been added yet', () => {
        const page = new AnyPreviousConvictions({ hasAnyPreviousConvictions: 'yes' }, application)
        expect(page.next()).toEqual('offence-history-data')
      })
      describe('when some offences have been added', () => {
        const applicationWithOffences = applicationFactory.build({
          person: personFactory.build({ name: 'Roger Smith' }),
          data: { 'offending-history': { 'offence-history-data': [{ titleAndNumber: 'Stalking (08800)' }] } },
        })
        const page = new AnyPreviousConvictions({ hasAnyPreviousConvictions: 'yes' }, applicationWithOffences)
        expect(page.next()).toEqual('offence-history')
      })
    })
  })

  describe('errors', () => {
    describe('when they have not provided any answer', () => {
      it('returns an error', () => {
        const page = new AnyPreviousConvictions({}, application)
        expect(page.errors()).toEqual({
          hasAnyPreviousConvictions: 'Confirm whether the applicant has any previous convictions',
        })
      })
    })
  })

  describe('items', () => {
    it('returns the yes or no radios', () => {
      const page = new AnyPreviousConvictions({}, application)

      expect(page.items()).toEqual(yesNoRadios)
      expect(convertKeyValuePairToRadioItems).toHaveBeenCalledWith(
        { no: 'No, this is their first offence', yes: 'Yes' },
        undefined,
      )
    })
  })
})
