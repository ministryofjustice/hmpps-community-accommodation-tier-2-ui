import { path } from 'static-path'

const peoplePath = path('/cas2/people')
const personPath = peoplePath.path(':crn')
const oasysPath = personPath.path('oasys')
const applicationsPath = path('/cas2/applications')
const singleApplicationPath = applicationsPath.path(':id')
const submissionsPath = path('/cas2/submissions')
const singleSubmissionPath = submissionsPath.path(':id')
const referenceDataPath = path('/cas2/reference-data')
const reportsPath = path('/cas2/reports')

export default {
  people: {
    oasys: {
      sections: oasysPath.path('sections'),
      riskToSelf: oasysPath.path('risk-to-self'),
      rosh: oasysPath.path('rosh'),
    },
    search: peoplePath.path('search'),
    risks: {
      show: personPath.path('risks'),
    },
  },
  submissions: {
    index: submissionsPath,
    create: submissionsPath,
    show: singleSubmissionPath,
  },
  applications: {
    new: applicationsPath,
    index: applicationsPath,
    show: singleApplicationPath,
    update: singleApplicationPath,
  },
  referenceData: {
    applicationStatuses: referenceDataPath.path('application-status'),
  },
  applicationStatusUpdates: {
    create: singleSubmissionPath.path('status-updates'),
  },
  reports: {
    exampleReport: reportsPath.path('example-report'),
  },
}
