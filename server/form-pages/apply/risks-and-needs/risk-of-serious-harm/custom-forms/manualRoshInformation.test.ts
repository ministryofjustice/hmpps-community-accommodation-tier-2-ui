import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../../testutils/factories/index'
import ManualRoshInformation from './manualRoshInformation'
import type { ManualRoshBody } from './manualRoshInformation'
import { DateFormats } from '../../../../../utils/dateUtils'

describe('ManualRoshInformation', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new ManualRoshInformation({}, application)

      expect(page.title).toEqual(`Create a RoSH summary for Roger Smith`)
    })
  })

  describe('documentTitle', () => {
    it('personalises the document title', () => {
      const page = new ManualRoshInformation({}, application)

      expect(page.documentTitle).toEqual(`Create a RoSH summary for this person`)
    })
  })

  describe('selectText', () => {
    it('personalises the hint text on the page', () => {
      const page = new ManualRoshInformation({}, application)

      expect(page.selectText).toEqual(`Select the risk levels for Roger Smith in the community.`)
    })
  })

  describe('questions', () => {
    const page = new ManualRoshInformation({}, application)

    describe('riskToChildren', () => {
      it('has a question', () => {
        expect(page.questions.riskToChildren.question).toBeDefined()
      })
    })

    describe('riskToPublic', () => {
      it('has a question', () => {
        expect(page.questions.riskToPublic.question).toBeDefined()
      })
    })

    describe('riskToKnownAdult', () => {
      it('has a question', () => {
        expect(page.questions.riskToKnownAdult.question).toBeDefined()
      })
    })

    describe('riskToStaff', () => {
      it('has a question', () => {
        expect(page.questions.riskToStaff.question).toBeDefined()
      })
    })

    describe('overallRisk', () => {
      it('has a question', () => {
        expect(page.questions.overallRisk.question).toBeDefined()
      })
    })
  })

  itShouldHaveNextValue(new ManualRoshInformation({}, application), 'risk-to-others')
  itShouldHavePreviousValue(new ManualRoshInformation({}, application), 'taskList')

  describe('errors', () => {
    it('returns an error when required fields are blank', () => {
      const page = new ManualRoshInformation({}, application)
      expect(page.errors()).toEqual({
        overallRisk: 'Select they risk they pose overall',
        riskToChildren: 'Select the risk they pose to children',
        riskToKnownAdult: 'Select they risk they pose to a known adult',
        riskToPublic: 'Select the risk they pose to the public',
        riskToStaff: 'Select they risk they pose to staff',
      })
    })
  })

  describe('items', () => {
    Object.keys(new ManualRoshInformation({}, application).body)
      .filter(item => item !== 'createdAt')
      .forEach((fieldName: keyof ManualRoshBody) => {
        it(`returns the radio with the expected label text for ${fieldName} `, () => {
          const data = { [fieldName]: 'Low' }
          const page = new ManualRoshInformation(data, application)

          expect(page.items(fieldName)).toEqual([
            {
              checked: true,
              text: 'Low',
              value: 'Low',
            },
            {
              checked: false,
              text: 'Medium',
              value: 'Medium',
            },
            {
              checked: false,
              text: 'High',
              value: 'High',
            },
            {
              checked: false,
              text: 'Very High',
              value: 'Very High',
            },
          ])
        })
      })
  })

  describe('response', () => {
    const body: ManualRoshBody = {
      overallRisk: 'Very high',
      riskToChildren: 'Medium',
      riskToPublic: 'Low',
      riskToKnownAdult: 'High',
      riskToStaff: 'Low',
    }

    it('returns manual-rosh data', () => {
      const page = new ManualRoshInformation(body, application)
      expect(page.response()).toEqual({
        'Created by prison offender manager': DateFormats.isoDateToUIDate(page.createdAt, { format: 'medium' }),
        'Overall risk rating': body.overallRisk,
        'Risk to children': body.riskToChildren,
        'Risk to known adult': body.riskToKnownAdult,
        'Risk to public': body.riskToPublic,
        'Risk to staff': body.riskToStaff,
      })
    })
  })
})
