import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import Summary from './summary'

describe('Summary', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new Summary({}, application)

      expect(page.title).toEqual(`Risk of serious harm (RoSH) summary for Roger Smith`)
    })
  })

  itShouldHaveNextValue(new Summary({}, application), 'risk-to-others')
  itShouldHavePreviousValue(new Summary({}, application), 'oasys-import')

  describe('response', () => {
    it('not implemented', () => {
      const page = new Summary({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new Summary({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
