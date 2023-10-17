import { getQuestions } from './questions'

describe('getQuestions', () => {
  it('personalises the questions', () => {
    const questions = getQuestions('Roger Smith')

    expect(questions['confirm-eligibility']['confirm-eligibility'].isEligible.question).toEqual(
      'Is Roger Smith eligible for Short-Term Accommodation (CAS-2)?',
    )
  })
})
