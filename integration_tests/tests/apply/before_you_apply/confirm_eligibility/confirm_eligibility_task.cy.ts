//  Feature: Referrer completes 'Confirm eligibility' task
//    So that I can complete the 'Confirm eligibility' task
//    As a referrer
//    I want to answer questions within that task
//
//  Background:
//    Given I am logged in
//    And I have successfully found a person by CRN
//    And I'm now faced with the 'Confirm eligibility' task
//    And I am viewing the application task list
//
//  Scenario: Confirms that the person is eligible for CAS-2
//    When I confirm that the person is eligible
//    And I continue to the next task
//    Then I see that the 'Confirm eligibility' task is complete

import Page from '../../../../pages/page'
import CRNPage from '../../../../pages/apply/crnPage'
import TaskListPage from '../../../../pages/apply/taskListPage'
import ConfirmEligibilityPage from '../../../../pages/apply/confirmEligibilityPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Complete "Confirm eligibility" task in "Before you start" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    const application = applicationFactory.build({
      id: 'abc123',
      data: {
        foo: 'bar',
        'confirm-eligibility': {
          'confirm-eligibility': { isEligible: null },
        },
        'funding-information': {
          'funding-source': { fundingSource: 'personalSavings' },
        },
      },
      person,
    })
    cy.task('stubFindPerson', { person })

    cy.wrap(application).as('application')
  })

  beforeEach(function test() {
    cy.task('stubCreateApplication', { application: this.application })
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    //  Background:
    //    Given I am logged in
    cy.signIn()
    //    And I have successfully found a person by CRN
    const page = CRNPage.visit()
    page.getTextInputByIdAndEnterDetails('crn', person.crn)

    page.clickSubmit()

    //   And I'm now faced with the 'Confirm eligibility' task
    Page.verifyOnPage(ConfirmEligibilityPage, this.application)
  })

  //  Scenario: Confirms that the person is eligible for CAS-2
  //    When I confirm that the person is eligible
  //    And I continue to the next task
  //    Then I see that the 'Confirm eligibility' task is complete
  it('allows eligibility to be confirmed', function test() {
    const confirmEligibilityPage = new ConfirmEligibilityPage(this.application)
    confirmEligibilityPage.hasCaption()
    confirmEligibilityPage.hasQuestionsAndAnswers()
    confirmEligibilityPage.hasGuidance()

    // When I select the 'Yes' option and click save and continue
    confirmEligibilityPage.chooseYesOption()

    // after submission of the valid form the API will return the answered question
    // -- note that it this case the value must be yes or no to indicate that the
    //    'Confirm eligibility' task is complete
    const answered = {
      ...this.application,
      data: {
        'confirm-eligibility': {
          'confirm-eligibility': { isEligible: 'yes' },
        },
      },
    }
    cy.task('stubApplicationGet', { application: answered })

    confirmEligibilityPage.clickSubmit()

    // Then I return to the task list
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // And I see that the task is now complete
    taskListPage.shouldShowTaskStatus('confirm-eligibility', 'Completed')
  })
})
