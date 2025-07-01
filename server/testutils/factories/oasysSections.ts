import { Factory } from 'fishery'
import { faker } from '@faker-js/faker/locale/en_GB'

import { OASysQuestion, OASysSections, OASysSupportingInformationQuestion } from '@approved-premises/api'
import { DateFormats } from '../../utils/dateUtils'
import oasysSelectionFactory from './oasysSelection'

export default Factory.define<OASysSections>(() => ({
  assessmentId: faker.number.int(),
  assessmentState: faker.helpers.arrayElement(['Completed', 'Incomplete']),
  dateStarted: DateFormats.dateObjToIsoDateTime(faker.date.past()),
  dateCompleted: DateFormats.dateObjToIsoDateTime(faker.date.recent()),
  offenceDetails: offenceDetailsFactory.buildList(5),
  roshSummary: roshSummaryFactory.buildList(5),
  supportingInformation: supportingInformationFactory.buildList(5),
  riskToSelf: riskToSelfFactory.buildList(5),
  riskManagementPlan: riskManagementPlanFactory.buildList(5),
}))

export const roshSummaryFactory = Factory.define<OASysQuestion>(options => ({
  questionNumber: options.sequence.toString(),
  label: faker.helpers.arrayElement([
    'Who is at risk',
    'What is the nature of the risk',
    'What circumstances are likely to reduce the risk',
  ]),
  answer: faker.lorem.paragraph(),
}))

export const offenceDetailsFactory = Factory.define<OASysQuestion>(options => ({
  questionNumber: options.sequence.toString(),
  label: faker.helpers.arrayElement([
    'Briefly describe the details of the offence(s)',
    'Others involved',
    'Identify issues related to the offence that contribute to the risk of offending and harm. Please include any positive factors',
    'Provide evidence of the motivation and triggers for the offending',
    'Provide details of the impact on the victim',
    'Victim Information',
    'Is there a pattern of offending? Consider details of previous unspent convictions',
  ]),
  answer: faker.lorem.paragraph(),
}))

export const supportingInformationFactory = Factory.define<OASysSupportingInformationQuestion>(options => {
  return oasysSelectionFactory.build({
    questionNumber: options.sequence.toString(),
  })
})

const riskManagementPlanFactory = Factory.define<OASysQuestion>(options => ({
  questionNumber: options.sequence.toString(),
  label: faker.helpers.arrayElement([
    'Key information about current situation',
    'Further considerations about current situation',
    'Supervision',
    'Monitoring and control',
    'Intervention and treatment',
    'Victim safety planning',
    'Contingency plans',
    'Additional comments',
  ]),
}))

export const riskToSelfFactory = Factory.define<OASysSupportingInformationQuestion>(options => {
  return oasysSelectionFactory.build({
    questionNumber: options.sequence.toString(),
    label: faker.helpers.arrayElement([
      'Current concerns of self harm and suicide',
      'Previous concerns of self harm and suicide',
      'Current concerns about coping in a hostel setting',
      'Previous concerns about coping in a hostel setting',
      'Risk of serious harm',
    ]),
  })
})
