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

      it('includes a validation error for _isEngagedWithServicesInCustody_', () => {
        expect(page.errors()).toHaveProperty(
          'isEngagedWithServicesInCustody',
          'Confirm whether they are engaged with mental health services in custody',
        )
      })

      it('includes a validation error for _areIntendingToEngageWithServicesAfterCustody_', () => {
        expect(page.errors()).toHaveProperty(
          'areIntendingToEngageWithServicesAfterCustody',
          'Confirm whether they are intending to engage with mental health services after custody',
        )
      })

      it('includes a validation error for _canManageMedication_', () => {
        expect(page.errors()).toHaveProperty(
          'canManageMedication',
          "Confirm whether they can manage their own mental health medication on release, or select 'They are not prescribed medication for their mental health'",
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
      describe('and _needsPresentation_ is UNANSWERED', () => {
        it('includes a validation error for _needsPresentation_', () => {
          expect(page.errors()).toHaveProperty('needsPresentation', 'Describe how they are presenting')
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

    describe('when _canManageMedication_ is YES', () => {
      const page = new MentalHealth({ canManageMedication: 'yes' }, application)

      describe('and _canManageMedicationNotes_ is UNANSWERED', () => {
        it('includes NO validation error for _canManageMedicationNotes_ (optional)', () => {
          expect(page.errors()).not.toHaveProperty('canManageMedicationNotes')
        })
      })
    })

    describe('when _canManageMedication_ is NO', () => {
      const page = new MentalHealth({ canManageMedication: 'no' }, application)

      describe('and _medicationIssues_ is UNANSWERED', () => {
        it('includes a validation error for _medicationIssues_', () => {
          expect(page.errors()).toHaveProperty(
            'medicationIssues',
            "Describe the applicant's issues with taking their mental health medication",
          )
        })
      })

      describe('and _cantManageMedicationNotes_ is UNANSWERED', () => {
        it('includes NO validation error for _cantManageMedicationNotes_ (optional)', () => {
          expect(page.errors()).not.toHaveProperty('cantManageMedicationNotes')
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

    it("removes can't manage own medication data if the question is not set to 'no'", () => {
      const body: Partial<MentalHealthBody> = {
        canManageMedication: 'notPrescribedMedication',
        cantManageMedicationNotes: 'some notes',
        medicationIssues: 'some issues',
      }

      const page = new MentalHealth(body, application)

      page.onSave()

      expect(page.body).toEqual({
        canManageMedication: 'notPrescribedMedication',
      })
    })

    it('removes can manage own medication notes if the question is not set to "yes"', () => {
      const body: Partial<MentalHealthBody> = {
        canManageMedication: 'no',
        canManageMedicationNotes: 'some notes',
      }

      const page = new MentalHealth(body, application)

      page.onSave()

      expect(page.body).toEqual({
        canManageMedication: 'no',
      })
    })
  })
})
