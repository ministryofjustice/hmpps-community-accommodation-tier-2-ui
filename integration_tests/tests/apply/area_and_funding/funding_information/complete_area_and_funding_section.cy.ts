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
//  Scenario: task completed successfully
//    Given I'm on the Funding information task page
//    When I select an option and choose to save and continue
//    Then I'm returned to the task list
//    And I see that the task is now complete

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import FundingSourcePage from '../../../../pages/apply/fundingSourcePage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit area and funding section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['funding-information'] = {}
      const application = applicationFactory.build({
        id: 'abc123',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('application')
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

  // Scenario: task completed successfully
  // -------------------------------------
  it('submits the valid form', function test() {
    // Given I'm on the Funding information task page
    cy.get('a').contains('Add funding information').click()
    const page = Page.verifyOnPage(FundingSourcePage, this.application)

    // When I select an option and click save and continue
    page.checkRadioByNameAndValue('fundingSource', 'personalSavings')

    // after submission of the valid form the API will return the answered question
    // -- note that the presence of the _page_ only is required in application.data
    //    to signify that the page is complete,
    //    apart from the eligibility question which must be answered
    const answered = {
      ...this.application,
      data: {
        'confirm-eligibility': {
          'confirm-eligibility': { isEligible: 'yes' },
        },
        'funding-information': {
          'funding-source': {},
        },
      },
    }
    cy.task('stubApplicationGet', { application: answered })

    page.clickSubmit()

    // Then I return to the task list
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // And I see that the task is now complete
    taskListPage.shouldShowTaskStatus('funding-information', 'Completed')
  })
})
