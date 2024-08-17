import type { TaskListErrors } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToCheckboxItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'
import { getQuestions } from '../../../utils/questions'

const applicationQuestions = getQuestions('')['funding-information']['alternative-identification']

const alternativeIDOptions = applicationQuestions.alternativeIDDocuments.answers

export type AlternativeIdentificationBody = {
  alternativeIDDocuments: Array<keyof typeof alternativeIDOptions>
  other: string
}

@Page({
  name: 'alternative-identification',
  bodyProperties: ['alternativeIDDocuments', 'other'],
})
export default class AlternativeIdentification implements TaskListPage {
  documentTitle = 'What alternative identification documentation (ID) does the person have?'

  title

  personName = nameOrPlaceholderCopy(this.application.person)

  questions

  body: AlternativeIdentificationBody

  guidanceHtml = `The applicant needs ID if they are applying for Universal Credit for financial support, and Housing Benefit to cover their rent.<br /><br />If they want to receive an advance payment of Universal Credit on the day of release, they will need a bank account and photo ID.`

  hintHtml = `<div id="alternativeIDDocuments-hint" class="govuk-hint">
              ${applicationQuestions.alternativeIDDocuments.hint}
              </div>`

  constructor(
    body: Partial<AlternativeIdentificationBody>,
    private readonly application: Application,
  ) {
    this.questions = getQuestions(this.personName)['funding-information']['alternative-identification']
    this.title = this.questions.alternativeIDDocuments.question
  }

  previous() {
    return 'identification'
  }

  next() {
    return 'national-insurance'
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.alternativeIDDocuments) {
      errors.alternativeIDDocuments = errorLookups.alternativeIDDocuments.empty
    } else if (this.body.alternativeIDDocuments.includes('other') && !this.body.other) {
      errors.other = errorLookups.alternativeIDDocuments.other
    }
    return errors
  }

  items(conditionalHtml: string) {
    const workAndEmploymentOptions = (({ contract, tradeUnion, invoice, hmrc }) => ({
      contract,
      tradeUnion,
      invoice,
      hmrc,
    }))(alternativeIDOptions)

    const citizenshipOptions = (({
      citizenCard,
      foreignBirthCertificate,
      citizenCertificate,
      residenceCard,
      residencePermit,
      biometricResidencePermit,
      laRentCard,
    }) => ({
      citizenCard,
      foreignBirthCertificate,
      citizenCertificate,
      residenceCard,
      residencePermit,
      biometricResidencePermit,
      laRentCard,
    }))(alternativeIDOptions)

    const marriageOptions = (({ marriageCertificate, divorcePapers, dissolutionPapers }) => ({
      marriageCertificate,
      divorcePapers,
      dissolutionPapers,
    }))(alternativeIDOptions)

    const financialOptions = (({ buildingSociety, councilTax, insurance, chequeBook, mortgage, savingAccount }) => ({
      buildingSociety,
      councilTax,
      insurance,
      chequeBook,
      mortgage,
      savingAccount,
    }))(alternativeIDOptions)

    const studentOptions = (({ studentID, educationalInstitution, youngScot }) => ({
      studentID,
      educationalInstitution,
      youngScot,
    }))(alternativeIDOptions)

    const otherOptions = (({ deedPoll, vehicleRegistration, nhsCard, other }) => ({
      deedPoll,
      vehicleRegistration,
      nhsCard,
      other,
    }))(alternativeIDOptions)

    const noneOption = (({ none }) => ({
      none,
    }))(alternativeIDOptions)

    const otherItems = convertKeyValuePairToCheckboxItems(otherOptions, this.body.alternativeIDDocuments)

    const miscellaneousOther = otherItems.pop()

    return [
      { divider: 'Work and employment' },
      ...convertKeyValuePairToCheckboxItems(workAndEmploymentOptions, this.body.alternativeIDDocuments),
      { divider: 'Citizenship and nationality' },
      ...convertKeyValuePairToCheckboxItems(citizenshipOptions, this.body.alternativeIDDocuments),
      { divider: 'Marriage and civil partnership' },
      ...convertKeyValuePairToCheckboxItems(marriageOptions, this.body.alternativeIDDocuments),
      { divider: 'Financial' },
      ...convertKeyValuePairToCheckboxItems(financialOptions, this.body.alternativeIDDocuments),
      { divider: 'Young people and students' },
      ...convertKeyValuePairToCheckboxItems(studentOptions, this.body.alternativeIDDocuments),
      { divider: 'Other' },
      ...otherItems,
      { ...miscellaneousOther, conditional: { html: conditionalHtml } },
      { divider: 'or' },
      ...convertKeyValuePairToCheckboxItems(noneOption, this.body.alternativeIDDocuments),
    ]
  }

  onSave(): void {
    if (!this.body.alternativeIDDocuments.includes('other')) {
      delete this.body.other
    }
  }
}
