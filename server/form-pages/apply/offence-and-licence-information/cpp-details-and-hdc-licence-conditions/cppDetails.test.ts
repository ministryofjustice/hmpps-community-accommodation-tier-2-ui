import { itShouldHavePreviousValue, itShouldHaveNextValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import CPPDetails from './cppDetails'

describe('CPPDetails', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })
  const body = {
    name: 'Some Name',
    probationRegion: 'Cloud City',
    telephone: '01234 56789',
    email: 'name@justice.gov.uk',
  }

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

    it('returns an error if the email address is not valid', () => {
      const page = new CPPDetails({ ...body, email: 'invalid-email' }, application)
      expect(page.errors()).toEqual({ email: 'Enter an email address ending .gov.uk' })
    })

    it('returns an error if the email address is not a .gov.uk email address', () => {
      const page = new CPPDetails({ ...body, email: 'name@example.com' }, application)
      expect(page.errors()).toEqual({ email: 'Enter an email address ending .gov.uk' })
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
