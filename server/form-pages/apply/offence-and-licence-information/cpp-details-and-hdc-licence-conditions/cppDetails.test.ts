import { itShouldHavePreviousValue, itShouldHaveNextValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import CPPDetails from './cppDetails'

describe('CPPDetails', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new CPPDetails({}, application)

      expect(page.title).toEqual("Who is Roger Smith's Community Probation Practitioner (CPP)?")
    })
  })

  itShouldHavePreviousValue(new CPPDetails({}, application), 'taskList')
  itShouldHaveNextValue(new CPPDetails({}, application), 'non-standard-licence-conditions')

  describe('errors', () => {
    describe('when they have not provided any answer', () => {
      it('returns errors', () => {
        const page = new CPPDetails({}, application)
        expect(page.errors()).toEqual({
          name: "Enter the CPP's full name",
          probationRegion: 'Enter the probation region',
          email: "Enter the CPP's email address",
          telephone: "Enter the CPP's contact number",
        })
      })
    })
  })

  describe('response', () => {
    it('returns data in expected format', () => {
      const page = new CPPDetails(
        {
          name: 'a name',
          probationRegion: 'a probation region',
          email: 'an email address',
          telephone: 'a phone number',
        },
        application,
      )

      expect(page.response()).toEqual({
        "Who is Roger Smith's Community Probation Practitioner (CPP)?": `a name\r\na probation region\r\nan email address\r\na phone number`,
      })
    })
  })
})
