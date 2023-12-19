import { Cas2Application as Application } from '../../../../../server/@types/shared/models/Cas2Application'
import ApplyPage from '../../applyPage'
import { nameOrPlaceholderCopy } from '../../../../../server/utils/utils'
import { getQuestions } from '../../../../../server/form-pages/utils/questions'
import { getPage, hasResponseMethod } from '../../../../../server/utils/checkYourAnswersUtils'

export default class CheckYourAnswersPage extends ApplyPage {
  constructor(private readonly application: Application) {
    super('Check your answers', application, 'check-your-answers', 'check-your-answers')
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
      const pagesWithoutQuestions = ['summary', 'summary-data', 'oasys-import', 'acct', 'behaviour-notes']
      if (pagesWithoutQuestions.includes(pageKey)) {
        return
      }
      const PageClass = getPage(task, pageKey)
      const page = new PageClass({}, this.application)
      if (hasResponseMethod(page)) {
        const response = page.response()
        Object.keys(response).forEach(question => {
          this.checkTermAndDescription(question, response[question])
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
            const { question } = questions[questionKey]
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

            this.checkTermAndDescription(question, expectedAnswer)
          })
        })
      }
    })
  }
}
