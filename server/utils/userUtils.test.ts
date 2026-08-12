import { sectionsForUser, sections } from './userUtils'
import config from '../config'

describe('userUtils', () => {
  describe('sectionsForUser', () => {
    beforeEach(() => {
      config.flags.hdcSunsetPhase1StopNewApplications = false
    })

    it('should return an empty array for a user with no roles', () => {
      expect(sectionsForUser([])).toEqual([])
    })

    it('should return correct sections for a POM', () => {
      const expected = [sections.applications, sections.newApplication, sections.prisonDashboard]
      expect(sectionsForUser(['ROLE_POM'])).toEqual(expected)
    })

    it('should return the prison dashboard for a Licence CA', () => {
      const expected = [sections.applications, sections.newApplication, sections.prisonDashboard]
      expect(sectionsForUser(['ROLE_LICENCE_CA'])).toEqual(expected)
    })

    it('should return correct sections for an admin', () => {
      const expected = [sections.submittedApplications]
      expect(sectionsForUser(['ROLE_CAS2_ADMIN'])).toEqual(expected)
    })

    it('should return correct sections for a management information user', () => {
      const expected = [sections.managementInformationReports]
      expect(sectionsForUser(['ROLE_CAS2_MI'])).toEqual(expected)
    })

    describe('when the HDC sunset phase 1 stop new applications flag is enabled', () => {
      beforeEach(() => {
        config.flags.hdcSunsetPhase1StopNewApplications = true
      })

      it('should not return the new application section for a POM', () => {
        const expected = [sections.applications, sections.prisonDashboard]
        expect(sectionsForUser(['ROLE_POM'])).toEqual(expected)
      })

      it('should not return the new application section for a Licence CA', () => {
        const expected = [sections.applications, sections.prisonDashboard]
        expect(sectionsForUser(['ROLE_LICENCE_CA'])).toEqual(expected)
      })
    })
  })
})
