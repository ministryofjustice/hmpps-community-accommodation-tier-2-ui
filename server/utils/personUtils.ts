import type { PersonStatus } from '@approved-premises/ui'

const statusTag = (status: PersonStatus): string => {
  if (status === 'InCommunity') {
    return `<strong class="govuk-tag" data-cy-status="${status}">In Community</strong>`
  }

  return `<strong class="govuk-tag" data-cy-status="${status}">In Custody</strong>`
}

const tierBadge = (tier: string): string => {
  if (!tier) return ''

  const colour = { A: 'moj-badge--red', B: 'moj-badge--purple' }[tier[0]]

  return `<span class="moj-badge ${colour}">${tier}</span>`
}

export { statusTag, tierBadge }
