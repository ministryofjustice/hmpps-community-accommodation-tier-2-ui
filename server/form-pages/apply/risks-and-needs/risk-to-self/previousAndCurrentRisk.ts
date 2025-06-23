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

type PreviousAndCurrentRiskBody = { previousAndCurrentRiskDetail: string; confirmation: string }

@Page({
  name: 'previous-and-current-risk',
  bodyProperties: ['previousAndCurrentRiskDetail', 'confirmation'],
})
export default class PreviousAndCurrentRisk implements TaskListPage {
  documentTitle = "The person's previous and current risks"

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `${this.personName}'s previous and current risks`

  questions = getQuestions(this.personName)['risk-to-self']['previous-and-current-risk']

  body: PreviousAndCurrentRiskBody

  importDate = getOasysImportDateFromApplication(this.application, 'risk-to-self')

  hasOasysRecord: boolean

  constructor(
    body: Partial<PreviousAndCurrentRiskBody>,
    private readonly application: Application,
  ) {
    this.body = body as PreviousAndCurrentRiskBody
    this.hasOasysRecord = hasOasys(application, 'risk-to-self')
  }

  previous() {
    return 'vulnerability'
  }

  next() {
    return 'acct'
  }

  errors() {
    const errors: TaskListErrors<this> = {}

    if (!this.body.previousAndCurrentRiskDetail) {
      errors.previousAndCurrentRiskDetail = `Describe ${this.personName}'s previous and current issues and needs related to self harm and suicide`
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
        [this.questions.previousAndCurrentRiskDetail.question]: this.body.previousAndCurrentRiskDetail,
        [this.questions.confirmation.question]: this.questions.confirmation.answers[this.body.confirmation],
      }
    }

    return {
      [this.questions.previousAndCurrentRiskDetail.question]: this.body.previousAndCurrentRiskDetail,
      [this.questions.confirmation.question]: this.questions.confirmation.answers[this.body.confirmation],
    }
  }
}
