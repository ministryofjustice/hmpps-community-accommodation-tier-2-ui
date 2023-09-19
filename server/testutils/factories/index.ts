import oasysSectionsFactory, { roshSummaryFactory } from './oasysSections'
import oasysSelectionFactory from './oasysSelection'
import oasysRiskToSelfFactory from './oasysRiskToSelf'
import { fullPersonFactory as personFactory, restrictedPersonFactory } from './person'
import applicationFactory from './application'
import applicationSummaryFactory from './applicationSummary'
import risksFactory, { roshRisksEnvelopeFactory } from './risks'
import oasysRoshFactory from './oasysRosh'

export {
  applicationSummaryFactory,
  oasysSectionsFactory,
  oasysSelectionFactory,
  oasysRiskToSelfFactory,
  oasysRoshFactory,
  roshSummaryFactory,
  applicationFactory,
  personFactory,
  restrictedPersonFactory,
  risksFactory,
  roshRisksEnvelopeFactory,
}
