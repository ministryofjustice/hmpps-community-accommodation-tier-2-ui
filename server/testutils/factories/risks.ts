import { Factory } from 'fishery'
import { faker } from '@faker-js/faker/locale/en_GB'

import type { PersonRisks, RiskEnvelopeStatus } from '@approved-premises/api'
import { RiskLevel, RiskTierLevel, TierLetter, TierNumber } from '@approved-premises/ui'
import { DateFormats } from '../../utils/dateUtils'

const riskLevels: Array<RiskLevel> = ['Low', 'Medium', 'High', 'Very High']
const riskEnvelopeStatuses: Array<RiskEnvelopeStatus> = ['retrieved', 'not_found', 'error']

export default Factory.define<PersonRisks>(() => ({
  crn: `C${faker.number.int({ min: 100000, max: 999999 })}`,
  roshRisks: roshRisksEnvelopeFactory.build(),
  mappa: mappaFactory.build(),
  flags: flagsFactory.build(),
  tier: tierEnvelopeFactory.build(),
}))

export const roshRisksEnvelopeFactory = Factory.define<PersonRisks['roshRisks']>(() => ({
  status: faker.helpers.arrayElement(riskEnvelopeStatuses),
  value: {
    overallRisk: faker.helpers.arrayElement(riskLevels),
    riskToChildren: faker.helpers.arrayElement(riskLevels),
    riskToPublic: faker.helpers.arrayElement(riskLevels),
    riskToKnownAdult: faker.helpers.arrayElement(riskLevels),
    riskToStaff: faker.helpers.arrayElement(riskLevels),
  },
}))

const mappaFactory = Factory.define<PersonRisks['mappa']>(() => ({
  status: faker.helpers.arrayElement(riskEnvelopeStatuses),
  value: { level: 'CAT 2 / LEVEL 1', lastUpdated: DateFormats.dateObjToIsoDate(faker.date.past()) },
}))

const flagsFactory = Factory.define<PersonRisks['flags']>(() => {
  return {
    status: faker.helpers.arrayElement(riskEnvelopeStatuses),
    value: faker.helpers.arrayElements([
      'Registered Sex Offender',
      'Hate Crime',
      'Non Registered Sex Offender',
      'Not MAPPA Eligible',
      'Sexual Harm Prevention Order/Sexual Risk Order',
      'Street Gangs',
      'Suicide/Self Harm',
      'Weapons',
    ]),
  }
})

const lettersFactory: () => TierLetter = () => faker.helpers.arrayElement<TierLetter>(['A', 'B', 'C', 'D'])
const numbersFactory: () => TierNumber = () => faker.helpers.arrayElement<TierNumber>(['1', '2', '3', '4'])

export const riskTierLevel: RiskTierLevel = `${lettersFactory()}${numbersFactory()}`

export const tierEnvelopeFactory = Factory.define<PersonRisks['tier']>(() => ({
  status: faker.helpers.arrayElement(riskEnvelopeStatuses),
  value: {
    level: riskTierLevel,
    lastUpdated: DateFormats.dateObjToIsoDate(faker.date.past()),
  },
}))
