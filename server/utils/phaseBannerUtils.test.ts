import { getContent } from './phaseBannerUtils'

describe('PhaseBannerUtils', () => {
  it('returns the phase banner content', () => {
    const content = `This is a new service. <a class="govuk-link" rel="noreferrer noopener" target="_blank" href="https://forms.office.com/Pages/ResponsePage.aspx?id=KEeHxuZx_kGp4S6MNndq2KxXUZ1jbxlMsEoiPoZPWGNURVpKVERMMzRYOEpYS1cwVVBDUTZQUThFSS4u">Complete our feedback form</a> (opens in new tab). To get help or report a bug, contact the Service Desk (open <a class="govuk-link" href="https://mojprod.service-now.com/moj_sp?id=sc_cat_item&sys_id=5a2f4eff1bbf1690a1e2ddf0b24bcb34">a support ticket</a> or call 0800 917 5148 or #6598 from inside an establishment).`

    expect(getContent()).toEqual(content)
  })
})
