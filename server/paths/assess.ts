import { path } from 'static-path'

const assessApplicationsPath = path('/assess/applications')
const singleApplicationPath = assessApplicationsPath.path(':id')
const updateStatusPath = singleApplicationPath.path('update-status')

export default {
  submittedApplications: {
    index: assessApplicationsPath,
    show: singleApplicationPath,
    overview: singleApplicationPath.path('overview'),
  },
  statusUpdate: {
    new: updateStatusPath,
    create: updateStatusPath,
  },
}
