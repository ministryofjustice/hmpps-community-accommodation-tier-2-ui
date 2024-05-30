import { Cas2Application as Application } from '../../../server/@types/shared/models/Cas2Application'
import Page from '../page'
import { nameOrPlaceholderCopy } from '../../../server/utils/utils'
import { FullPerson } from '../../../server/@types/shared/models/FullPerson'

export default class CancelPage extends Page {
  constructor(private readonly application: Application) {
    const person = application.person as FullPerson
    super(
      `Are you sure you would like to cancel ${nameOrPlaceholderCopy(application.person, 'this person')}'s application?`,
      person.name,
    )
  }

  hasGuidance(): void {
    cy.contains('Cancelling an application will remove all application data and cannot be undone.')
  }

  chooseYesOption = (): void => {
    this.checkRadioByNameAndValue('cancelYesOrNo', 'yes')
  }

  chooseNoOption = (): void => {
    this.checkRadioByNameAndValue('cancelYesOrNo', 'no')
  }
}
