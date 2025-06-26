//  Feature: Referrer completes 'Risk to self: OASys import' page
//    So that I can complete the first page of the "Risk to self" task
//    As a referrer
//    I want to confirm that I've understood the guidance on that page
//
//  Scenario: Follows link from task list
//    Given there is a section with a task
//    And an application exists
//    And I am logged in
//    And I am viewing the application task list
//
//  Scenario: view "risk to self" task status
//    Then I see that the "risk to self" task has not been started
//
//  Scenario: there is OASys data
//    When I follow the link to the first page in the "Risks and needs" section
//    Then I see the "OASys import" page
//    And it is populated with OASys data
//
//  Scenario: import OASys data
//    When there is OASys data
//    When I choose to import and save the data
//    Then we are taken to the Vulnerability page
//
//    Scenario: return to Task after importing data
//    When I go to the task again
//    Then we are redirected to the Vulnerability page
//
//  Scenario: there is no OASys data
//    When I follow the link to the first page in the "Risks and needs" section
//    Then I see the "OASys import" page
//    And I see that there is no OASys data
//    When I choose to continue
//    Then we are taken to the Old OASys page

import OasysImportPage from '../../../../pages/apply/risks_and_needs/risk-to-self/oasysImportPage'
import VulnerabilityPage from '../../../../pages/apply/risks_and_needs/risk-to-self/vulnerabilityPage'
import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import {
  personFactory,
  applicationFactory,
  oasysRiskToSelfFactory,
} from '../../../../../server/testutils/factories/index'
import { DateFormats } from '../../../../../server/utils/dateUtils'
import OldOasysPage from '../../../../pages/apply/risks_and_needs/risk-to-self/oldOasysPage'

context('Visit "Risks and needs" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    const oasys = oasysRiskToSelfFactory.build({
      riskToSelf: [
        {
          questionNumber: 'R8.3.1',
          label: 'Current concerns about Vulnerability',
          answer: 'vulnerability answer',
        },
        {
          questionNumber: "FA62",
          label: "Previous and current risk",
          answer: "previous and current risk answer",
        }
      ],
    })

    cy.task('stubOasysRiskToSelf', {
      crn: person.crn,
      oasysRiskToSelf: {
        ...oasys,
        dateStarted: DateFormats.dateObjToIsoDateTime(new Date(2022, 6, 26)),
        dateCompleted: DateFormats.dateObjToIsoDateTime(new Date(2022, 6, 27)),
      },
    })

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['risk-to-self']
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
  })

  // Scenario: view task status
  // ----------------------------------------------
  it('shows the task listed within the section', () => {
    // I see that the task has not been started
    const taskListPage = Page.verifyOnPage(TaskListPage)
    taskListPage.shouldShowTaskStatus('risk-to-self', 'Not yet started')
  })

  // //  Scenario: reads "risk to self guidance" page
  // //    When I follow the link to the first page in the "Risks and needs" section
  // //    Then I see the "risk to self guidance" page
  it('provides the expected guidance content', function test() {
    const taskListPage = Page.verifyOnPage(TaskListPage)

    //  When I follow the link to the first page in the "Risks and needs" section
    taskListPage.visitTask('Add risk to self information')

    //  Then I see the "risk to self guidance" page
    const page = Page.verifyOnPage(OasysImportPage, this.application)

    //  and it's populated with data
    page.checkOasysInfo(this.application)
  })

  //  Scenario: import OASys data
  // ----------------------------------------------
  it('returns me to the expected page on save', function test() {
    const taskListPage = Page.verifyOnPage(TaskListPage)

    //  When I follow the link to the first page in the "Risks and needs" section
    taskListPage.visitTask('Add risk to self information')
    //  Then I see the "risk to self guidance" page
    const page = Page.verifyOnPage(OasysImportPage, this.application)

    //  When I choose to import and save the data
    page.clickSubmit('Import and continue')

    //  Then we are taken to the Vulnerability page
    Page.verifyOnPage(VulnerabilityPage, this.application)

    cy.task('verifyApplicationUpdate', this.application.id).then(requests => {
      expect(requests).to.have.length(1)

      const body = JSON.parse(requests[0].body)

      expect(body.data['risk-to-self']).to.have.keys('oasys-import', 'previous-and-current-risk', 'vulnerability')
      expect(body.data['risk-to-self']['oasys-import']).to.have.keys(
        'oasysImportedDate',
        'oasysStartedDate',
        'oasysCompletedDate',
      )
    })
  })

  //  Scenario: return to Task after importing data
  // ----------------------------------------------
  it('redirects to the Vulnerability page', function test() {
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // When there is already imported data
    cy.fixture('applicationData.json').then(applicationData => {
      const answered = {
        ...this.application,
        data: applicationData,
      }
      cy.task('stubApplicationGet', { application: answered })
    })

    //  When I revisit the task
    taskListPage.visitTask('Add risk to self information')

    //  Then we are redirected to the Vulnerability page
    Page.verifyOnPage(VulnerabilityPage, this.application)
  })

  //  Scenario: there is no OASys data
  // ----------------------------------------------
  it('shows a message to say that no OASys record exists', function test() {
    cy.task('stubOasysRiskToSelfNotFound', {
      crn: person.crn,
    })

    const taskListPage = Page.verifyOnPage(TaskListPage)

    //  When I follow the link to the first page in the "Risks and needs" section
    taskListPage.visitTask('Add risk to self information')

    //  Then I see the "risk to self guidance" page
    const page = Page.verifyOnPage(OasysImportPage, this.application)

    //  And I see that there is no OASys data
    page.displaysNoOASysNotificationBanner(this.application)

    //  When I choose to continue
    page.clickContinue()

    //  Then we are taken to the Old OASys page
    Page.verifyOnPage(OldOasysPage, this.application)
  })
})
