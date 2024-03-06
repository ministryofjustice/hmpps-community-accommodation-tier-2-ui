import { Cas2Application as Application } from '@approved-premises/api'

const preferredAreasFromAppData = (application: Application): string => {
  const firstPreference: string = (application.data as Record<string, unknown>)?.['area-information']?.[
    'first-preferred-area'
  ]?.preferredArea

  const secondPreference: string = (application.data as Record<string, unknown>)?.['area-information']?.[
    'second-preferred-area'
  ]?.preferredArea

  return [firstPreference, secondPreference].filter(x => x).join(' | ')
}

const hdcEligibilityDateFromAppData = (application: Application): string => {
  const date: string = (application.data as Record<string, unknown>)?.['hdc-licence-dates']?.['hdc-licence-dates']
    ?.hdcEligibilityDate

  return date || null
}

const conditionalReleaseDateFromAppData = (application: Application): string => {
  const date: string = (application.data as Record<string, unknown>)?.['hdc-licence-dates']?.['hdc-licence-dates']
    ?.conditionalReleaseDate

  return date || null
}

const telephoneNumberFromAppData = (application: Application): string | null => {
  const telephoneNumber: string = (application.data as Record<string, unknown>)?.['referrer-details']?.[
    'contact-number'
  ]?.telephone

  return telephoneNumber || null
}

export {
  preferredAreasFromAppData,
  hdcEligibilityDateFromAppData,
  conditionalReleaseDateFromAppData,
  telephoneNumberFromAppData,
}
