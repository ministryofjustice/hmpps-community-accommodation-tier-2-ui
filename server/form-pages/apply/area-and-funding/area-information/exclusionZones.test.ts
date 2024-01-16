import { YesOrNo } from '@approved-premises/ui'
import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import ExclusionZones, { ExclusionZonesBody } from './exclusionZones'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'

describe('ExclusionZones', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Sue Smith' }) })
  const body = {
    hasExclusionZones: 'yes' as YesOrNo,
    exclusionZonesDetail: 'Liverpool',
  }

  it('sets the question as the page title', () => {
    const page = new ExclusionZones(body, application)

    expect(page.title).toEqual('Exclusion zones for Sue Smith')
  })

  it('sets the body', () => {
    const page = new ExclusionZones(body, application)

    expect(page.body).toEqual(body)
  })

  describe('errors', () => {
    it('returns an error if hasExclusionZones is not set', () => {
      const page = new ExclusionZones({ ...body, hasExclusionZones: null }, application)

      expect(page.errors()).toEqual({
        hasExclusionZones: 'Confirm whether they have any exclusion zones',
      })
    })

    describe('when hasExclusionZones is set to yes', () => {
      it('returns an error if exclusionZonesDetail is not set', () => {
        const page = new ExclusionZones({ hasExclusionZones: 'yes', exclusionZonesDetail: null }, application)

        expect(page.errors()).toEqual({
          exclusionZonesDetail: 'Provide details about the exclusion zone',
        })
      })
    })
  })

  itShouldHaveNextValue(new ExclusionZones(body, application), 'gang-affiliations')
  itShouldHavePreviousValue(new ExclusionZones(body, application), 'second-preferred-area')

  describe('onSave', () => {
    it('removes exclusion zones data if question is set to "no"', () => {
      const pageBody: ExclusionZonesBody = {
        hasExclusionZones: 'no',
        exclusionZonesDetail: 'Exclusion zones detail',
      }

      const page = new ExclusionZones(pageBody, application)

      page.onSave()

      expect(page.body).toEqual({
        hasExclusionZones: 'no',
      })
    })
  })
})
