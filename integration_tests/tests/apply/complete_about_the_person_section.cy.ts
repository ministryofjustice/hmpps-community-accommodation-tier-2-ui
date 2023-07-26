//  Feature: Referrer completes 'About the person' section
//    So that I can complete the 'About the person' section
//    As a referrer
//    I want to answer questions within that section of the task list
//
//  Scenario: Follows link from task list
//    Given there is a section with a task
//    And an application exists
//    And I am logged in
//    And I am viewing the application task list
//
//  Scenario: view task listed within the section
//    Then I see the task listed within the section
//    And I see that the task has not been started
//
//  Scenario: follow link to first task page
//    When I follow the link within the section
//    Then I'm on the expected task page
//    And the task list page has the expected question and answers
//
//  Scenario: answer is enforced
//    Given I'm on the 'Will answer equality questions?' task page
//    When I try to continue without answering the question
//    Then I see that an answer is required
//
//  Scenario: return to task list using the back button
//    Given I'm on the 'Will answer equality questions?' task page
//    When I use the back button
//    Then I'm on the task list page
//
//  Scenario: task completed successfully
//    Given I'm on the 'Will answer equality questions?' task page
//    When I select an option and choose to save and continue
//    Then I'm returned to the task list
//    And I see that the task is now complete

import Page from '../../pages/page'
import TaskListPage from '../../pages/apply/taskListPage'
import WillAnswerEqualityQuestionsPage from '../../pages/apply/willAnswerEqualityQuestionsPage'
import { personFactory, applicationFactory } from '../../../server/testutils/factories/index'

context('Visit "About the person" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      const application = applicationFactory.build({
        id: 'abc123',
        data: {
          'area-and-funding': {
            'funding-information': { fundingSource: 'personalSavings' },
          },
        },
        person,
      })
      application.data = applicationData
      cy.wrap(application).as('application')
      cy.wrap(application.data).as('applicationData')
    })
  })

  beforeEach(function test() {
    // And an application exists
    // -------------------------
    const newApplication = applicationFactory.build({
      id: 'abc123',
      data: {
        'area-and-funding': {
          'funding-information': { fundingSource: 'personalSavings' },
        },
      },
      person,
    })
    cy.task('stubApplicationGet', { application: newApplication })
    cy.task('stubApplicationUpdate', { application: newApplication })

    // Given I am logged in
    //---------------------
    cy.signIn()

    // And I am viewing the application
    // --------------------------------
    cy.visit('applications/abc123')
    Page.verifyOnPage(TaskListPage)
  })

  // Scenario: view task listed within the section
  // ----------------------------------------------
  it('shows the task listed within the section', () => {
    // I'm on the task list page
    cy.get('h2').contains('Application incomplete')

    // I see the expected SECTION
    cy.get('.app-task-list__section').contains('About the person')

    // I see the expected TASK
    cy.get('.app-task-list__task-name').contains('Complete equality and diversity monitoring')

    // And I should see that the task has not been started
    const taskListPage = Page.verifyOnPage(TaskListPage)
    taskListPage.shouldShowTaskStatus('about-the-person', 'Not started')
  })

  // Scenario: follow link to first task page
  // ----------------------------------------
  it('offers a link to the first page of the task', function test() {
    // When I follow the link within the section
    cy.get('a').contains('Complete equality and diversity monitoring').click()

    // Then I'm on the expected page
    const page = Page.verifyOnPage(WillAnswerEqualityQuestionsPage, this.application)

    // And I see the expected caption
    page.hasCaption()

    // And the page has the expected questions and answers
    page.hasQuestionsAndAnswers()

    // And I see that the section is optional
    page.isOptional()

    // And I see an explanation of the rationale for collecting this information
    page.hasRationale()
  })

  // Scenario: answer is enforced
  // ----------------------------
  it('enforces answer', function test() {
    // Given I'm on the 'Will answer equality questions' task page
    cy.get('a').contains('Complete equality and diversity monitoring').click()

    // I try to continue without making a choice
    cy.get('button').contains('Save and continue').click()

    // Then I see that an answer is required
    const page = new WillAnswerEqualityQuestionsPage(this.application)
    page.shouldShowErrorMessagesForFields(['willAnswer'])
  })

  // Scenario: return to task list using the back button
  //----------------------------------------------------
  it('takes me back to the task list page', function test() {
    // Given I'm on the 'Equality and diversity' task page
    cy.get('a').contains('Complete equality and diversity monitoring').click()

    // When I use the back button
    const page = Page.verifyOnPage(WillAnswerEqualityQuestionsPage, this.application)
    page.clickBack()

    // Then I'm on the task list page
    Page.verifyOnPage(TaskListPage)
  })

  // Scenario: task completed successfully
  // -------------------------------------
  it('submits the valid form', function test() {
    // Given I'm on the 'Equality and diversity' task page
    cy.get('a').contains('Complete equality and diversity monitoring').click()
    const page = Page.verifyOnPage(WillAnswerEqualityQuestionsPage, this.application)

    // When I select an option and click save and continue
    page.checkRadioButtonFromPageBody('willAnswer')

    // after submission of the valid form the API will return the answered question
    // -- note that the presence of the _page_ only is required in application.data
    //    to signify that the page is complete
    const answered = {
      ...this.application,
      data: {
        'area-and-funding': {
          'funding-information': {},
        },
        'about-the-person': {
          'will-answer-equality-questions': {},
        },
      },
    }
    cy.task('stubApplicationGet', { application: answered })

    page.clickSubmit()

    // Then I return to the task list
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // And I see that the task is now complete
    taskListPage.shouldShowTaskStatus('about-the-person', 'Completed')
  })
})
