//  Feature: Referrer confirms applicant details and creates application
//    So that I can create an application
//    As a referrer
//    I want to see the details of an applicant
//
//  Scenario: confirm details
//      Given I am on the 'confirm applicant details' page
//      When I confirm these are the correct details
//      Then I am taken to the eligibility page
//
//  Scenario: error when creating an application
//      Given I am on the 'confirm applicant details' page
//      When I confirm these are the correct details
//      And there is a server error
//      Then I see an error message

import ConfirmApplicantPage from '../../pages/apply/confirmApplicantPage'
import FindByPrisonNumberPage from '../../pages/apply/findByPrisonNumberPage'
import ConfirmEligibilityPage from '../../pages/apply/confirmEligibilityPage'
import { applicationFactory } from '../../../server/testutils/factories/index'
import Page from '../../pages/page'
import { fullPersonFactory } from '../../../server/testutils/factories/person'

context('Find by prison number', () => {
  const person = fullPersonFactory.build({ name: 'Roger Smith', nomsNumber: '123' })
  const application = applicationFactory.build({ person })

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  beforeEach(() => {
    // Given I am logged in
    cy.signIn()

    cy.task('stubCreateApplication', { application })
    cy.task('stubApplicationGet', { application })
  })

  //  Scenario: Scenario: confirm details
  // ----------------------------------------------
  it('Continues to "Confirm applicant details" section (before task list)', () => {
    //      Given I am on the 'confirm applicant details' page
    const prisonNumberPage = FindByPrisonNumberPage.visit(person.name)
    cy.task('stubFindPerson', { person })
    prisonNumberPage.getTextInputByIdAndEnterDetails('prisonNumber', person.nomsNumber)
    prisonNumberPage.clickSubmit()

    const confirmationPage = Page.verifyOnPage(ConfirmApplicantPage, person.name)
    confirmationPage.hasApplicantDetails(person)

    //  When I confirm these are the correct detaiks

    confirmationPage.clickSubmit()

    //      Then I am taken to the eligibility page
    Page.verifyOnPage(ConfirmEligibilityPage, application)
  })

  //  Scenario: error when creating an application
  //      Given I am on the 'confirm applicant details' page
  //      When I confirm these are the correct details
  //      And there is a server error
  //      Then I see an error message
  it('Shows an error when an application has not been created successfully', () => {
    //      Given I am on the 'confirm applicant details' page
    const prisonNumberPage = FindByPrisonNumberPage.visit(person.name)
    cy.task('stubFindPerson', { person })
    prisonNumberPage.getTextInputByIdAndEnterDetails('prisonNumber', person.nomsNumber)
    prisonNumberPage.clickSubmit()

    const confirmationPage = Page.verifyOnPage(ConfirmApplicantPage, person.name)
    //      When I confirm these are the correct details
    cy.task('stubCreateApplicationServerError', { application })
    confirmationPage.clickSubmit()

    //      And there is a server error
    //      Then I see an error message
    confirmationPage.hasErrorDetails()
  })
})
