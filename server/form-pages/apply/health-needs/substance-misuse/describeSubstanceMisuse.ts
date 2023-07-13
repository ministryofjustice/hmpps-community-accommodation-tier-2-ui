import type { TaskListErrors, YesOrNo } from '@approved-premises/ui'
import { Page } from '../../../utils/decorators'
import TasklistPage from '../../../tasklistPage'
import { sentenceCase } from '../../../../utils/utils'

type DescribeSubstanceMisuseBody = {
  substancesYesNo: YesOrNo
  substancesHistory: string
  engagedWithServiceYesNo: string
  engagedWithServiceDetail: string
}

@Page({
  name: 'substance-misuse',
  bodyProperties: ['substancesYesNo', 'substancesHistory', 'engagedWithServiceYesNo', 'engagedWithServiceDetail'],
})
export default class DescribeSubstanceMisuse implements TasklistPage {
  title = 'Substance misuse'

  questions = {
    substancesYesNo: 'Does this person misuse substances?',
    substancesHistory: 'Describe their recent history of substance misuse',
    engagedWithServiceYesNo: 'Are they engaged with a drug and alcohol service?',
    engagedWithServiceDetail: 'Name the services with which they are engaged',
  }

  body: DescribeSubstanceMisuseBody

  constructor(body: Partial<DescribeSubstanceMisuseBody>) {
    // if (body.alternativeRadiusAccepted === 'yes') {
    //   this.body = body as SubstanceMisuseBody
    // } else {
    //   delete body.alternativeRadius
    //   this.body = body as SubstanceMisuseBody
    // }
    // this.body.postcodeArea = body?.postcodeArea?.toUpperCase()

    this.body = body as DescribeSubstanceMisuseBody
  }

  previous() {
    return 'dashboard'
  }

  next() {
    return ''
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    // if (!this.body.postcodeArea) {
    //   errors.postcodeArea = 'You must specify a preferred postcode area for the placement'
    // } else if (!validPostcodeArea(this.body.postcodeArea)) {
    //   errors.postcodeArea = 'The preferred postcode area must be a valid postcode area (i.e SW1A)'
    // }

    // if (!this.body.restrictions) {
    //   errors.restrictions = 'You must specify if there are any restrictions linked to placement location'
    // }

    // if (this.body.restrictions === 'yes' && !this.body.restrictionDetail) {
    //   errors.restrictionDetail = 'You must provide details of any restrictions linked to placement location'
    // }

    // if (!this.body.alternativeRadiusAccepted) {
    //   errors.alternativeRadiusAccepted =
    //     'You must specify if a placement in an alternative locality would be considered'
    // }

    // if (this.body.alternativeRadiusAccepted === 'yes' && !this.body.alternativeRadius) {
    //   errors.alternativeRadius = 'You must choose an alternative radius'
    // }

    return errors
  }

  response() {
    const response = {
      [this.questions.substancesYesNo]: sentenceCase(this.body.substancesYesNo),
      [this.questions.substancesHistory]: this.body.substancesHistory,
      [this.questions.engagedWithServiceYesNo]: sentenceCase(this.body.engagedWithServiceYesNo),
      [this.questions.engagedWithServiceDetail]: this.body.engagedWithServiceDetail,
    }

    Object.keys(response).forEach(key => {
      if (!response[key]) {
        delete response[key]
      }
    })

    return response
  }

}
