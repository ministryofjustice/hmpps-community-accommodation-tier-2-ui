import { YesOrNo } from '@approved-premises/ui'
import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import GangAffiliations, { GangAffiliationsBody } from './gangAffiliations'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'

describe('GangAffiliations', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Sue Smith' }) })
  const body = {
    hasGangAffiliations: 'yes' as YesOrNo,
    gangName: 'Gang name',
    gangOperationArea: 'Derby',
    rivalGangDetail: 'Rival gang name and detail',
  }

  it('sets the question as the page title', () => {
    const page = new GangAffiliations(body, application)

    expect(page.title).toEqual('Does Sue Smith have any gang affiliations?')
  })

  it('sets the body', () => {
    const page = new GangAffiliations(body, application)

    expect(page.body).toEqual(body)
  })

  describe('errors', () => {
    it('returns an error if hasGangAffiliations is not set', () => {
      const page = new GangAffiliations({ ...body, hasGangAffiliations: null }, application)

      expect(page.errors()).toEqual({
        hasGangAffiliations: 'Select yes if they have gang affiliations',
      })
    })

    describe('when hasGangAffiliations is set to yes', () => {
      it('returns an error if gangName is not set', () => {
        const page = new GangAffiliations({ ...body, hasGangAffiliations: 'yes', gangName: null }, application)

        expect(page.errors()).toEqual({
          gangName: `Enter the gang's name`,
        })
      })

      it('returns an error if gangOperationArea is not set', () => {
        const page = new GangAffiliations({ ...body, hasGangAffiliations: 'yes', gangOperationArea: null }, application)

        expect(page.errors()).toEqual({
          gangOperationArea: 'Describe the area the gang operates in',
        })
      })
    })
  })

  itShouldHaveNextValue(new GangAffiliations(body, application), 'family-accommodation')
  itShouldHavePreviousValue(new GangAffiliations(body, application), 'exclusion-zones')

  describe('onSave', () => {
    it('removes gang affiliation data if question is set to "no"', () => {
      const pageBody: GangAffiliationsBody = {
        hasGangAffiliations: 'no',
        gangName: 'Gang name',
        gangOperationArea: 'Gang operation area',
        rivalGangDetail: 'Rival gang detail',
      }

      const page = new GangAffiliations(pageBody, application)

      page.onSave()

      expect(page.body).toEqual({
        hasGangAffiliations: 'no',
      })
    })
  })
})
