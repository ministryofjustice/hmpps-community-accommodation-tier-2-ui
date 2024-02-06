import { Cas2Application as Application } from '@approved-premises/api'
import { FormSections, TaskStatus, TaskWithStatus, UiTask } from '@approved-premises/ui'
import Apply from '../form-pages/apply'
import getTaskStatus from '../form-pages/utils/getTaskStatus'

export default class TaskListService {
  taskStatuses: Record<string, TaskStatus>

  formSections: FormSections

  constructor(application: Application) {
    this.formSections = Apply.sections
    this.taskStatuses = {}

    this.formSections.forEach(section => {
      section.tasks.forEach(task => {
        if (
          task.id === 'check-your-answers' &&
          (Object.values(this.taskStatuses).includes('not_started') ||
            Object.values(this.taskStatuses).includes('in_progress'))
        ) {
          this.taskStatuses[task.id] = 'cannot_start'
        } else {
          this.taskStatuses[task.id] = getTaskStatus(task, application)
        }
      })
    })
  }

  get completeTaskCount() {
    let completeTaskCount = 0

    this.formSections.forEach(section => {
      const taskIds = section.tasks.map(s => s.id)
      const completeTasks = Object.keys(this.taskStatuses)
        .filter(k => taskIds.includes(k))
        .filter(k => this.taskStatuses[k] === 'complete')
      completeTaskCount += completeTasks.length
    })

    return completeTaskCount
  }

  get sections() {
    return this.formSections.map((s, i) => {
      const tasks = s.tasks.map(t => this.addStatusToTask(t))
      return { sectionNumber: i + 1, title: s.title, tasks }
    })
  }

  get taskCount() {
    return this.formSections.flatMap(s => s.tasks).length
  }

  get status() {
    const completeTasks = Object.values(this.taskStatuses).filter(t => t === 'complete')
    return completeTasks.length === Object.keys(this.taskStatuses).length ? 'complete' : 'incomplete'
  }

  addStatusToTask(task: UiTask): TaskWithStatus {
    return { ...task, status: this.taskStatuses[task.id] }
  }
}
