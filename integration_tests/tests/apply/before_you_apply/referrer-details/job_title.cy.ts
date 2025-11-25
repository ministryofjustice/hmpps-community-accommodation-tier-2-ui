//  Feature: Referrer completes 'Referrer details' task
//    So that I can complete the 'Referrer details' task
//    As a referrer
//    I want to answer questions on the 'Job title' page
//
//  Background:
//    Given I am logged in
//    And I'm on the 'Job title' page
//
//  Scenario: view 'Job title' page
//    Then I see the "Job title" page
//
//  Scenario: Continue to next page
//    When I complete the 'Job title' page
//    And I continue to the next page
//    Then I see the 'Contact number' page

import Page from '../../../../pages/page'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'
import JobTitlePage from '../../../../pages/apply/before_you_start/referrer_details/jobTitlePage'
import ContactNumberPage from '../../../../pages/apply/before_you_start/referrer_details/contactNumberPage'

context('Complete "Job title" page in "Referrer details" task', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['referrer-details'] = {}
      const application = applicationFactory.build({
        person,
        data: applicationData,
      })
      cy.wrap(application).as('application')
    })

    cy.task('stubFindPerson', { person })
  })

  beforeEach(function test() {
    //  Background:
    //  Given I am logged in
    cy.signIn()
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    //  And I'm on the 'Job title' page
    JobTitlePage.visit(this.application)
  })

  //  Scenario: view 'Job title' page
  it('displays page', function test() {
    // Then I see the "Job title" page
    Page.verifyOnPage(JobTitlePage, this.application)
  })

  //  Scenario: Continue to next page
  it('continues to next page', function test() {
    const page = Page.verifyOnPage(JobTitlePage, this.application)

    // When I complete the 'Job title' page
    page.completeForm()

    // And I continue to the next page
    page.clickSubmit()

    // Then I see the 'Contact number' page
    Page.verifyOnPage(ContactNumberPage, this.application)
  })
})
