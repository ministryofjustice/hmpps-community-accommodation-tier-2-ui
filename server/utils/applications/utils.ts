import type { FormArtifact, FormPages, FormSections, JourneyType, PageResponse, TableRow } from '@approved-premises/ui'
import type {
  ApprovedPremisesApplication as Application,
  ApplicationStatus,
  ApprovedPremisesApplicationSummary as ApplicationSummary,
} from '@approved-premises/api'
import paths from '../../paths/apply'
import Apply from '../../form-pages/apply'
import { tierBadge } from '../personUtils'
import { DateFormats } from '../dateUtils'

const dashboardTableRows = (applications: Array<ApplicationSummary>): Array<TableRow> => {
  return applications.map(application => {
    const tier = application.risks?.tier?.value?.level

    return [
      createNameAnchorElement(application.person.name, application.id),
      textValue(application.person.crn),
      htmlValue(tier == null ? '' : tierBadge(tier)),
      textValue(
        application.arrivalDate ? DateFormats.isoDateToUIDate(application.arrivalDate, { format: 'short' }) : 'N/A',
      ),
      htmlValue(getStatus(application)),
    ]
  })
}

const statusTags: Record<ApplicationStatus, string> = {
  inProgress: `<strong class="govuk-tag govuk-tag--blue">In Progress</strong>`,
  requestedFurtherInformation: `<strong class="govuk-tag govuk-tag--yellow">Info Request</strong>`,
  submitted: `<strong class="govuk-tag">Submitted</strong>`,
  pending: `<strong class="govuk-tag govuk-tag--blue">Pending</strong>`,
  rejected: `<strong class="govuk-tag govuk-tag--red">Rejected</strong>`,
  awaitingPlacement: `<strong class="govuk-tag govuk-tag--blue">Awaiting Placement</strong>`,
  placed: `<strong class="govuk-tag govuk-tag--pink">Placed</strong>`,
  inapplicable: `<strong class="govuk-tag govuk-tag--red">Inapplicable</strong>`,
}

const getStatus = (application: ApplicationSummary): string => {
  return statusTags[application.status]
}

const textValue = (value: string) => {
  return { text: value }
}

const htmlValue = (value: string) => {
  return { html: value }
}

const createNameAnchorElement = (name: string, applicationId: string) => {
  return htmlValue(
    `<a href=${paths.applications.show({ id: applicationId })} data-cy-id="${applicationId}">${name}</a>`,
  )
}

export type ApplicationOrAssessmentResponse = Record<string, Array<PageResponse>>

export const getSections = (formArtifact: FormArtifact): FormSections => {
  return Apply.sections.slice(0, -1)
}

export const journeyPages = (journeyType: JourneyType): FormPages => {
  return Apply.pages
}

const firstPageOfApplicationJourney = (application: Application) => {
  return paths.applications.pages.show({ id: application.id, task: 'health-needs', page: 'substance-misuse' })
}

export { dashboardTableRows, firstPageOfApplicationJourney, getStatus, statusTags }
