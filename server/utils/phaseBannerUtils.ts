export const supportEmail = 'cas2support@digital.justice.gov.uk'
export const feedbackSurveyUrl =
  'https://forms.office.com/Pages/ResponsePage.aspx?id=KEeHxuZx_kGp4S6MNndq2KxXUZ1jbxlMsEoiPoZPWGNURVpKVERMMzRYOEpYS1cwVVBDUTZQUThFSS4u'

export const getContent = () => {
  return `This is a new service. <a class="govuk-link" rel="noreferrer noopener" target="_blank" href="${feedbackSurveyUrl}">Complete our feedback form</a> (opens in new tab) or <a class="govuk-link" href="mailto:${supportEmail}">email us</a> (${supportEmail}) to report a bug`
}
