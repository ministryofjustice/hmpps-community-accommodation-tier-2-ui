import { test } from '../test'
import { manageInformationReports, downloadReport, confirmColumnNames } from '../steps/reports'
import { signIn } from '../steps/signIn'

test('Download submitted applications report', async ({ page, miUser }) => {
  await signIn(page, miUser)
  await manageInformationReports(page)
  const path = await downloadReport('submittedApplications', page)
  await confirmColumnNames('submittedApplications', path)
})

test('Download application status updates report', async ({ page, miUser }) => {
  await signIn(page, miUser)
  await manageInformationReports(page)
  const path = await downloadReport('applicationStatusUpdates', page)
  await confirmColumnNames('applicationStatusUpdates', path)
})

test('Download un-submitted applications report', async ({ page, miUser }) => {
  await signIn(page, miUser)
  await manageInformationReports(page)
  const path = await downloadReport('unsubmittedApplications', page)
  await confirmColumnNames('unsubmittedApplications', path)
})
