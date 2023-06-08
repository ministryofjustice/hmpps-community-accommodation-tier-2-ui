import paths from '../../../server/paths/apply'
import { applicationFactory, personFactory } from '../../../server/testutils/factories/index'
import Page from '../../pages/page'
import NewApplicationPage from '../../pages/apply/new'

context('Risks', () => {
  const person = personFactory.build({})

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  beforeEach(() => {
    // Given I am logged in
    cy.signIn()
    // and there is Oasys data
    cy.fixture('oasysSections.json').then(riskData => {
      cy.task('stubOasysSections', {
        crn: person.crn,
        oasysSections: riskData,
      })
    })
  })

  describe('when I click the save and continue button', () => {
    it('creates a new application', () => {
      const application = applicationFactory.build({})
      cy.task('stubCreateApplication', { application })

      // given I am on the risks page
      cy.visit(paths.applications.show({ crn: person.crn }))

      // when I click the save and continue button
      cy.task('stubApplications', [application])
      cy.get('button').click()

      // then I should be redirected back to the new page
      Page.verifyOnPage(NewApplicationPage)
    })
  })
})
