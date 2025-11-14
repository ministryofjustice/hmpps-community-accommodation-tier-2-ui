//  Feature: Referrer completes 'Confirm consent' task
//    So that I can complete the 'Confirm consent' task
//    As a referrer
//    I want to answer questions within that task
//
//  Background:
//    Given I am logged in
//    And I have confirmed the user is eligible for CAS-2
//    And I'm now faced with the 'Confirm consent' task
//
//  Scenario: Confirms that the person has given consent
//    When I confirm that the person has given consent
//    And I continue to the next task
//    Then I see that the 'Confirm consent' task is complete
//
//  Scenario: Confirms that the person has NOT given consent
//    When I confirm that the person has NOT given consent
//    And I continue to the next task
//    Then I see that I have marked that this person has not given consent
//    And I am on the 'consent refused' page
//    And I am provided with a way of changing the consent answer
//
//  Scenario: Changes consent answer: from NO to YES
//    Given I have confirmed that the person has not given consent
//    And I am on the 'person ineligible' page
//    When I choose to change my consent answer
//    I confirm that the person has given consent
//    And I continue to the next task
//    Then I see that the 'Confirm consent' task is complete
//
//  Scenario: Abandons application and starts new one
//    Given I have confirmed that the person has not given consent
//    And I am on the 'consent refused' page
//    When I opt to start a new application
//    Then I should be able to 'Find by prison number'

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import ConfirmConsentPage from '../../../../pages/apply/before_you_start/confirm_consent/confirmConsentPage'
import ConsentRefusedPage from '../../../../pages/apply/before_you_start/confirm_consent/consentRefusedPage'
import FindByPrisonNumberPage from '../../../../pages/apply/findByPrisonNumberPage'

context('Complete "Confirm consent" task in "Before you start" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['confirm-consent'] = {}
      const application = applicationFactory.build({
        person,
        data: applicationData,
      })
      cy.wrap(application).as('application')
    })

    cy.task('stubFindPerson', { person })
  })

  beforeEach(function test() {
    cy.wrap({
      ...this.application,
      data: {
        ...this.application.data,
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
    }).as('applicationWithConsent')

    cy.wrap({
      ...this.application,
      data: {
        ...this.application.data,
        'confirm-consent': {
          'confirm-consent': {
            hasGivenConsent: 'no',
            consentRefusalDetail: 'some reasons',
          },
        },
      },
    }).as('applicationWithConsentRefused')

    //  Background:
    //    Given I am logged in
    cy.signIn()
    //    And I have confirmed the user is eligible for CAS-2
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    ConfirmConsentPage.visit(this.application)

    //   And I'm now faced with the 'Confirm consent' task
    Page.verifyOnPage(ConfirmConsentPage, this.application)
  })

  //  Scenario: Confirms that the person has given consent
  //    When I confirm that the person has given consent
  //    And I continue to the next task
  //    Then I see that the 'Confirm consent' task is complete
  it('allows consent to be confirmed', function test() {
    const page = Page.verifyOnPage(ConfirmConsentPage, this.application)

    // When I select the 'Yes' option and click save and continue
    page.completeFormWithConsent()

    // after submission of the valid form the API will return the answered question
    // -- note that it this case the value must be yes or no to indicate that the
    //    'Confirm consent' task is complete
    cy.task('stubApplicationGet', { application: this.applicationWithConsent })

    page.clickSubmit()

    // Then I return to the task list
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // And I see that the task is now complete
    taskListPage.shouldShowTaskStatus('confirm-consent', 'Completed')
  })

  //  Scenario: Confirms that the person has NOT given consent
  //    When I confirm that the person has NOT given consent
  //    And I continue to the next task
  //    Then I see that I have marked that this person has not given consent
  //    And I am on the 'consent refused' page
  //    And I am provided with a way of changing the consent answer
  it('allows NO CONSENT to be confirmed', function test() {
    const page = Page.verifyOnPage(ConfirmConsentPage, this.application)

    // When I select the 'NO' option and click save and continue
    page.completeFormWithoutConsent()

    // after submission of the valid form the API will return the answered question
    // -- note that it this case the value must be yes or no to indicate that the
    //    'Confirm consent' task is complete
    cy.task('stubApplicationGet', { application: this.applicationWithConsentRefused })

    page.clickSubmit()

    // Then I see that I have marked that this person has not given consent
    // And I am on the 'consent refused' page
    const consentRefusedPage = Page.verifyOnPage(ConsentRefusedPage, this.application)
    consentRefusedPage.hasGuidance()
    // And I am provided with a way of changing the eligibility answer)
    consentRefusedPage.hasLinkToChangeAnswer()
  })

  //  Scenario: Changes consent answer: from NO to YES
  //    Given I have confirmed that the person has not given consent
  //    And I am on the 'person ineligible' page
  //    When I choose to change my consent answer
  //    I confirm that the person has given consent
  //    And I continue to the next task
  //    Then I see that the 'Confirm consent' task is complete
  it('allows consent answer to be changed from NO to YES', function test() {
    //  Given I have confirmed that the person has not given consent
    cy.task('stubApplicationGet', { application: this.applicationWithConsentRefused })

    // And I am on the 'consent refused' page
    cy.visit(`applications/${this.applicationWithConsentRefused.id}`)
    const page = Page.verifyOnPage(ConsentRefusedPage, this.application)

    //  When I choose to change my consent answer
    page.chooseToChangeAnswer()

    //  I confirm that the person has given consent
    const confirmConsentPage = new ConfirmConsentPage(this.application)
    confirmConsentPage.completeFormWithConsent()

    //  And I continue to the next task
    cy.task('stubApplicationGet', { application: this.applicationWithConsent })
    confirmConsentPage.clickSubmit()

    // Then I see that the 'Confirm consent' task is complete
    const taskListPage = Page.verifyOnPage(TaskListPage)
    taskListPage.shouldShowTaskStatus('confirm-consent', 'Completed')
  })

  //  Scenario: Abandons application and starts new one
  //    Given I have confirmed that the person has not given consent
  //    And I am on the 'consent refused' page
  //    When I opt to start a new application
  //    Then I should be able to 'Find by prison number'
  it('allows application to be abandoned and a new one started', function test() {
    //  Given I have confirmed that the person has not given consent
    cy.task('stubApplicationGet', { application: this.applicationWithConsentRefused })

    // And I am on the 'consent refused' page
    cy.visit(`applications/${this.applicationWithConsentRefused.id}`)
    const page = Page.verifyOnPage(ConsentRefusedPage, this.application)

    // When I opt to start a new application
    page.startANewApplication()

    // Then I should be able to 'Find by prison number'
    Page.verifyOnPage(FindByPrisonNumberPage)
  })
})
