import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import CheckInformationNeeded from './checkInformationNeeded'
import { applicationFactory, personFactory } from '../../../../testutils/factories/index'
import { getQuestions } from '../../../utils/questions'

describe('CheckInformationNeeded', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  const questions = getQuestions('Roger Smith')

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new CheckInformationNeeded({ hasInformationNeeded: 'yes' }, application)

      expect(page.title).toEqual('Check information needed from Roger Smith')
    })
  })

  itShouldHaveNextValue(new CheckInformationNeeded({ hasInformationNeeded: 'yes' }, application), '')
  itShouldHavePreviousValue(new CheckInformationNeeded({ hasInformationNeeded: 'yes' }, application), 'taskList')

  describe('items', () => {
    it('returns the radio with the expected label text', () => {
      const page = new CheckInformationNeeded({ hasInformationNeeded: 'yes' }, application)

      expect(page.items()).toEqual([
        {
          value: 'yes',
          text: questions['information-needed-from-applicant']['information-needed-from-applicant'].hasInformationNeeded
            .answers.yes,
          checked: true,
        },
        {
          value: 'no',
          text: questions['information-needed-from-applicant']['information-needed-from-applicant'].hasInformationNeeded
            .answers.no,
          checked: false,
        },
      ])
    })
  })

  describe('errors', () => {
    it('should return errors when yes/no questions are blank', () => {
      const page = new CheckInformationNeeded({}, application)

      expect(page.errors()).toEqual({
        hasInformationNeeded: 'Confirm whether you have all the information you need from the applicant',
      })
    })
  })
})
