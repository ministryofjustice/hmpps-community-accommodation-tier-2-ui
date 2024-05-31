import { path } from 'static-path'

const peoplePath = path('/cas2/people')
const personPath = peoplePath.path(':crn')
const oasysPath = personPath.path('oasys')
const applicationsPath = path('/cas2/applications')
const abandonPath = applicationsPath.path(':id').path('abandon')
const singleApplicationPath = applicationsPath.path(':id')
const singleAssessmentPath = path('/cas2/assessments/:id')
const submissionsPath = path('/cas2/submissions')
const singleSubmissionPath = submissionsPath.path(':id')
const referenceDataPath = path('/cas2/reference-data')
const reportsPath = path('/cas2/reports')
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
