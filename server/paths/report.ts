import { path } from 'static-path'

const reportPath = path('/reports')
const singleReportPath = reportPath.path(':name')

export default {
  report: {
    new: reportPath,
    create: singleReportPath,
  },
}
