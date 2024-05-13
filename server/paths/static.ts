import { path } from 'static-path'

const cookiesPolicyPath = path('/cookies')
const maintenancePath = path('/maintenance')
const privacyNoticePath = path('/privacy-notice')
const accessibilityStatementPath = path('/accessibility-statement')

const paths = {
  static: {
    cookiesPolicy: cookiesPolicyPath,
    maintenancePage: maintenancePath,
    privacyNotice: privacyNoticePath,
    accessibilityStatement: accessibilityStatementPath,
  },
}

export default paths
