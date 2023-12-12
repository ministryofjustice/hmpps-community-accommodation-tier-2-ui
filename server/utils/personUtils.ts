import { FullPerson, Person } from '@approved-premises/api'
import { PersonStatus } from '@approved-premises/ui'

const statusTag = (status: PersonStatus): string => {
  if (status === 'InCommunity') {
    return `<strong class="govuk-tag" data-cy-status="${status}">In Community</strong>`
  }

  return `<strong class="govuk-tag" data-cy-status="${status}">In Custody</strong>`
}

const isPersonMale = (person: Person): boolean => {
  if (person.type === 'FullPerson' && (person as FullPerson).sex === 'Male') {
    return true
  }

  return false
}

export { statusTag, isPersonMale }
