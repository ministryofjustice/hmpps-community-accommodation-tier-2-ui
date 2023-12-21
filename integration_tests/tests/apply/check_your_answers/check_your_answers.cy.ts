//  Scenario: check my answers
//  Given a complete application exists
//  When I view the 'check your answers' page
//  Then I see a list of questions and answers for the application

import Page from '../../../pages/page'
import CheckYourAnswersPage from '../../../pages/apply/check_your_answers/check-your-answers/checkYourAnswersPage'
import { personFactory, applicationFactory } from '../../../../server/testutils/factories/index'
import TaskListPage from '../../../pages/apply/taskListPage'

context('Check your answers page', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['check-your-answers']['check-your-answers']
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
  })

  //  Scenario: check my answers
  //  When I view the 'check your answers' page
  //  Then I see a list of questions and answers for the application
  it('presents check your answers page', function test() {
    //  When I view the 'check your answers' page
    TaskListPage.visit(this.application)
    const taskListPage = Page.verifyOnPage(TaskListPage)
    taskListPage.visitTask('Check application answers')
    const page = Page.verifyOnPage(CheckYourAnswersPage, this.application)

    //  Then I see a download button
    page.shouldShowPrintButton('Download as a PDF')

    //  And I see a list of questions and answers for the application
    page.hasExpectedSummaryData()
    page.hasApplicantDetails(this.application)
    page.shouldShowConfirmEligibilityAnswers()
    page.shouldShowFundingInformationAnswers()
    page.shouldShowEqualityAndDiversityAnswers()
    page.shouldShowHealthNeedsAnswers()
    page.shouldShowRiskToSelfAnswers()
    page.shouldShowRoshAnswers()
    page.shouldShowOffendingHistoryAnswers()
  })

  //  Scenario: check my answers
  //  When I view the 'check your answers' page
  //  And I confirm the information is correct
  //  Then I am taken to the task list page
  it('navigates to the task list page once the referrer confirms details are correct', function test() {
    //  When I view the 'check your answers' page
    TaskListPage.visit(this.application)
    const taskListPage = Page.verifyOnPage(TaskListPage)
    taskListPage.visitTask('Check application answers')
    const page = Page.verifyOnPage(CheckYourAnswersPage, this.application)

    //  When I confirm the information is correct
    page.checkCheckboxByValue('confirmed')

    //  When I continue to the next task / page
    page.clickSubmit()

    //  Then I am taken to the task list page
    Page.verifyOnPage(TaskListPage, this.application)
  })
})
