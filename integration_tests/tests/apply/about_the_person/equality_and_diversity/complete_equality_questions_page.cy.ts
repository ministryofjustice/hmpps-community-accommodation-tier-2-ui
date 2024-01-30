//  Feature: Referrer completes 'Equality questions' page
//    So that I can complete the first page of the Equality and Diversity task
//    As a referrer
//    I want to answer the questions on that page
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
//    When I select 'yes' and continue
//    Then I'm on the disability task page

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import {
  DisabilityPage,
  WillAnswerEqualityQuestionsPage,
} from '../../../../pages/apply/about_the_person/equality_and_diversity'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "About the applicant" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['equality-and-diversity-monitoring'] = {}
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
    taskListPage.shouldShowTaskStatus('equality-and-diversity-monitoring', 'Not yet started')
  })

  // Scenario: follow link to first task page
  // ----------------------------------------
  it('offers a link to the first page of the task', function test() {
    // When I follow the link within the section
    cy.get('a').contains('Add equality and diversity monitoring information').click()

    // Then I'm on the expected page
    const page = Page.verifyOnPage(WillAnswerEqualityQuestionsPage, this.application)

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
    cy.get('a').contains('Add equality and diversity monitoring information').click()

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
    cy.get('a').contains('Add equality and diversity monitoring information').click()

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
    cy.get('a').contains('Add equality and diversity monitoring information').click()
    const page = Page.verifyOnPage(WillAnswerEqualityQuestionsPage, this.application)

    // When I select the 'Yes' option and click save and continue
    page.checkRadioByNameAndValue('willAnswer', 'yes')

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
        'equality-and-diversity-monitoring': {
          'will-answer-equality-questions': {},
        },
      },
    }
    cy.task('stubApplicationGet', { application: answered })

    page.clickSubmit()

    // Then I'm on the disability task page
    Page.verifyOnPage(DisabilityPage, this.application)
  })
})
