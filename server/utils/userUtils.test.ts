import { sectionsForUser, sections } from './userUtils'

describe('userUtils', () => {
  describe('sectionsForUser', () => {
    it('should return an empty array for a user with no roles', () => {
      expect(sectionsForUser([])).toEqual([])
    })

    it('should return correct sections for a POM', () => {
      const expected = [sections.referral, sections.newReferral]
      expect(sectionsForUser(['ROLE_POM'])).toEqual(expected)
    })

    it('should return correct sections for an admin', () => {
      const expected = [sections.referral, sections.newReferral, sections.submittedApplications]
      expect(sectionsForUser(['ROLE_CAS2_ADMIN'])).toEqual(expected)
    })

    it('should return correct sections for a management information user', () => {
      const expected = [sections.managementInformationReports]
      expect(sectionsForUser(['ROLE_CAS2_MI'])).toEqual(expected)
    })
  })
})
