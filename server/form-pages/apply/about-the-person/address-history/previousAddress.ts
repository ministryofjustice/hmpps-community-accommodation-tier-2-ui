import type { Radio, TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'

const applicationQuestions = getQuestions('')

const options = applicationQuestions['address-history']['previous-address'].hasPreviousAddress.answers

export const lastKnownKeys = [
  'howLong',
  'lastKnownAddressLine1',
  'lastKnownAddressLine2',
  'lastKnownTownOrCity',
  'lastKnownCounty',
  'lastKnownPostcode',
]

export const previousKeys = [
  'previousAddressLine1',
  'previousAddressLine2',
  'previousTownOrCity',
  'previousCounty',
  'previousPostcode',
]

export type PreviousAddressBody = {
  hasPreviousAddress: keyof typeof options
  previousAddressLine1: string
  previousAddressLine2?: string
  previousTownOrCity: string
  previousCounty?: string
  previousPostcode: string
  howLong: string
  lastKnownAddressLine1: string
  lastKnownAddressLine2?: string
  lastKnownTownOrCity: string
  lastKnownCounty?: string
  lastKnownPostcode: string
}

@Page({
  name: 'previous-address',
  bodyProperties: ['hasPreviousAddress', ...previousKeys, ...lastKnownKeys],
})
export default class PreviousAddress implements TaskListPage {
  documentTitle = 'Did the person have a previous address before entering custody?'

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Did ${this.personName} have a previous address before entering custody?`

  questions = getQuestions(this.personName)['address-history']['previous-address']

  addressLabels = {
    addressLine1: 'Address line 1',
    addressLine2: 'Address line 2',
    addressLine2Optional: 'Address line 2 (optional)',
    townOrCity: 'Town or city',
    county: 'County',
    countyOptional: 'County (optional)',
    postcode: 'Postcode',
  }

  body: PreviousAddressBody

  constructor(
    body: Partial<PreviousAddressBody>,
    private readonly application: Application,
  ) {}

  previous() {
    return 'taskList'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.hasPreviousAddress) {
      errors.hasPreviousAddress = errorLookups.hasPreviousAddress.empty
    }

    if (this.body.hasPreviousAddress === 'yes') {
      if (!this.body.previousAddressLine1) {
        errors.previousAddressLine1 = errorLookups.addressLine1.empty
      }
      if (!this.body.previousTownOrCity) {
        errors.previousTownOrCity = errorLookups.townOrCity.empty
      }
      if (!this.body.previousPostcode) {
        errors.previousPostcode = errorLookups.postCode.empty
      }
    }

    if (this.body.hasPreviousAddress === 'no' && !this.body.howLong) {
      errors.howLong = 'Enter how long the person has had no fixed address'
    }

    return errors
  }

  items(knownAddress: string, lastKnownAddress: string) {
    const items = convertKeyValuePairToRadioItems(options, this.body.hasPreviousAddress) as [Radio]

    items.forEach(item => {
      if (item.value === 'yes') {
        item.conditional = {
          html: knownAddress,
        }
      }
      if (item.value === 'no') {
        item.conditional = {
          html: lastKnownAddress,
        }
      }
    })

    return items
  }

  response(): Record<string, string> {
    const response = {}

    const answerData: PreviousAddressBody = this.application.data?.['address-history']?.['previous-address']

    if (answerData) {
      response[this.questions.hasPreviousAddress.question] =
        this.questions.hasPreviousAddress.answers[answerData.hasPreviousAddress]

      let address = ''
      if (answerData.hasPreviousAddress === 'yes') {
        previousKeys.forEach(key => {
          address += `${answerData[key]}\r\n`
        })
        response[this.questions.knownAddress.question] = address
      } else if (answerData.hasPreviousAddress === 'no') {
        response[this.questions.howLong.question] = answerData.howLong

        lastKnownKeys.slice(1).forEach(key => {
          if (answerData[key]) {
            address += `${answerData[key]}\r\n`
          }
        })

        response[this.questions.lastKnownAddress.question] = address || 'Not applicable'
      }
    }

    return response
  }
}
