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

export { preferredAreasFromAppData }
