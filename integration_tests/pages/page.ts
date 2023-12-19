import { ApplicationDocument } from '@approved-premises/ui'
import errorLookups from '../../server/i18n/en/errors.json'
import { DateFormats } from '../../server/utils/dateUtils'
import { Cas2Application } from '../../server/@types/shared/models/Cas2Application'
import { Cas2SubmittedApplication } from '../../server/@types/shared/models/Cas2SubmittedApplication'
import { FullPerson } from '../../server/@types/shared/models/FullPerson'

export type PageElement = Cypress.Chainable<JQuery>

export default abstract class Page {
  static verifyOnPage<T>(constructor: new (...args: Array<unknown>) => T, ...args: Array<unknown>): T {
    return new constructor(...args)
  }

  constructor(
    private readonly title: string,
    private readonly name: string,
  ) {
    this.checkOnPage()
    this.checkNameIsNotInDocumentTitle()
  }

  checkOnPage(): void {
    cy.get('h1').contains(this.title)
  }

  checkNameIsNotInDocumentTitle(): void {
    cy.title().should('not.include', this.name)
  }

  signOut = (): PageElement => cy.get('[data-qa=signOut]')

  manageDetails = (): PageElement => cy.get('[data-qa=manageDetails]')

  clickSubmit(text = 'Save and continue'): void {
    cy.get('button').contains(text).click()
  }

  clickContinue(): void {
    cy.get('a').contains('Continue').click()
  }

  shouldShowErrorMessagesForFields(fields: Array<string>, error?: string): void {
    fields.forEach(field => {
      const errorMessagesLookup = errorLookups[error || field].empty

      cy.get('.govuk-error-summary').should('contain', errorMessagesLookup)
      cy.get(`[data-cy-error-${field}]`).should('contain', errorMessagesLookup)
    })
  }

  checkRadioByNameAndValue(name: string, option: string): void {
    cy.get(`input[name="${name}"][value="${option}"]`).check()
  }

  clickBack(): void {
    cy.get('a').contains('Back').click()
  }

  getTextInputByIdAndEnterDetails(id: string, details: string): void {
    cy.get(`#${id}`).type(details)
  }

  getSelectInputByIdAndSelectAnEntry(id: string, entry: string): void {
    cy.get(`#${id}`).select(entry)
  }

  checkCheckboxByValue(option: string): void {
    cy.get(`input[value="${option}"]`).check()
  }

  completeDateInputs(prefix: string, date: string): void {
    const parsedDate = DateFormats.isoToDateObj(date)
    cy.get(`#${prefix}-day`).type(parsedDate.getDate().toString())
    cy.get(`#${prefix}-month`).type(`${parsedDate.getMonth() + 1}`)
    cy.get(`#${prefix}-year`).type(parsedDate.getFullYear().toString())
  }

  checkValueOfTextInputById(id: string, expectedValue: string): void {
    cy.get(`#${id}`).should('have.value', expectedValue)
  }

  clickRemove(): void {
    cy.get('a').contains('Remove').click()
  }

  removeWhiteSpaceAndLineBreaks(stringToReplace: string): string {
    return stringToReplace.trim().replace(/(\r\n|\n|\r)/gm, '')
  }

  removeHtmlBreaks(stringToReplace: string): string {
    return stringToReplace.replace(/<br \/>/g, '')
  }

  hasQuestionsAndAnswersFromDocument(document: ApplicationDocument) {
    const { sections } = document
    sections.forEach(section => {
      cy.get('h2').contains(section.title)
      section.tasks.forEach(task => {
        cy.get('h2').contains(task.title)
        task.questionsAndAnswers.forEach(question => {
          this.checkTermAndDescription(question.question, question.answer)
        })
      })
    })
  }

  checkTermAndDescription(term: string, description: string): void {
    const formattedDescription = this.removeWhiteSpaceAndLineBreaks(description)
    const formattedTerm = this.removeHtmlBreaks(term)

    cy.get('dt')
      .contains(formattedTerm)
      .parent()
      .within(() => {
        cy.get('dd').invoke('text').should('contain', formattedDescription)
      })
  }

  clickLink(label: string): void {
    cy.get('a').contains(label).click()
  }

  shouldShowPrintButton(): void {
    cy.get('button').contains('Save as PDF')
  }

  clickPrintButton(): void {
    cy.get('button').contains('Save as PDF').click()
  }

  shouldPrint(): void {
    cy.window().then(win => {
      cy.stub(win, 'print').as('printStub')
    })

    this.clickPrintButton()

    cy.get('@printStub').should('be.calledOnce')
  }

  hasApplicantDetails(application: Cas2Application | Cas2SubmittedApplication): void {
    const person = application.person as FullPerson
    cy.get(`[data-cy-check-your-answers-section="applicant-details"]`).within(() => {
      this.checkTermAndDescription('Full name', person.name)
      this.checkTermAndDescription(
        'Date of birth',
        DateFormats.isoDateToUIDate(person.dateOfBirth, { format: 'short' }),
      )
      this.checkTermAndDescription('Nationality', person.nationality)
      this.checkTermAndDescription('Sex', person.sex)
      this.checkTermAndDescription('Prison number', person.nomsNumber)
      cy.get('dt')
        .contains(/Prison $/)
        .parent()
        .within(() => {
          cy.get('dd').invoke('text').should('contain', person.prisonName)
        })
      this.checkTermAndDescription('PNC number', person.pncNumber)
      this.checkTermAndDescription('NDelius CRN number', person.crn)
    })
  }
}
