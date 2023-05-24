import IndexPage from '../../pages'
import { personFactory } from '../../../server/testutils/factories/index'

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

  it('allows user to enter a CRN and see the first risk question data', () => {
    // Given I visit the start page
    IndexPage.visit()
    // And I click on the start button
    cy.get('[role="button"]').click()

    // Then I see the CRN form
    // And enter a valid CRN
    cy.task('stubFindPerson', {
      person,
    })
    cy.get('#crn').type(person.crn)
    cy.get('button').contains('Save and continue').click()

    // Then I see the risks for that person
    cy.get('[id^=roshAnswers]').contains('Some answer for the first RoSH question')
  })

  it('renders with an empty CRN error if the CRN is not entered', () => {
    // Given I visit the start page
    IndexPage.visit()
    // And I click on the start button
    cy.get('[role="button"]').click()

    // Then I see the CRN form
    // And I click submit without entering a CRN
    cy.get('button').contains('Save and continue').click()

    // Then I see an error message
    cy.get('.govuk-error-summary').should('contain', `You must enter a CRN`)
    cy.get(`[data-cy-error-crn]`).should('contain', `You must enter a CRN`)
  })

  it('renders with a CRN not found error if the API returns a 404', () => {
    // Given I visit the start page
    IndexPage.visit()
    // And I click on the start button
    cy.get('[role="button"]').click()

    // Then I see the CRN form
    // And enter a CRN
    cy.task('stubPersonNotFound', {
      person,
    })
    cy.get('#crn').type(person.crn)
    cy.get('button').contains('Save and continue').click()

    // Then I see an error message
    cy.get('.govuk-error-summary').should('contain', `No person with a CRN of '${person.crn}' was found`)
    cy.get(`[data-cy-error-crn]`).should('contain', `No person with a CRN of '${person.crn}' was found`)
  })

  it('renders with an authorisation error if the API returns a 403', () => {
    // Given I visit the start page
    IndexPage.visit()
    // And I click on the start button
    cy.get('[role="button"]').click()

    // Then I see the CRN form
    // And enter a valid CRN
    cy.task('stubFindPersonForbidden', {
      person,
    })
    cy.get('#crn').type(person.crn)
    cy.get('button').contains('Save and continue').click()

    // Then I see an error message
    cy.get('.govuk-error-summary').should('contain', `You do not have permission to access this CRN`)
    cy.get(`[data-cy-error-crn]`).should('contain', `You do not have permission to access this CRN`)
  })
})
