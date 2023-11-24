//  Feature: Referrer completes area and funding section
//    So that I can complete the area and funding section
//    As a referrer
//    I want to answer questions within that section of the task list
//
//  Scenario: Follows link from task list
//    Given there is a section with a task
//    And an application exists
//    And I am logged in
//    And I am viewing the application task list
//
//  Scenario: view task status
//    Then I see that the task has not been started
//
//  Scenario: follow link to first task page
//    When I follow the link within the section
//    Then I'm on the expected task page
//    And the task list page has the expected question and answers
//
//  Scenario: answer is enforced
//    Given I'm on the Funding information task page
//    When I try to continue without answering the question
//    Then I see that an answer is required
//
//  Scenario: return to task list using the back button
//    Given I'm on the Funding information task page
//    When I use the back button
//    Then I'm on the task list page
//
//  Scenario: return to task list using the 'Back to task list' link
//    Given I'm on the Funding information task page
//    When I use the 'Back to task list' link
//    Then I'm on the task list page
//
//  Scenario: navigate to national insurance number page
//    Given I'm on the Funding information task page
//    When I select personal savings and click save and continue
//    Then I am redirected to the National Insurance page
//
//  Scenario: navigate to identification page
//    Given I'm on the Funding information task page
//    When I select benefits and click save and continue
//    Then I am redirected to the identification page
//
//  Scenario: If I select personal savings, then any ID answers are deleted
//    Given I'm on the Funding information page
//    When I select personal savings
//    Then any ID answers are deleted

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import FundingSourcePage from '../../../../pages/apply/area_and_funding/funding_information/fundingSourcePage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import NationalInsurancePage from '../../../../pages/apply/area_and_funding/funding_information/nationalInsurancePage'
import IdentificationPage from '../../../../pages/apply/area_and_funding/funding_information/identificationPage'

context('Visit area and funding section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['funding-information']
      const application = applicationFactory.build({
        id: 'abc123',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('application')
      cy.wrap(application).as('applicationData')
    })

    cy.fixture('applicationData.json').then(applicationData => {
      const application = applicationFactory.build({
        id: 'abc123',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('applicationWithData')
    })
  })

  beforeEach(function test() {
    // And an application exists
    // -------------------------
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    // Given I am logged in
    //---------------------
    cy.signIn()

    // And I am viewing the application
    // --------------------------------
    cy.visit('applications/abc123')
    Page.verifyOnPage(TaskListPage)
  })

  // Scenario: view task status
  // ----------------------------------------------
  it('shows the task listed within the section', () => {
    // I see that the task has not been started
    const taskListPage = Page.verifyOnPage(TaskListPage)
    taskListPage.shouldShowTaskStatus('funding-information', 'Not started')
  })

  // Scenario: follow link to first task page
  // ----------------------------------------
  it('offers a link to the first page of the task', function test() {
    // When I follow the link within the section
    cy.get('a').contains('Add funding information').click()

    // Then I'm on the expected page
    Page.verifyOnPage(FundingSourcePage, this.application)

    // And the task list page has the expected questions and answers
    // ------------------------------------------------------------
    // And I see the expected question
    cy.get('h1').contains('How will Roger Smith pay for their accommodation and service charge')

    // And I see the expected answers
    cy.get('label').contains('Personal money or savings')
    cy.get('label').contains('Benefits')
    cy.get('.govuk-hint.govuk-radios__hint').contains(
      'This includes Housing Benefit and Universal Credit, Disability Living Allowance, and Employment and Support Allowance',
    )
  })

  // Scenario: answer is enforced
  // ----------------------------
  it('enforces answer', function test() {
    // Given I'm on the Funding information task page
    cy.get('a').contains('Add funding information').click()

    // I try to continue without making a choice
    cy.get('button').contains('Save and continue').click()

    // Then I see that an answer is required
    const fundingInfoPage = new FundingSourcePage(this.application)
    fundingInfoPage.shouldShowErrorMessagesForFields(['fundingSource'])
  })

  // Scenario: return to task list using the back button
  //----------------------------------------------------
  it('takes me back to the task list page', function test() {
    // Given I'm on the Funding information task page
    cy.get('a').contains('Add funding information').click()

    // When I use the back button
    const page = Page.verifyOnPage(FundingSourcePage, this.application)
    page.clickBack()

    // Then I'm on the task list page
    Page.verifyOnPage(TaskListPage)
  })

  //  Scenario: return to task list using the 'Back to task list' link
  it('link takes me to the task list page', function test() {
    // Given I'm on the Funding information task page
    cy.get('a').contains('Add funding information').click()

    // When I use the 'Back to task list' link
    const page = Page.verifyOnPage(FundingSourcePage, this.application)
    page.clickTaskListLink()

    // Then I'm on the task list page
    Page.verifyOnPage(TaskListPage)
  })

  // Scenario: navigate to national insurance number page
  // -------------------------------------
  it('entering personal savings redirects to national insurance number page', function test() {
    // Given I'm on the Funding information task page
    cy.get('a').contains('Add funding information').click()
    const page = Page.verifyOnPage(FundingSourcePage, this.application)

    // When I select personal savings and click save and continue
    page.checkRadioByNameAndValue('fundingSource', 'personalSavings')
    page.clickSubmit()

    // Then I am redirected to the National Insurance page
    Page.verifyOnPage(NationalInsurancePage, this.application)
  })

  // Scenario: navigate to identification page
  // -------------------------------------
  it('entering benefits redirects to identification page', function test() {
    // Given I'm on the Funding information task page
    cy.get('a').contains('Add funding information').click()
    const page = Page.verifyOnPage(FundingSourcePage, this.application)

    // When I select benefits and click save and continue
    page.checkRadioByNameAndValue('fundingSource', 'benefits')
    page.clickSubmit()

    // Then I am redirected to the identification page
    Page.verifyOnPage(IdentificationPage, this.application)
  })

  // Scenario: If I select personal savings, then any ID answers are deleted
  // -------------------------------------
  it('entering personal savings deletes any ID answers', function test() {
    cy.task('stubApplicationGet', { application: this.applicationWithData })
    // Given I'm on the Funding information task page
    cy.get('a').contains('Add funding information').click()
    const page = Page.verifyOnPage(FundingSourcePage, this.application)

    // When I select personal savings and click save and continue
    page.checkRadioByNameAndValue('fundingSource', 'personalSavings')
    page.clickSubmit()

    // Then any ID answers are deleted

    cy.task('verifyApplicationUpdate', this.application.id).then(requests => {
      expect(requests).to.have.length(1)

      const body = JSON.parse(requests[0].body)

      expect(body.data['funding-information']['funding-source'].fundingSource).to.equal('personalSavings')

      expect(body.data['funding-information']).to.have.keys('funding-source', 'national-insurance')
    })
  })
})
