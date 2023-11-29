import { Cas2StatusUpdate } from '@approved-premises/api'

export const applicationStatusRadios = (
  statuses: Array<Record<string, string>>,
  previousStatuses: Array<Cas2StatusUpdate>,
) => {
  return statuses.map(status => {
    return {
      value: status.name,
      text: status.label,
      hint: status.description ? { text: status.description } : null,
      checked: previousStatuses.length ? status.name === previousStatuses[0].name : false,
    }
  })
}
