import { itShouldHaveNextValue, itShouldHavePreviousValue } from '../../../shared-examples'
import { personFactory, applicationFactory } from '../../../../testutils/factories/index'
import { formatLines } from '../../../../utils/viewUtils'
import BehaviourNotes from './behaviourNotes'

jest.mock('../../../../utils/viewUtils')

describe('BehaviourNotes', () => {
  const application = applicationFactory.build({ person: personFactory.build({ name: 'Roger Smith' }) })

  ;(formatLines as jest.MockedFunction<typeof formatLines>).mockImplementation(text => text)

  describe('title', () => {
    it('personalises the page title', () => {
      const page = new BehaviourNotes({}, application)

      expect(page.title).toEqual(`Behaviour notes for Roger Smith`)
    })
  })

  itShouldHaveNextValue(new BehaviourNotes({}, application), 'additional-risk-information')
  itShouldHavePreviousValue(new BehaviourNotes({}, application), 'cell-share-information')

  describe('response', () => {
    it('returns behaviour notes', () => {
      const page = new BehaviourNotes({}, application)

      page.behaviourNotes = [
        { behaviourDetail: 'detail 1', removeLink: '' },
        { behaviourDetail: 'detail 2', removeLink: '' },
      ]

      expect(page.response()).toEqual({ 'Behaviour note 1': 'detail 1', 'Behaviour note 2': 'detail 2' })
    })

    it('returns empty object when no notes', () => {
      const page = new BehaviourNotes({}, application)
      expect(page.response()).toEqual({})
    })
  })

  describe('errors', () => {
    it('not implemented', () => {
      const page = new BehaviourNotes({}, application)

      expect(page.errors()).toEqual({})
    })
  })

  describe('behaviourNotes', () => {
    it('adds a redirect link to the data and preserves line breaks in behaviour notes', () => {
      const applicationWithNotes = applicationFactory.build({
        id: 'abc123',
        data: {
          'risk-of-serious-harm': {
            'behaviour-notes-data': [
              {
                behaviourDetail: 'some detail 1',
              },
              {
                behaviourDetail: 'some detail 2',
              },
            ],
          },
        },
      })

      const page = new BehaviourNotes({}, applicationWithNotes)

      expect(page.behaviourNotes).toEqual([
        {
          removeLink:
            '/applications/abc123/tasks/risk-of-serious-harm/pages/behaviour-notes-data/0/removeFromList?redirectPage=behaviour-notes',
          behaviourDetail: 'some detail 1',
        },
        {
          removeLink:
            '/applications/abc123/tasks/risk-of-serious-harm/pages/behaviour-notes-data/1/removeFromList?redirectPage=behaviour-notes',
          behaviourDetail: 'some detail 2',
        },
      ])

      page.behaviourNotes.forEach(({ behaviourDetail }) => expect(formatLines).toHaveBeenCalledWith(behaviourDetail))
    })
  })
})
