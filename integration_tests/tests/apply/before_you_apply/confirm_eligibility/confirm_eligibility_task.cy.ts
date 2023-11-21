//  Feature: Referrer completes 'Confirm eligibility' task
//    So that I can complete the 'Confirm eligibility' task
//    As a referrer
//    I want to answer questions within that task
//
//  Background:
//    Given I am logged in
//    And I have successfully found a person by CRN
//    And I'm now faced with the 'Confirm eligibility' task
//
//  Scenario: Confirms that the person is eligible for CAS-2
//    When I confirm that the person is eligible
//    And I continue to the next task
//    Then I see that the 'Confirm eligibility' task is complete
//
//  Scenario: Confirms that the person is NOT eligible for CAS-2
//    When I confirm that the person is NOT eligible
//    And I continue to the next task
//    Then I see that I have marked this person as ineligible
//    And I am on the 'person ineligible' page
//    And I am provided with a way of changing the eligibility answer
//
//  Scenario: Changes eligibility answer: from NO to YES
//    Given I have confirmed that the person is not eligible
//    And I am on the 'person ineligible' page
//
//    When I choose to change my eligibility answer
//    I confirm that the person is eligible
//    And I continue to the next task
//    Then I see that the 'Confirm eligibility' task is complete
//
//  Scenario: Abandons ineligible application and starts new one
//    Given I have confirmed that the person is not eligible
//    And I am on the 'person ineligible' page
//
//    When I opt to start a new application
//    Then I should be able to 'Find by CRN'

import Page from '../../../../pages/page'
import CRNPage from '../../../../pages/apply/crnPage'
import TaskListPage from '../../../../pages/apply/taskListPage'
import ConfirmEligibilityPage from '../../../../pages/apply/confirmEligibilityPage'
import IneligiblePage from '../../../../pages/apply/ineligiblePage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Complete "Confirm eligibility" task in "Before you start" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['confirm-eligibility'] = {}
      const application = applicationFactory.build({
        id: 'abc123',
        person,
        data: applicationData,
      })
      cy.wrap(application).as('application')
    })
    cy.task('stubFindPerson', { person })
  })

  beforeEach(function test() {
    cy.task('stubCreateApplication', { application: this.application })
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    //  Background:
    //    Given I am logged in
    cy.signIn()
    //    And I have successfully found a person by CRN
    const page = CRNPage.visit(this.application.person.name)
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
    confirmEligibilityPage.doesNotHaveTaskListLink()

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

  //  Scenario: Confirms that the person is NOT eligible for CAS-2
  //    When I confirm that the person is NOT eligible
  //    And I continue to the next task
  //    Then I see that I have marked this person as ineligible
  //    And I am on the 'person ineligible' page
  //    And I am provided with a way of changing the eligibility answer
  it('allows INELIGIBILITY to be confirmed', function test() {
    const confirmEligibilityPage = new ConfirmEligibilityPage(this.application)

    // When I select the 'NO' option and click save and continue
    confirmEligibilityPage.chooseNoOption()

    // after submission of the valid form the API will return the answered question
    // -- note that it this case the value must be yes or no to indicate that the
    //    'Confirm eligibility' task is complete
    const answered = {
      ...this.application,
      data: {
        'confirm-eligibility': {
          'confirm-eligibility': { isEligible: 'no' },
        },
      },
    }
    cy.task('stubApplicationGet', { application: answered })

    confirmEligibilityPage.clickSubmit()

    // Then I see that I have marked this person as ineligible
    // And I am on the 'person ineligible' page
    const ineligiblePage = Page.verifyOnPage(IneligiblePage, this.application)
    ineligiblePage.hasGuidance()
    // And I am provided with a way of changing the eligibility answer)
    ineligiblePage.hasLinkToChangeAnswer()
  })

  //  Scenario: Changes eligibility answer: from NO to YES
  //    Given I have confirmed that the person is not eligible
  //    And I am on the 'person ineligible' page
  //
  //    When I choose to change my eligibility answer
  //    I confirm that the person is eligible
  //    And I continue to the next task
  //    Then I see that the 'Confirm eligibility' task is complete
  it('allows eligibility answer to be changed from NO to YES', function test() {
    //  Given I have confirmed that the person is not eligible
    const answered = {
      ...this.application,
      data: {
        'confirm-eligibility': {
          'confirm-eligibility': { isEligible: 'no' },
        },
      },
    }
    // And I am on the 'person ineligible' page
    cy.task('stubApplicationGet', { application: answered })
    cy.visit('applications/abc123')
    const ineligiblePage = Page.verifyOnPage(IneligiblePage, this.application)

    //  When I choose to change my eligibility answer
    ineligiblePage.chooseToChangeAnswer()

    //  I confirm that the person is eligible
    const confirmEligibilityPage = new ConfirmEligibilityPage(this.application)
    confirmEligibilityPage.chooseYesOption()

    //  And I continue to the next task
    const updated = {
      ...this.application,
      data: {
        'confirm-eligibility': {
          'confirm-eligibility': { isEligible: 'yes' },
        },
      },
    }
    cy.task('stubApplicationGet', { application: updated })
    confirmEligibilityPage.clickSubmit()

    // Then I see that the 'Confirm eligibility' task is complete
    const taskListPage = Page.verifyOnPage(TaskListPage)
    taskListPage.shouldShowTaskStatus('confirm-eligibility', 'Completed')
  })

  //  Scenario: Abandons ineligible application and starts new one
  //    Given I have confirmed that the person is not eligible
  //    And I am on the 'person ineligible' page
  //
  //    When I opt to start a new application
  //    Then I should be able to 'Find by CRN'
  it('allows ineligible application to be abandoned and a new one started', function test() {
    //  Given I have confirmed that the person is not eligible
    const answered = {
      ...this.application,
      data: {
        'confirm-eligibility': {
          'confirm-eligibility': { isEligible: 'no' },
        },
      },
    }
    // And I am on the 'person ineligible' page
    cy.task('stubApplicationGet', { application: answered })
    cy.visit('applications/abc123')
    const ineligiblePage = Page.verifyOnPage(IneligiblePage, this.application)

    // When I opt to start a new application
    ineligiblePage.startANewApplication()
  })
})
