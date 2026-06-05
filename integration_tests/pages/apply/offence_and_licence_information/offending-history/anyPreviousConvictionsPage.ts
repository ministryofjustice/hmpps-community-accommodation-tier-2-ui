import { Cas2HdcApplication as Application } from '../../../../../server/@types/shared/models/Cas2HdcApplication'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import paths from '../../../../../server/paths/apply'

export default class AnyPreviousConvictionsPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super(
      `Does ${nameOrPlaceholderCopy(application.person)} have any previous unspent convictions?`,
      application,
      'offending-history',
      'any-previous-convictions',
    )
  }

  static visit(application: Application): void {
    cy.visit(
      paths.applications.pages.show({
        id: application.id,
        task: 'offending-history',
        page: 'any-previous-convictions',
      }),
    )
  }
}
