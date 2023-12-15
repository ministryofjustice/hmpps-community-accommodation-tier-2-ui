import { path } from 'static-path'

const reportPath = path('/reports')

export default {
  report: {
    new: reportPath,
    create: reportPath.path('download'),
  },
}
