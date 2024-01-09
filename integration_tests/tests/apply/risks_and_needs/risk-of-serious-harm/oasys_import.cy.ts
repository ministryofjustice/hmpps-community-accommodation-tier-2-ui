//  Feature: Referrer completes 'Risk of serious harm: OASys import' page
//    So that I can complete the first page of the "Risk of serious harm" task
//    As a referrer
//    I want to complete the OASys import page
//
//  Background:
//    Given an application exists
//    And I am logged in
//    And I am viewing the application
//
//  Scenario: view "risk of serious harm" task status
//    Then I see that the "risk of serious harm" task has not been started
//
//  Scenario: there is OASys data
//    When I follow the link to the first page in the "RoSH" section
//    Then I see the "OASys import" page
//    And it is populated with OASys data
//
//  Scenario: import OASys data
//    When there is OASys data
//    And I choose to import and save the data
//    Then we are taken to the RoSH summary page
//
//  Scenario: there is no OASys data
//    When there is no OASys data
//    And I choose to continue
//    Then I am taken to the risk to others page
//
//  Scenario: return to Task after importing data
//    When I go to the task again
//    Then we are redirected to the RoSH Summary page
//
//  Scenario: navigate to next page in "Risk of serious harm" task
//    When I continue to the next page
//    Then I see the "RoSH summary" page

import Page from '../../../../pages/page'
import TaskListPage from '../../../../pages/apply/taskListPage'
import {
  personFactory,
  applicationFactory,
  oasysRoshFactory,
  risksFactory,
} from '../../../../../server/testutils/factories/index'
import OasysImportPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/oasysImportPage'
import RoshSummaryPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/roshSummaryPage'
import { DateFormats } from '../../../../../server/utils/dateUtils'
import RiskToOthersPage from '../../../../pages/apply/risks-and-needs/risk-of-serious-harm/riskToOthersPage'

context('Visit "Risks and needs" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    const oasys = oasysRoshFactory.build({
      rosh: [
        {
          questionNumber: 'R10.1',
          label: 'Who is at risk',
          answer: 'who answer',
        },
        {
          questionNumber: 'R10.2',
          label: 'What is the nature of the risk',
          answer: 'what answer',
        },
        {
          questionNumber: 'R10.3',
          label: 'When is the risk likely to be the greatest',
          answer: 'when answer',
        },
        {
          questionNumber: 'R10.4',
          label: 'What circumstances are likely to increase risk',
          answer: 'circumstances increase answer',
        },
        {
          questionNumber: 'R10.5',
          label: 'What circumstances are likely to reduce the risk',
          answer: 'circumstances reduce answer',
        },
      ],
    })
    const risks = risksFactory.build()

    cy.task('stubOasysRosh', {
      crn: person.crn,
      oasysRosh: {
        ...oasys,
        dateStarted: DateFormats.dateObjToIsoDateTime(new Date(2022, 6, 26)),
        dateCompleted: DateFormats.dateObjToIsoDateTime(new Date(2022, 6, 27)),
      },
    })

    cy.task('stubPersonRisks', { crn: person.crn, personRisks: risks })

    cy.fixture('applicationData.json').then(applicationData => {
      delete applicationData['risk-of-serious-harm']
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

  //  Scenario: view "risk of serious harm" task status
  // ----------------------------------------------
  it('shows the task listed within the section', function test() {
    // Then I see that the "risk of serious harm" task has not been started
    const taskListPage = Page.verifyOnPage(TaskListPage)
    taskListPage.shouldShowTaskStatus('risk-of-serious-harm', 'Not started')
  })

  //  Scenario: there is OASys data
  // ----------------------------------------------
  it('presents the OASys import page', function test() {
    const taskListPage = Page.verifyOnPage(TaskListPage)

    //  When I follow the link to the first page in the "Risk of serious harm" section
    taskListPage.visitTask('Add risk of serious harm (RoSH) information')

    //  Then I see the 'Risk of serious harm: OASys import' page
    const page = Page.verifyOnPage(OasysImportPage, this.application)

    //  and it is populated with data
    page.checkOasysInfo(this.application)
  })

  //  Scenario: import OASys data
  // ----------------------------------------------
  it('redirects to the expected page on save', function test() {
    //  When there is OASys data
    OasysImportPage.visit(this.application)
    const page = Page.verifyOnPage(OasysImportPage, this.application)

    //  And I choose to import and save the data
    page.clickSubmit('Import and continue')

    //  Then we are taken to the RoSH summary page
    Page.verifyOnPage(RoshSummaryPage, this.application)
  })

  //  Scenario: there is no OASys data
  // ----------------------------------------------
  it('redirects to the risk to others page', function test() {
    const taskListPage = Page.verifyOnPage(TaskListPage)

    //    When there is no OASys data
    cy.task('stubOasysRoshNotFound', { crn: person.crn })
    taskListPage.visitTask('Add risk of serious harm (RoSH) information')

    //    And I choose to continue
    const page = Page.verifyOnPage(OasysImportPage, this.application)
    page.clickContinue()

    //    Then I am taken to the risk to others page
    Page.verifyOnPage(RiskToOthersPage, this.application)
  })

  //    Scenario: return to Task after importing data
  // ----------------------------------------------
  it('redirects to the RoSH Summary page', function test() {
    const taskListPage = Page.verifyOnPage(TaskListPage)

    // When there is already imported data
    cy.fixture('applicationData.json').then(applicationData => {
      const applicationWithOASysRosh = {
        ...this.application,
        data: applicationData,
      }
      cy.task('stubApplicationGet', { application: applicationWithOASysRosh })
    })

    //  When I revisit the task
    taskListPage.visitTask('Add risk of serious harm (RoSH) information')

    //  Then we are redirected to the RoSH summary page
    Page.verifyOnPage(RoshSummaryPage, this.application)
  })

  //  Scenario: navigate to next page in "Risk of serious harm" task
  // ----------------------------------------------
  it('links to the RoSH summary page', function test() {
    //  When I continue to the next page
    OasysImportPage.visit(this.application)
    const page = Page.verifyOnPage(OasysImportPage, this.application)
    page.clickSubmit('Import and continue')

    //  Then I see the "RoSH summary" page
    Page.verifyOnPage(RoshSummaryPage, this.application)

    cy.task('verifyApplicationUpdate', this.application.id).then(requests => {
      expect(requests).to.have.length(1)

      const body = JSON.parse(requests[0].body)

      expect(body.data['risk-of-serious-harm']['oasys-import']).to.have.keys('oasysImportedDate')
      expect(body.data['risk-of-serious-harm']).to.have.keys(
        'summary',
        'summary-data',
        'risk-factors',
        'oasys-import',
        'reducing-risk',
        'risk-to-others',
      )
      expect(body.data['risk-of-serious-harm']['summary-data']).to.have.keys(
        'status',
        'value',
        'oasysImportedDate',
        'oasysStartedDate',
        'oasysCompletedDate',
      )
    })
  })
})
