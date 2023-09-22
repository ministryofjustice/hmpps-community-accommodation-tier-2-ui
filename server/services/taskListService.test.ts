import { applicationFactory } from '../testutils/factories'
import TaskListService from './taskListService'
import getTaskStatus from '../form-pages/utils/getTaskStatus'

jest.mock('../form-pages/apply', () => {
  return {
    sections: [
      {
        title: 'First Section',
        tasks: [
          {
            id: 'first-task',
            title: 'First task',
          },
          {
            id: 'second-task',
            title: 'Second task',
          },
        ],
      },
      {
        title: 'Second Section',
        tasks: [
          {
            id: 'third-task',
            title: 'Third task',
          },
          {
            id: 'fourth-task',
            title: 'Fourth task',
          },
          {
            id: 'fifth-task',
            title: 'Fifth task',
          },
        ],
      },
    ],
  }
})

jest.mock('../form-pages/utils/getTaskStatus')

describe('taskListService', () => {
  const application = applicationFactory.build({ id: 'some-uuid' })

  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('taskStatuses', () => {
    it('returns status of task', () => {
      ;(getTaskStatus as jest.Mock).mockReturnValue('in_progress')

      const taskListService = new TaskListService(application)

      expect(taskListService.taskStatuses).toEqual({
        'first-task': 'in_progress',
        'second-task': 'in_progress',
        'third-task': 'in_progress',
        'fourth-task': 'in_progress',
        'fifth-task': 'in_progress',
      })

      expect(getTaskStatus).toHaveBeenCalledTimes(5)
    })
  })

  describe('completeSectionCount', () => {
    it('returns zero when there are no complete sections', () => {
      ;(getTaskStatus as jest.Mock).mockReturnValue('not_started')

      const taskListService = new TaskListService(application)

      expect(taskListService.completeSectionCount).toEqual(0)
    })

    it('returns 1 when there one section is complete', () => {
      ;(getTaskStatus as jest.Mock).mockImplementation(t =>
        ['first-task', 'second-task', 'third-task'].includes(t.id) ? 'complete' : 'not_started',
      )

      const taskListService = new TaskListService(application)

      expect(taskListService.completeSectionCount).toEqual(1)
    })

    it('returns 2 when all sections are complete', () => {
      ;(getTaskStatus as jest.Mock).mockReturnValue('complete')

      const taskListService = new TaskListService(application)

      expect(taskListService.completeSectionCount).toEqual(2)
    })
  })

  describe('status', () => {
    it('returns complete when all sections are complete', () => {
      ;(getTaskStatus as jest.Mock).mockReturnValue('complete')

      const taskListService = new TaskListService(application)

      expect(taskListService.status).toEqual('complete')
    })

    it('returns incomplete when not all sections are complete', () => {
      ;(getTaskStatus as jest.Mock).mockReturnValue('not_started')

      const taskListService = new TaskListService(application)

      expect(taskListService.status).toEqual('incomplete')
    })
  })

  describe('sections', () => {
    it('returns the section data with the status of each task and the section number', () => {
      ;(getTaskStatus as jest.Mock).mockReturnValue('not_started')

      const taskListService = new TaskListService(application)

      expect(taskListService.sections).toEqual([
        {
          sectionNumber: 1,
          title: 'First Section',
          tasks: [
            { id: 'first-task', title: 'First task', status: 'not_started' },
            { id: 'second-task', title: 'Second task', status: 'not_started' },
          ],
        },
        {
          sectionNumber: 2,
          title: 'Second Section',
          tasks: [
            { id: 'third-task', title: 'Third task', status: 'not_started' },
            { id: 'fourth-task', title: 'Fourth task', status: 'not_started' },
            { id: 'fifth-task', title: 'Fifth task', status: 'not_started' },
          ],
        },
      ])
    })
  })
})
