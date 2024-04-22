import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import CellShareInformation, { CellShareInformationBody } from './cellShareInformation'

describe('CellShareInformation', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new CellShareInformation({}, application)

      expect(page.title).toEqual(`Cell share information for Roger Smith`)
    })
  })

  itShouldHaveNextValue(new CellShareInformation({}, application), 'additional-risk-information')
  itShouldHavePreviousValue(new CellShareInformation({}, application), 'risk-management-arrangements')

  describe('errors', () => {
    describe('when answer data is valid', () => {
      it('returns empty object if valid data', () => {
        const page = new CellShareInformation({ hasCellShareComments: 'no' }, application)
        expect(page.errors()).toEqual({})
      })
    })

    describe('when they have not answered the has cell share comments question', () => {
      it('returns an error', () => {
        const page = new CellShareInformation({}, application)
        expect(page.errors()).toEqual({
          hasCellShareComments: 'Select whether there are any comments about cell sharing',
        })
      })
    })

    describe('when they have answered Yes there is cell share comments but not provided any', () => {
      it('returns an error', () => {
        const page = new CellShareInformation({ hasCellShareComments: 'yes' }, application)
        expect(page.errors()).toEqual({
          cellShareInformationDetail: 'Enter cell sharing information',
        })
      })
    })
  })

  describe('onSave', () => {
    it('removes cell share data when the question is set to "no"', () => {
      const body: CellShareInformationBody = {
        hasCellShareComments: 'no',
        cellShareInformationDetail: 'Cell share information',
      }

      const page = new CellShareInformation(body, application)

      page.onSave()

      expect(page.body).toEqual({
        hasCellShareComments: 'no',
      })
    })
  })
})
