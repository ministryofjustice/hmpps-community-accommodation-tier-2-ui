import { Factory } from 'fishery'
import { faker } from '@faker-js/faker/locale/en_GB'
import { OASysSupportingInformationQuestion } from '@approved-premises/api'

class OasysSelectionFactory extends Factory<OASysSupportingInformationQuestion> {
  needsLinkedToHarm() {
    return this.params({ linkedToHarm: true, linkedToReOffending: true })
  }

  needsLinkedToReoffending() {
    return this.params({ linkedToHarm: false, linkedToReOffending: true })
  }

  needsNotLinkedToReoffending() {
    return this.params({ linkedToHarm: false, linkedToReOffending: false })
  }
}

export default OasysSelectionFactory.define(({ params }) => ({
  section: faker.number.int({ min: 1, max: 20 }),
  label: faker.helpers.arrayElement([
    'accommodation',
    'relationships',
    'emotional',
    'thinking',
    'ete',
    'lifestyle',
    'health',
    'attitudes',
  ]),
  linkedToHarm: params.linkedToHarm ?? faker.datatype.boolean(),
  linkedToReOffending: params.linkedToReOffending ?? faker.datatype.boolean(),
  questionNumber: (params.questionNumber ?? faker.number.int()).toString(),
  answer: params.answer ?? faker.lorem.paragraph(),
}))
