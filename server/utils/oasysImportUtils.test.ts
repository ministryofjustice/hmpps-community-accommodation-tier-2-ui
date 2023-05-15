import { roshSummaryFactory } from '../testutils/factories'
import { textareas } from './oasysImportUtils'

describe('OASysImportUtils', () => {
  describe('textareas', () => {
    it('it returns reoffending needs as textareas', () => {
      const roshSummaries = roshSummaryFactory.buildList(2)
      const sectionName = 'roshAnswers'
      const result = textareas(roshSummaries, sectionName)

      expect(result).toMatchStringIgnoringWhitespace(`
                  <div class="govuk-form-group">
                  <h3 class="govuk-label-wrapper">
                      <label class="govuk-label govuk-label--m" for=${sectionName}[${roshSummaries[0].questionNumber}]>
                          ${roshSummaries[0].label}?
                      </label>
                  </h3>
                  <textarea class="govuk-textarea" id=${sectionName}[${roshSummaries[0].questionNumber}] name=${sectionName}[${roshSummaries[0].questionNumber}] rows="8">${roshSummaries[0].answer}</textarea>
              </div>
              <div class="govuk-form-group">
              <h3 class="govuk-label-wrapper">
                  <label class="govuk-label govuk-label--m" for=${sectionName}[${roshSummaries[1].questionNumber}]>
                      ${roshSummaries[1].label}?
                  </label>
              </h3>
              <textarea class="govuk-textarea" id=${sectionName}[${roshSummaries[1].questionNumber}] name=${sectionName}[${roshSummaries[1].questionNumber}] rows="8">${roshSummaries[1].answer}</textarea>
          </div>`)
    })
  })
})
