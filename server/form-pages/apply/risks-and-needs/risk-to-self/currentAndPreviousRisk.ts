import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { getOasysImportDateFromApplication } from '../../../utils'
import { convertKeyValuePairToCheckboxItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'
import { getQuestions } from '../../../utils/questions'
import { DateFormats } from '../../../../utils/dateUtils'
import { hasOasys } from '../../../../utils/applicationUtils'

type CurrentAndPreviousRiskBody = { currentAndPreviousRiskDetail: string; confirmation: string }

@Page({
  name: 'current-and-previous-risk',
  bodyProperties: ['currentAndPreviousRiskDetail', 'confirmation'],
})
export default class CurrentAndPreviousRisk implements TaskListPage {
  documentTitle = "The person's current and previous risks"

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `${this.personName}'s current and previous risks`

  questions = getQuestions(this.personName)['risk-to-self']['current-and-previous-risk']

  body: CurrentAndPreviousRiskBody

  importDate = getOasysImportDateFromApplication(this.application, 'risk-to-self')

  hasOasysRecord: boolean

  constructor(
    body: Partial<CurrentAndPreviousRiskBody>,
    private readonly application: Application,
  ) {
    this.body = body as CurrentAndPreviousRiskBody
    this.hasOasysRecord = hasOasys(application, 'risk-to-self')
    this.populateFromLegacyRiskSections()
  }

  previous() {
    return 'vulnerability'
  }

  next() {
    return 'acct'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.currentAndPreviousRiskDetail) {
      errors.currentAndPreviousRiskDetail = `Describe ${this.personName}'s current and previous issues and needs related to self harm and suicide`
    }
    if (!this.body.confirmation) {
      errors.confirmation = errorLookups.oasysConfirmation.empty
    }

    return errors
  }

  items() {
    return convertKeyValuePairToCheckboxItems({ confirmed: this.questions.confirmation.question }, [
      this.body.confirmation,
    ])
  }

  response() {
    const oasysData = this.application.data?.['risk-to-self']?.['oasys-import']

    if (oasysData) {
      return {
        'OASys created': DateFormats.isoDateToUIDate(oasysData.oasysStartedDate, { format: 'medium' }),
        'OASys completed': oasysData.oasysCompletedDate
          ? DateFormats.isoDateToUIDate(oasysData.oasysCompletedDate, { format: 'medium' })
          : 'Unknown',
        'OASys imported': DateFormats.dateObjtoUIDate(oasysData.oasysImportedDate, { format: 'medium' }),
        [this.questions.currentAndPreviousRiskDetail.question]: this.body.currentAndPreviousRiskDetail,
        [this.questions.confirmation.question]: this.questions.confirmation.answers[this.body.confirmation],
      }
    }

    return {
      [this.questions.currentAndPreviousRiskDetail.question]: this.body.currentAndPreviousRiskDetail,
      [this.questions.confirmation.question]: this.questions.confirmation.answers[this.body.confirmation],
    }
  }

  populateFromLegacyRiskSections() {
    if (typeof this.body !== 'object' || this.body === null) {
      this.body = { currentAndPreviousRiskDetail: '', confirmation: '' }
    }

    if (!this.body.currentAndPreviousRiskDetail || this.body.currentAndPreviousRiskDetail.trim() === '') {
      const currentRisk = this.application.data?.['risk-to-self']?.['current-risk']?.currentRiskDetail || ''
      const historicalRisk = this.application.data?.['risk-to-self']?.['historical-risk']?.historicalRiskDetail || ''

      this.body.currentAndPreviousRiskDetail = [currentRisk, historicalRisk].filter(Boolean).join('\n\n')
    }
  }
}
