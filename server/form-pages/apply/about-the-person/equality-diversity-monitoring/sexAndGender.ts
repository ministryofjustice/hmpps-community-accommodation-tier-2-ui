import type { Radio, TaskListErrors, YesOrNoOrPreferNotToSay } from '@approved-premises/ui'
import { Cas2Application as Application } from '@approved-premises/api'
import { Page } from '../../../utils/decorators'
import TaskListPage from '../../../taskListPage'
import { convertKeyValuePairToRadioItems } from '../../../../utils/formUtils'
import errorLookups from '../../../../i18n/en/errors.json'
import { nameOrPlaceholderCopy } from '../../../../utils/utils'

type SexAndGenderBody = {
  sex: 'female' | 'male' | 'preferNotToSay'
  gender: YesOrNoOrPreferNotToSay
  optionalGenderIdentity: string
}

export const sexOptions = {
  female: 'Female',
  male: 'Male',
  preferNotToSay: 'Prefer not to say',
}

const genderOptions = {
  yes: 'Yes',
  no: 'No',
  preferNotToSay: 'Prefer not to say',
}

@Page({
  name: 'sex-and-gender',
  bodyProperties: ['sex', 'gender', 'optionalGenderIdentity'],
})
export default class SexAndGender implements TaskListPage {
  documentTitle = "What is the person's sex?"

  personName = nameOrPlaceholderCopy(this.application.person)

  title = `Equality and diversity questions for ${this.personName}`

  heading = 'Sex and gender identity'

  questions = {
    sex: `What is ${this.personName}'s sex?`,
    gender: `Is the gender ${this.personName} identifies with the same as the sex registered at birth?`,
    optionalGenderIdentity: 'What is their gender identity? (optional)',
  }

  body: SexAndGenderBody

  constructor(
    body: Partial<SexAndGenderBody>,
    private readonly application: Application,
  ) {
    this.body = body as SexAndGenderBody
  }

  previous() {
    return 'disability'
  }

  next() {
    return 'sexual-orientation'
  }

  errors() {
    const errors: TaskListErrors<this> = {}
    if (!this.body.sex) {
      errors.sex = errorLookups.sexAndGender.sex
    }
    if (!this.body.gender) {
      errors.gender = errorLookups.sexAndGender.gender
    }
    return errors
  }

  response() {
    const response = {
      [this.questions.sex]: sexOptions[this.body.sex],
      [this.questions.gender]: genderOptions[this.body.gender],
      [this.questions.optionalGenderIdentity]: this.body.optionalGenderIdentity,
    }

    return response
  }

  sexItems() {
    return convertKeyValuePairToRadioItems(sexOptions, this.body.sex)
  }

  genderItems(optionalGenderIdentity: string) {
    const radioItems = convertKeyValuePairToRadioItems(genderOptions, this.body.gender) as [Radio]
    radioItems.forEach(item => {
      if (item.value === 'no') {
        item.conditional = { html: optionalGenderIdentity }
      }
    })
    return radioItems
  }
}
