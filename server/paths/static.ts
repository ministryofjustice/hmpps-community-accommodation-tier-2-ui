import { path } from 'static-path'

const maintenancePath = path('/maintenance')
const privacyNoticePath = path('/privacy-notice')

const paths = {
  static: {
    maintenancePage: maintenancePath,
    privacyNotice: privacyNoticePath,
  },
}

export default paths
