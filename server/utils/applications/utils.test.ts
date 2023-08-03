import { applicationFactory } from '../../testutils/factories'

import { eligibilityQuestionIsAnswered } from './utils'

describe('utils', () => {
  describe('eligibilityQuestionIsAnswered', () => {
    describe('when the isEligible property is _yes_', () => {
      it('returns true', async () => {
        const application = applicationFactory.build({
          data: {
            'confirm-eligibility': {
              'confirm-eligibility': { isEligible: 'yes' },
            },
          },
        })

        expect(eligibilityQuestionIsAnswered(application)).toEqual(true)
      })
    })

    describe('when the isEligible property is _no_', () => {
      it('returns true', async () => {
        const application = applicationFactory.build({
          data: {
            'confirm-eligibility': {
              'confirm-eligibility': { isEligible: 'no' },
            },
          },
        })

        expect(eligibilityQuestionIsAnswered(application)).toEqual(true)
      })
    })

    describe('when the isEligible property is something else', () => {
      it('returns false', async () => {
        const application = applicationFactory.build({
          data: {
            'confirm-eligibility': {
              'confirm-eligibility': { isEligible: 'something else' },
            },
          },
        })

        expect(eligibilityQuestionIsAnswered(application)).toEqual(false)
      })
    })

    describe('when the isEligible property is missing', () => {
      it('returns false', async () => {
        const application = applicationFactory.build({
          data: {},
        })

        expect(eligibilityQuestionIsAnswered(application)).toEqual(false)
      })
    })
  })
})
