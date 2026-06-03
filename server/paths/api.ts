import { path } from 'static-path'

const basePath = path('/cas2-hdc')
const peoplePath = basePath.path('people')
const personPath = peoplePath.path(':crn')
const oasysPath = personPath.path('oasys')
const applicationsPath = basePath.path('applications')
const abandonPath = applicationsPath.path(':id').path('abandon')
const singleApplicationPath = applicationsPath.path(':id')
const singleAssessmentPath = basePath.path('assessments/:id')
const submissionsPath = basePath.path('submissions')
const singleSubmissionPath = submissionsPath.path(':id')
const referenceDataPath = basePath.path('reference-data')
const reportsPath = basePath.path('reports')
const singleReportPath = reportsPath.path(':name')

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
    abandon: abandonPath,
    show: singleApplicationPath,
    update: singleApplicationPath,
  },
  assessments: {
    show: singleAssessmentPath,
    update: singleAssessmentPath,
    applicationNotes: {
      create: singleAssessmentPath.path('notes'),
    },
  },
  referenceData: {
    applicationStatuses: referenceDataPath.path('application-status'),
  },
  assessmentStatusUpdates: {
    create: singleAssessmentPath.path('status-updates'),
  },
  reports: {
    show: singleReportPath,
  },
}
