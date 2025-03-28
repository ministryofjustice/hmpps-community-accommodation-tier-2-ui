import { faker } from '@faker-js/faker/locale/en_GB'
import { Factory } from 'fishery'
import { Cas2TimelineEvent, TimelineEventType } from '@approved-premises/api'
import { DateFormats } from '../../utils/dateUtils'

const timelineEventTypes: TimelineEventType[] = [
  'cas2_application_submitted',
  'cas2_note',
  'cas2_status_update',
  'cas2_prison_transfer',
  'cas2_new_pom_assigned',
]

export default Factory.define<Cas2TimelineEvent>(() => ({
  type: faker.helpers.arrayElement(timelineEventTypes),
  occurredAt: DateFormats.dateObjToIsoDateTime(faker.date.past()),
  label: 'More information requested',
  createdByName: 'CAS2 Assessor (NACRO)',
  body: 'More information requested body',
}))
