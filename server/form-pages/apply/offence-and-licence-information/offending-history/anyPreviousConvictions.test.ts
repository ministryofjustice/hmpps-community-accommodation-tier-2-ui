import { itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import AnyPreviousConvictions, { PreviousConvictionsAnswers } from './anyPreviousConvictions'

describe('hasAnyPreviousConvictions', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new AnyPreviousConvictions({}, application)

      expect(page.title).toEqual('Does Roger Smith have any previous unspent convictions?')
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
    describe('when the applicant has previous unspent convictions with relevant risk', () => {
      describe('offence history', () => {
        describe('when no offences have been added yet', () => {
          it('takes the user to the offence history data page', () => {
            const page = new AnyPreviousConvictions(
              { hasAnyPreviousConvictions: PreviousConvictionsAnswers.YesRelevantRisk },
              application,
            )
            expect(page.next()).toEqual('offence-history-data')
          })
        })

        describe('when some offences have been added', () => {
          it('takes the user to the offence history page', () => {
            const applicationWithOffences = applicationFactory.build({
              person: personFactory.build({ name: 'Roger Smith' }),
              data: { 'offending-history': { 'offence-history-data': [{ offenceGroupName: 'Stalking (08800)' }] } },
            })
            const page = new AnyPreviousConvictions(
              { hasAnyPreviousConvictions: PreviousConvictionsAnswers.YesRelevantRisk },
              applicationWithOffences,
            )
            expect(page.next()).toEqual('offence-history')
          })
        })
      })
    })

    describe('when the applicant has previous unspent convictions with no relevant risk', () => {
      it('takes the user back to the task list', () => {
        const page = new AnyPreviousConvictions(
          { hasAnyPreviousConvictions: PreviousConvictionsAnswers.YesNoRelevantRisk },
          application,
        )
        expect(page.next()).toEqual('')
      })
    })
  })

  describe('errors', () => {
    describe('when they have not provided any answer', () => {
      it('returns an error', () => {
        const page = new AnyPreviousConvictions({}, application)
        expect(page.errors()).toEqual({
          hasAnyPreviousConvictions: 'Confirm whether the applicant has any previous unspent convictions',
        })
      })
    })

    describe('when the answer does not match the expected answers', () => {
      it('returns an error', () => {
        const page = new AnyPreviousConvictions(
          { hasAnyPreviousConvictions: 'yes' as PreviousConvictionsAnswers },
          application,
        )
        expect(page.errors()).toEqual({
          hasAnyPreviousConvictions: 'Confirm whether the applicant has any previous unspent convictions',
        })
      })
    })
  })
})
