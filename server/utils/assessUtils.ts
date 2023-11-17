export const applicationStatusRadios = (statuses: Array<Record<string, string>>) => {
  return statuses.map(status => {
    return {
      value: status.name,
      text: status.label,
      hint: status?.description ? { text: status.description } : null,
    }
  })
}
