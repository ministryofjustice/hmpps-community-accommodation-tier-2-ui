//  Feature: Referrer enters CRN of applicant to begin application process
//    So that I can create an application
//    As a referrer
//    I want to enter the CRN of the applicant and see that the correct person is returned
//
//  Scenario: follow link from applications dashboard
//    Given I'm on the applications dashboard
//    And I click the link to start a new application
//    Then I'm on the Enter CRN page
//
//  Scenario: enter a CRN and continue to the task list for the new application
//    Given I'm on the enter CRN page
//    When I enter an existing CRN
//    And I click save and continue
//    Then I'm on the task list page
//
//  Scenario: answer is enforced
//    Given I'm on the enter CRN page
//    When I click continue without entering a CRN
//    Then I that an answer is required
//
//  Scenario: enter a CRN that can't be found
//    Given I'm on the enter CRN page
//    When I enter a CRN that can't be found
//    Then I see a not found error message
//
//  Scenario: enter a CRN for a person I'm not authorised to view
//    Given I'm on the enter CRN page
//    When I enter a CRN for a person I'm not authorised to view
//    Then I see an unathorised error message

import { Cas2Application as Application } from '@approved-premises/api'
import { personFactory, applicationFactory } from '../../../server/testutils/factories/index'
import Page from '../../pages/page'
import CRNPage from '../../pages/apply/crnPage'
import ListPage from '../../pages/apply/list'
import TaskListPage from '../../pages/apply/taskListPage'

context('Find by CRN', () => {
  const person = personFactory.build({})
  const applications = applicationFactory.buildList(3) as Array<Application>

  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')
  })

  beforeEach(() => {
    // Given I am logged in
    cy.signIn()

    // and there are existing applications
    cy.task('stubApplications', applications)
  })

  //  Scenario: follow link from applications dashboard
  // ----------------------------------------------
  it('start new application button takes me to the enter CRN page', () => {
    // I'm on the applications dashboard
    ListPage.visit([])

    // I click the link to start a new application
    cy.get('a').contains('Start a new application').click()

    // I'm on the Enter CRN page
    Page.verifyOnPage(CRNPage)
  })

  //  Scenario: enter a CRN and continue to the task list for the new application
  // ----------------------------------------------
  it('creates an application and continues to the task list page', () => {
    // I'm on the enter CRN page
    const page = CRNPage.visit()

    // I enter an existing CRN
    page.getTextInputByIdAndEnterDetails('crn', person.crn)
    cy.task('stubFindPerson', { person })
    const application = applicationFactory.build({ person })
    cy.task('stubCreateApplication', { application })
    cy.task('stubApplicationGet', { application })

    // I click save and continue
    page.clickSubmit()

    // Then I'm on the task list page
    Page.verifyOnPage(TaskListPage)
  })

  //  Scenario: answer is enforced
  // ----------------------------------------------
  it('enforces an enswer', () => {
    // I'm on the enter CRN page
    const page = CRNPage.visit()

    // I click continue without entering a CRN
    page.clickSubmit()

    // Then I see an error message
    cy.get('.govuk-error-summary').should('contain', `You must enter a CRN`)
    cy.get(`[data-cy-error-crn]`).should('contain', `You must enter a CRN`)
  })

  //  Scenario: enter a CRN that can't be found
  // ----------------------------------------------
  it('renders with a CRN not found error', () => {
    // I'm on the enter CRN page
    const page = CRNPage.visit()

    // I enter a CRN that can't be found
    page.getTextInputByIdAndEnterDetails('crn', person.crn)
    cy.task('stubPersonNotFound', { person })
    page.clickSubmit()

    // I see a not found error message
    cy.get('.govuk-error-summary').should('contain', `No person with a CRN of '${person.crn}' was found`)
    cy.get(`[data-cy-error-crn]`).should('contain', `No person with a CRN of '${person.crn}' was found`)
  })

  //  Scenario: enter a CRN for a person I'm not authorised to view
  // ----------------------------------------------
  it('renders with an unauthorised error', () => {
    // I'm on the enter CRN page
    const page = CRNPage.visit()

    // I enter a CRN that can't be found
    cy.task('stubFindPersonForbidden', {
      person,
    })
    cy.get('#crn').type(person.crn)
    page.clickSubmit()

    // I see an unathorised error message
    cy.get('.govuk-error-summary').should('contain', `You do not have permission to access this CRN`)
    cy.get(`[data-cy-error-crn]`).should('contain', `You do not have permission to access this CRN`)
  })
})
