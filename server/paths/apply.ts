import { path } from 'static-path'

const applicationsPath = path('/applications')
const singleApplicationPath = applicationsPath.path(':id')
const pagesPath = singleApplicationPath.path('tasks/:task/pages/:page')
const peoplePath = applicationsPath.path('people')
const healthNeedsPath = applicationsPath.path('health-needs')
// const risksPath = applicationsPath.path(':crn')

const paths = {
  applications: {
    create: applicationsPath.path('create'),
    new: applicationsPath.path('new'),
    people: {
      find: peoplePath.path('find'),
    },
    show: singleApplicationPath,
    // show: risksPath.path('show'),
    healthNeeds: healthNeedsPath('show'),
    index: applicationsPath,
    submission: singleApplicationPath.path('submission'),
    pages: {
      show: pagesPath,
      update: pagesPath,
    },
  },
}

export default paths
