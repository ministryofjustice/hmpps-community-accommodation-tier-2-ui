//  Feature: Referrer completes 'Ethnic group' question page
//    So that I can complete the 'Equality questions' task
//    As a referrer
//    I want to answer questions on the sexual orientation page
//
//  Scenario: submit 'white' as ethnic group answer
//    Given I'm on the 'Ethnic group' question page
//    When I answer 'white',
//    Then I am taken to the 'white background' page
//
//  Scenario: submit 'Mixed or multiple ethnic groups' as ethnic group answer
//    Given I'm on the 'Ethnic group' question page
//    When I answer 'Mixed or multiple ethnic groups',
//    Then I am taken to the 'mixed background' page
//
//  Scenario: submit 'Asian or Asian British' as ethnic group answer
//    Given I'm on the 'Ethnic group' question page
//    When I answer 'Asian or Asian British',
//    Then I am taken to the 'asian background' page
//
//  Scenario: submit 'Black, African, Caribbean or Black British' as ethnic group answer
//    Given I'm on the 'Ethnic group' question page
//    When I answer 'white',
//    Then I am taken to the 'white background' page
//
//  Scenario: submit 'Other ethnic group' as ethnic group answer
//    Given I'm on the 'Ethnic group' question page
//    When I answer 'Other ethnic group',
//    Then I am taken to the 'other background' page
//
//  Scenario: submit 'Prefer not to say' as ethnic group answer
//    Given I'm on the 'Ethnic group' question page
//    When I answer 'Prefer not to say'
//    Then I am taken to the religion page

import Page from '../../../../pages/page'
import {
  EthnicGroupPage,
  WhiteBackgroundPage,
  MixedBackgroundPage,
  AsianBackgroundPage,
  BlackBackgroundPage,
  OtherBackgroundPage,
  ReligionPage,
} from '../../../../pages/apply/about_the_person/equality_and_diversity'
import { personFactory, applicationFactory } from '../../../../../server/testutils/factories/index'

context('Visit "About the applicant" section', () => {
  const person = personFactory.build({ name: 'Roger Smith' })

  beforeEach(function test() {
    cy.task('reset')
    cy.task('stubSignIn')
    cy.task('stubAuthUser')

    cy.fixture('applicationData.json').then(applicationData => {
      applicationData['equality-and-diversity-monitoring']['ethnic-group'] = {}
      const application = applicationFactory.build({
        id: 'abc123',
        person,
      })
      application.data = applicationData
      cy.wrap(application).as('application')
      cy.wrap(application.data).as('applicationData')
    })
  })

  beforeEach(function test() {
    // And an application exists
    cy.task('stubApplicationGet', { application: this.application })
    cy.task('stubApplicationUpdate', { application: this.application })

    // Given I am logged in
    //---------------------
    cy.signIn()

    // And I am on the ethnic group page
    // --------------------------------
    cy.visit('applications/abc123/tasks/equality-and-diversity-monitoring/pages/ethnic-group')
    Page.verifyOnPage(EthnicGroupPage, this.application)
  })

  // Scenario: select 'white' as ethnic group
  // ----------------------------
  it('continues to the white background page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(EthnicGroupPage, this.application)
    page.selectEthnicGroup('white')

    page.clickSubmit()

    // I am taken to the white background page
    Page.verifyOnPage(WhiteBackgroundPage, this.application)
  })

  // Scenario: select 'mixed etc.' as ethnic group
  // ----------------------------
  it('continues to the mixed background page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(EthnicGroupPage, this.application)
    page.selectEthnicGroup('mixed')

    page.clickSubmit()

    // I am taken to the white background page
    Page.verifyOnPage(MixedBackgroundPage, this.application)
  })

  // Scenario: select 'Asian or Asian British' as ethnic group
  // ----------------------------
  it('continues to the asian background page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(EthnicGroupPage, this.application)
    page.selectEthnicGroup('asian')

    page.clickSubmit()

    // I am taken to the white background page
    Page.verifyOnPage(AsianBackgroundPage, this.application)
  })

  // Scenario: select 'Black, African, Caribbean or Black British' as ethnic group
  // ----------------------------
  it('continues to the black background page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(EthnicGroupPage, this.application)
    page.selectEthnicGroup('black')

    page.clickSubmit()

    // I am taken to the black background page
    Page.verifyOnPage(BlackBackgroundPage, this.application)
  })

  // Scenario: select 'Other ethnic group' as ethnic group
  // ----------------------------
  it('continues to the other  background page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(EthnicGroupPage, this.application)
    page.selectEthnicGroup('other')

    page.clickSubmit()

    // I am taken to the other background page
    Page.verifyOnPage(OtherBackgroundPage, this.application)
  })

  // Scenario: select 'Prefer not to say'
  // ----------------------------
  it('continues to the religion page', function test() {
    // I submit my answers
    const page = Page.verifyOnPage(EthnicGroupPage, this.application)
    page.selectEthnicGroup('preferNotToSay')

    page.clickSubmit()

    // I am taken to the relgion page
    Page.verifyOnPage(ReligionPage, this.application)
  })
})
