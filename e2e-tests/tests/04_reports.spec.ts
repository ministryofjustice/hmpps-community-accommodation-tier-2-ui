import { test } from '../test'
import { signInAsMI, manageInformationReports, downloadReport, confirmColumnNames } from '../steps/reports'

test('Download submitted applications report', async ({ page, miUser }) => {
  await signInAsMI(page, miUser)
  await manageInformationReports(page)
  const path = await downloadReport('submittedApplications', page)
  await confirmColumnNames('submittedApplications', path)
})

test('Download application status updates report', async ({ page, miUser }) => {
  await signInAsMI(page, miUser)
  await manageInformationReports(page)
  const path = await downloadReport('applicationStatusUpdates', page)
  await confirmColumnNames('applicationStatusUpdates', path)
})

test('Download un-submitted applications report', async ({ page, miUser }) => {
  await signInAsMI(page, miUser)
  await manageInformationReports(page)
  const path = await downloadReport('unsubmittedApplications', page)
  await confirmColumnNames('unsubmittedApplications', path)
})
