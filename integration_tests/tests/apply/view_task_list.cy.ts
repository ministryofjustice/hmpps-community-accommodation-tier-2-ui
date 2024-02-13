//  Feature: Referrer views list of tasks for an in progress application
//    So that I can access the individual tasks in the application journey
//    As a referrer
//    I want to view a list of form tasks, grouped into sections
//
//  Scenario: view list of tasks
//    Given I am logged in
//    And an application exists
//    And the 'Before you start' tasks are complete
//    When I visit the task list page
//    Then I see the task listed by section
//    And I see that Check your answers cannot be started
//
//  Scenario: all tasks prior to Check your answers are complete
//    Given I am logged in
//    And an application exists
//    And all tasks prior to Check your answers are complete
//    When I visit the task list page
//    Then I see that Check your answers can be started

import { applicationFactory } from '../../../server/testutils/factories'
import Page from '../../pages/page'
import TaskListPage from '../../pages/apply/taskListPage'
import { fullPersonFactory } from '../../../server/testutils/factories/person'
import { FullPerson } from '../../../server/@types/shared/models/FullPerson'

context('Visit task list', () => {
  const incompleteApplication = applicationFactory.build({
    id: 'abc123',
    data: {
      'confirm-eligibility': {
        'confirm-eligibility': { isEligible: 'yes' },
      },
      'confirm-consent': {
        'confirm-consent': {
          hasGivenConsent: 'yes',
          consentDate: '2023-01-01',
          'consentDate-year': '2023',
          'consentDate-month': '1',
          'consentDate-day': '1',
        },
      },
    },
    person: fullPersonFactory.build(),
  })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['check-your-answers']['check-your-answers']
      const application = applicationFactory.build({
        id: 'abc456',
        person: fullPersonFactory.build(),
        data: applicationData,
      })
      cy.wrap(application).as('completeApplication')
    })
  })

  beforeEach(function test() {
    // Given I am logged in
    //---------------------
    cy.signIn()

    // And an application exists
    // -------------------------
    cy.task('stubApplicationGet', { application: incompleteApplication })
  })

  // Scenario: view list of tasks
  // ----------------------------------------------
  it('shows the tasks listed by section', () => {
    // I visit the task list page
    // --------------------------------
    cy.visit('applications/abc123')
    const person = incompleteApplication.person as FullPerson

    const page = Page.verifyOnPage(TaskListPage, person.name)

    // I see the task listed by section
    page.shouldShowTasksWithinTheirSections()

    // And I see that Check your answers cannot be started
    page.shouldShowTaskStatus('check-your-answers', 'Cannot start yet')
  })

  //  Scenario: all tasks prior to Check your answers are complete
  it('shows Check your answers with a status of not started', function test() {
    //  And all tasks prior to Check your answers are complete
    cy.task('stubApplicationGet', { application: this.completeApplication })

    //  When I visit the task list page
    cy.visit('applications/abc456')
    const person = this.completeApplication.person as FullPerson
    const page = Page.verifyOnPage(TaskListPage, person.name)

    //  Then I see that Check your answers can be started
    page.shouldShowTaskStatus('check-your-answers', 'Not yet started')
  })
})
