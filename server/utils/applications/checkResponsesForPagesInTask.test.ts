import Apply from '../../form-pages/apply'
import { applicationFactory } from '../../testutils/factories'
import { checkResponsesForPagesInTask } from './checkResponsesForPagesInTask'

const FirstApplyPage = jest.fn()
const SecondApplyPage = jest.fn()

jest.mock('../../form-pages/apply', () => {
  return {
    pages: { 'basic-information': {}, 'type-of-ap': {} },
  }
})

const applySection1Task1 = {
  id: 'first-apply-section-task-1',
  title: 'First Apply section, task 1',
  actionText: '',
  pages: {
    first: FirstApplyPage,
    second: SecondApplyPage,
  },
}
const applySection1Task2 = {
  id: 'first-apply-section-task-2',
  title: 'First Apply section, task 2',
  actionText: '',
  pages: {},
}

const applySection2Task1 = {
  id: 'second-apply-section-task-1',
  title: 'Second Apply section, task 1',
  actionText: '',
  pages: {},
}

const applySection2Task2 = {
  id: 'second-apply-section-task-2',
  title: 'Second Apply section, task 2',
  actionText: '',
  pages: {},
}

const applySection1 = {
  name: 'first-apply-section',
  title: 'First Apply section',
  tasks: [applySection1Task1, applySection1Task2],
}

const applySection2 = {
  name: 'second-apply-section',
  title: 'Second Apply section',
  tasks: [applySection2Task1, applySection2Task2],
}

Apply.sections = [applySection1, applySection2]

Apply.pages['first-apply-section-task-1'] = {
  first: FirstApplyPage,
  second: SecondApplyPage,
}

describe('forPagesInTask', () => {
  it('iterates through the pages of a task', () => {
    const firstApplyPageInstance = {
      next: () => 'second',
    }
    const secondApplyPageInstance = {
      next: () => '',
    }

    FirstApplyPage.mockReturnValue(firstApplyPageInstance)
    SecondApplyPage.mockReturnValue(secondApplyPageInstance)
    const spy = jest.fn()

    const application = applicationFactory.build({
      data: {
        'first-apply-section-task-1': { first: { foo: 'bar' }, second: { bar: 'foo' } },
      },
    })

    checkResponsesForPagesInTask(application, applySection1Task1, spy)

    expect(spy).toHaveBeenCalledWith(firstApplyPageInstance, 'first')
    expect(spy).toHaveBeenCalledWith(secondApplyPageInstance, 'second')
    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('skips tasks that are not part of the user journey', () => {
    const firstApplyPageInstance = {
      next: () => '',
    }

    FirstApplyPage.mockReturnValue(firstApplyPageInstance)
    const spy = jest.fn()

    const application = applicationFactory.build({
      data: {
        'first-apply-section-task-1': { first: { foo: 'bar' }, second: { bar: 'foo' } },
      },
    })

    checkResponsesForPagesInTask(application, applySection1Task1, spy)

    expect(spy).toHaveBeenCalledWith(firstApplyPageInstance, 'first')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('skips pages for which there is no data in the application', () => {
    const applyPageWithNoData = {
      next: () => '',
    }
    const secondApplyPageInstance = {
      next: () => '',
    }

    FirstApplyPage.mockReturnValue(applyPageWithNoData)
    SecondApplyPage.mockReturnValue(secondApplyPageInstance)
    const spy = jest.fn()

    const application = applicationFactory.build({
      data: {
        'first-apply-section-task-1': { first: undefined, second: { bar: 'foo' } },
      },
    })

    checkResponsesForPagesInTask(application, applySection1Task1, spy)

    expect(spy).not.toHaveBeenCalledWith(applyPageWithNoData)
    expect(spy).toHaveBeenCalledWith(secondApplyPageInstance, 'second')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
