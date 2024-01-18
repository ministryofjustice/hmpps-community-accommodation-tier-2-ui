import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import MentalHealth, { MentalHealthBody } from './mentalHealth'

describe('MentalHealth', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new MentalHealth({}, application)

      expect(page.title).toEqual('Mental health needs for Roger Smith')
    })
  })

  itShouldHaveNextValue(new MentalHealth({}, application), 'communication-and-language')
  itShouldHavePreviousValue(new MentalHealth({}, application), 'physical-health')

  describe('errors', () => {
    describe('when top-level questions are unanswered', () => {
      const page = new MentalHealth({}, application)

      it('includes a validation error for _hasMentalHealthNeeds_', () => {
        expect(page.errors()).toHaveProperty('hasMentalHealthNeeds', 'Confirm whether they have mental health needs')
      })

      it('includes a validation error for _isEngagedWithCommunity_', () => {
        expect(page.errors()).toHaveProperty('isEngagedWithCommunity', 'Confirm whether they are engaged with services')
      })

      it('includes a validation error for _hasPrescribedMedication_', () => {
        expect(page.errors()).toHaveProperty(
          'hasPrescribedMedication',
          'Confirm whether they are prescribed medication',
        )
      })

      it('includes a validation error for _isEngagedWithServicesInCustody_', () => {
        expect(page.errors()).toHaveProperty(
          'isEngagedWithServicesInCustody',
          'Confirm whether they are engaged with mental health services in custody',
        )
      })
    })

    describe('when _hasMentalHealthNeeds_ is YES', () => {
      const page = new MentalHealth({ hasMentalHealthNeeds: 'yes' }, application)

      describe('and _needsDetail_ is UNANSWERED', () => {
        it('includes a validation error for _needsDetail_', () => {
          expect(page.errors()).toHaveProperty('needsDetail', 'Describe mental health needs')
        })
      })
    })

    describe('when _isEngagedWithCommunity_ is YES', () => {
      const page = new MentalHealth({ isEngagedWithCommunity: 'yes' }, application)

      describe('and _servicesDetail_ is UNANSWERED', () => {
        it('includes a validation error for _servicesDetail_', () => {
          expect(page.errors()).toHaveProperty('servicesDetail', 'State the services with which they have engaged')
        })
      })
    })

    describe('when _hasPrescribedMedication_ is YES', () => {
      const page = new MentalHealth({ hasPrescribedMedication: 'yes' }, application)

      describe('and _isInPossessionOfMeds_ is UNANSWERED', () => {
        it('includes a validation error for _isInPossessionOfMeds_', () => {
          expect(page.errors()).toHaveProperty('isInPossessionOfMeds', 'Confirm whether they have their medication')
        })
      })

      describe('and _medicationDetail_ is UNANSWERED', () => {
        it('includes a validation error for _medicationDetail_', () => {
          expect(page.errors()).toHaveProperty('medicationDetail', 'List their mental health medication')
        })
      })

      describe('and _medicationIssues_ is UNANSWERED', () => {
        it('includes NO validation error for _medicationIssues_ (optional)', () => {
          expect(page.errors()).not.toHaveProperty('medicationIssues')
        })
      })
    })
  })

  describe('onSave', () => {
    it('removes mental health data if the question is set to "no"', () => {
      const body: Partial<MentalHealthBody> = {
        hasMentalHealthNeeds: 'no',
        needsDetail: 'Mental health needs detail',
      }

      const page = new MentalHealth(body, application)

      page.onSave()

      expect(page.body).toEqual({
        hasMentalHealthNeeds: 'no',
      })
    })

    it('removes community mental health data if the question is set to "no"', () => {
      const body: Partial<MentalHealthBody> = {
        isEngagedWithCommunity: 'no',
        servicesDetail: 'Services detail',
      }

      const page = new MentalHealth(body, application)

      page.onSave()

      expect(page.body).toEqual({
        isEngagedWithCommunity: 'no',
      })
    })

    it('removes prescribed medication data if the question is set to "no"', () => {
      const body: Partial<MentalHealthBody> = {
        hasPrescribedMedication: 'no',
        isInPossessionOfMeds: 'yes',
        medicationDetail: 'Medication detail',
        medicationIssues: 'Medication issues',
      }

      const page = new MentalHealth(body, application)

      page.onSave()

      expect(page.body).toEqual({
        hasPrescribedMedication: 'no',
      })
    })
  })
})
