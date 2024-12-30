import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import { FullPerson } from '../../../../../server/@types/shared/models/FullPerson'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy, stringToKebabCase, htmlToPlainText } from '../../../../../server/utils/utils'
import { getQuestions } from '../../../../../server/form-pages/utils/questions'
import { getPage, getSections, hasResponseMethod } from '../../../../../server/utils/checkYourAnswersUtils'

export default class CheckYourAnswersPage extends ApplyPage {
  constructor(private readonly application: Application) {
    const person = application.person as FullPerson
    super(`Check ${person.name}'s application`, application, 'check-your-answers', 'check-your-answers')
  }

  hasExpectedSummaryData(): void {
    const person = this.application.person as FullPerson

    cy.get('#application-summary').within(() => {
      cy.get('span').contains(person.nomsNumber)
      cy.get('li').contains(this.application.createdBy.name)
      cy.get('li').contains(person.prisonName)
      cy.get('li').contains(this.application.createdBy.email)
      cy.get('li').contains(this.application.id)
    })
  }

  shouldShowConfirmEligibilityAnswers(): void {
    this.shouldShowCheckYourAnswersTitle('confirm-eligibility', 'Confirm eligibility')
    this.shouldShowQuestionsAndAnswers('confirm-eligibility')
  }

  shouldShowFundingInformationAnswers(): void {
    this.shouldShowCheckYourAnswersTitle('funding-information', 'Confirm funding and ID')
    this.shouldShowQuestionsAndAnswers('funding-information')
  }

  shouldShowEqualityAndDiversityAnswers(): void {
    this.shouldShowCheckYourAnswersTitle(
      'equality-and-diversity-monitoring',
      'Add equality and diversity monitoring information',
    )
    this.shouldShowQuestionsAndAnswers('equality-and-diversity-monitoring')
  }

  shouldShowHealthNeedsAnswers(): void {
    this.shouldShowCheckYourAnswersTitle('health-needs', 'Add health needs')
    this.shouldShowQuestionsAndAnswers('health-needs')
  }

  shouldShowRiskToSelfAnswers(): void {
    this.shouldShowCheckYourAnswersTitle('risk-to-self', 'Add risk to self information')
    this.shouldShowQuestionsAndAnswers('risk-to-self')
  }

  shouldShowRoshAnswers(): void {
    this.shouldShowCheckYourAnswersTitle('risk-of-serious-harm', 'Add risk of serious harm (RoSH) information')
    this.shouldShowQuestionsAndAnswers('risk-of-serious-harm')
  }

  shouldShowOffendingHistoryAnswers() {
    this.shouldShowCheckYourAnswersTitle('offending-history', 'Add offending history')
    this.shouldShowQuestionsAndAnswers('offending-history')
  }

  shouldShowCheckYourAnswersTitle(taskName: string, taskTitle: string) {
    cy.get(`[data-cy-check-your-answers-section="${taskName}"]`).within(() => {
      cy.get('.govuk-summary-card__title').should('contain', taskTitle)
    })
  }

  shouldShowQuestionsAndAnswers(task: string) {
    const pageKeys = Object.keys(this.application.data[task])
    pageKeys.forEach(pageKey => {
      const pagesWithoutQuestions = ['summary', 'summary-data', 'oasys-import', 'acct']
      if (pagesWithoutQuestions.includes(pageKey)) {
        return
      }
      const PageClass = getPage(task, pageKey)
      const page = new PageClass({}, this.application)
      if (hasResponseMethod(page)) {
        const response = page.response()
        Object.keys(response).forEach(question => {
          this.checkTermAndDescription(htmlToPlainText(question), response[question])
        })
      } else {
        const pageData = this.application.data[task][pageKey]
        const questionKeys = Object.keys(pageData)
        const questions = getQuestions(nameOrPlaceholderCopy(this.application.person))[task][pageKey]
        cy.get(`[data-cy-check-your-answers-section="${task}"]`).within(() => {
          questionKeys.forEach(questionKey => {
            if (!pageData[questionKey]) {
              return
            }

            const questionText = questions[questionKey]?.question

            if (!questionText) {
              return
            }

            const predefinedAnswers = questions[questionKey].answers
            let expectedAnswer = ''

            if (Array.isArray(pageData[questionKey])) {
              const items = []
              pageData[questionKey].forEach(answerItem => {
                items.push(predefinedAnswers[answerItem])
              })
              expectedAnswer = items.toString()
            } else if (predefinedAnswers) {
              expectedAnswer = predefinedAnswers[pageData[questionKey]]
            } else {
              expectedAnswer = pageData[questionKey]
            }

            this.checkTermAndDescription(questionText, expectedAnswer)
          })
        })
      }
    })
  }

  shouldNotShowAnswersWithoutQuestions() {
    cy.get('main').should('not.contain', 'this answer should not appear')
  }

  shouldShowSideNavBar() {
    const sections = getSections()

    // First nav link should have an id for "back to top" functionality
    cy.get('.side-nav ul li').first().find('a').should('have.attr', 'id', 'top')

    sections.forEach(section => {
      section.tasks.forEach(task => {
        cy.get(`a[href="#${stringToKebabCase(task.title)}"]`)
      })
    })
  }
}
