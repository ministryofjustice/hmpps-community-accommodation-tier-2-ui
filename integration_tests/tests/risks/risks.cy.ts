import IndexPage from '../../pages'

context('Risks', () => {
  const crn = '1234'

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
        crn,
        oasysSections: riskData,
      })
    })
  })

  it('allows user to enter a CRN and see the first risk question data', () => {
    // Given I visit the start page
    IndexPage.visit()
    // And I click on the start button
    cy.get('[role="button"]').click()

    // Then I see the CRN form
    // And enter a valid CRN
    cy.get('#crn').type(crn)
    cy.get('button').contains('Save and continue').click()

    // Then I see the risks for that person
    cy.get('[id^=roshAnswers]').contains('Some answer for the first RoSH question')
  })
})
