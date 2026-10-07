import { Page, expect } from '@playwright/test'
import Excel, { CellValue } from 'exceljs'

const reportTypeMetaData = {
  submittedApplications: {
    columnNames: [
      'eventId',
      'applicationId',
      'personCrn',
      'personNoms',
      'referringPrisonCode',
      'preferredAreas',
      'hdcEligibilityDate',
      'conditionalReleaseDate',
      'submittedAt',
      'submittedBy',
      'startedAt',
    ],
    callToAction: "Download 'Submitted applications' report",
  },
  applicationStatusUpdates: {
    columnNames: ['eventId', 'applicationId', 'personCrn', 'personNoms', 'updatedBy', 'updatedAt', 'newStatus'],
    callToAction: "Download 'Application status updates' report",
  },
  unsubmittedApplications: {
    columnNames: ['applicationId', 'personCrn', 'personNoms', 'startedBy', 'startedAt'],
    callToAction: "Download 'Un-submitted applications' report",
  },
}

type ReportType = keyof typeof reportTypeMetaData

export const manageInformationReports = async (page: Page) => {
  await page.goto('/reports')
  await expect(page.locator('h1')).toContainText('Management information reports')
}

export const downloadReport = async (reportType: ReportType, page: Page) => {
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: reportTypeMetaData[reportType].callToAction }).click()
  const download = await downloadPromise
  const path = await download.path()
  return path
}

export const confirmColumnNames = async (reportType: ReportType, path: string) => {
  const workbook = new Excel.Workbook()

  await workbook.xlsx.readFile(path).then(() => {
    const sh = workbook.getWorksheet('Sheet0')

    const headerCells: CellValue[] = []
    sh.getRow(1).eachCell(cell => headerCells.push(cell.value))

    reportTypeMetaData[reportType].columnNames.forEach(columnName => {
      expect(headerCells.includes(columnName)).toBe(true)
    })
  })
}
