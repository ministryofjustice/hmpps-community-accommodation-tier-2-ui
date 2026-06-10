import { faker } from '@faker-js/faker/locale/en_GB'
import { Factory } from 'fishery'
import { DateFormats } from '../../utils/dateUtils'
import { Cas2TimelineEvent } from '../../@types/shared/models/Cas2TimelineEvent'

export default Factory.define<Cas2TimelineEvent>(() => ({
  type: 'cas2_status_update',
  occurredAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
  label: 'More information requested',
  createdByName: 'CAS2 Assessor (NACRO)',
  body: 'More information requested body',
}))
