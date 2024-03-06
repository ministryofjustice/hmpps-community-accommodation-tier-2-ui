import { path } from 'static-path'

const assessApplicationsPath = path('/assess/applications')
const singleApplicationPath = assessApplicationsPath.path(':id')
const updateStatusPath = singleApplicationPath.path('update-status')
const statusUpdateDetailsPath = updateStatusPath.path('further-information/:statusName')

export default {
  submittedApplications: {
    index: assessApplicationsPath,
    show: singleApplicationPath,
    overview: singleApplicationPath.path('overview'),
    addNote: singleApplicationPath.path('add-note'),
  },
  statusUpdate: {
    new: updateStatusPath,
    create: updateStatusPath,
  },
  statusUpdateDetails: {
    new: statusUpdateDetailsPath,
    create: statusUpdateDetailsPath,
  },
  assessmentDetails: {
    show: singleApplicationPath.path('assessment-details'),
    update: singleApplicationPath.path('assessment-details/update'),
  },
}
