import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../../testutils/factories/index'
import OasysImport from './oasysImport'

describe('OasysImport', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new OasysImport({}, application)

      expect(page.title).toEqual(`Import Roger Smith's risk of serious harm (RoSH) data from OASys`)
    })
  })

  itShouldHaveNextValue(new OasysImport({}, application), 'summary')
  itShouldHavePreviousValue(new OasysImport({}, application), 'taskList')

  describe('response', () => {
    it('not implemented', () => {
      const page = new OasysImport({}, application)

      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new OasysImport({}, application)

      expect(page.errors()).toEqual({})
    })
  })
})
