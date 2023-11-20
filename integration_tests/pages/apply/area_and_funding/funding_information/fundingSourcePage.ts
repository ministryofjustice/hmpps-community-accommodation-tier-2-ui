import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import ApplyPage from '../../applyPage'

export default class FundingSourcePage extends ApplyPage {
  constructor(application: Application) {
    super(
      `How will ${nameOrPlaceholderCopy(application.person)} pay for their accommodation and service charge`,
      application,
      'funding-information',
      'funding-source',
    )
  }

  clickTaskListLink = (): void => {
    cy.get('a').contains('Back to tasklist').click()
  }
}
