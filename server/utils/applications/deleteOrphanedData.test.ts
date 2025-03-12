import deleteOrphanedFollowOnAnswers from './deleteOrphanedData'

describe('deleteOrphanedFollowOnAnswers', () => {
  describe('funding-information', () => {
    describe('when fundingSource is personalSavings', () => {
      const applicationData = {
        'funding-information': {
          'funding-source': {
            fundingSource: 'personalSavings',
          },
          identification: {
            idDocuments: 'passport',
          },
          'alternative-identification': {
            alternativeIDDocuments: 'citizenCard',
          },
        },
      }

      it('removes identification and alternative-identification data', () => {
        expect(deleteOrphanedFollowOnAnswers(applicationData)).toEqual({
          'funding-information': {
            'funding-source': {
              fundingSource: 'personalSavings',
            },
          },
        })
      })
    })
  })

  describe('equality-and-diversity-monitoring', () => {
    describe('when willAnswer is set to no', () => {
      const applicationData = {
        'equality-and-diversity-monitoring': {
          'will-answer-equality-questions': {
            willAnswer: 'no',
          },
          disability: {
            hasDisability: 'no',
          },
          'sex-and-gender': {
            sex: 'female',
            gender: 'yes',
          },
          'sexual-orientation': {
            orientation: 'gay',
          },
          'ethnic-group': {
            ethnicGroup: 'white',
          },
          'white-background': {
            whiteBackground: 'english',
          },
          religion: {
            religion: 'atheist',
          },
          'military-veteran': {
            isVeteran: 'yes',
          },
          'care-leaver': {
            isCareLeaver: 'no',
          },
          'parental-carer-responsibilities': {
            hasParentalOrCarerResponsibilities: 'yes',
          },
          'marital-status': {
            maritalStatus: 'widowed',
          },
        },
      }

      it('removes all equality and diversity data', () => {
        expect(deleteOrphanedFollowOnAnswers(applicationData)).toEqual({
          'equality-and-diversity-monitoring': {
            'will-answer-equality-questions': {
              willAnswer: 'no',
            },
          },
        })
      })
    })
  })

  describe('offending-history', () => {
    describe('when hasAnyPreviousConvictions is set to no', () => {
      const applicationData = {
        'offending-history': {
          'any-previous-convictions': { hasAnyPreviousConvictions: 'no' },
          'offence-history-data': [
            {
              offenceGroupName: 'Arson (09000)',
              offenceCategory: 'Arson',
              'offenceDate-day': '5',
              'offenceDate-month': '6',
              'offenceDate-year': '1940',
              sentenceLength: '3 years',
              summary: 'summary detail',
            },
            {
              offenceGroupName: 'Stalking (08000)',
              offenceCategory: 'Stalking',
              'offenceDate-day': '6',
              'offenceDate-month': '7',
              'offenceDate-year': '2023',
              sentenceLength: '2 months',
              summary: 'more summary detail',
            },
          ],
          'offence-history': {},
        },
      }

      it('removes offence history data', () => {
        expect(deleteOrphanedFollowOnAnswers(applicationData)).toEqual({
          'offending-history': {
            'any-previous-convictions': { hasAnyPreviousConvictions: 'no' },
            'offence-history': {},
          },
        })
      })
    })

    describe('when hasAnyPreviousConvictions is set to yesNoRelevantRisk', () => {
      const applicationData = {
        'offending-history': {
          'any-previous-convictions': { hasAnyPreviousConvictions: 'yesNoRelevantRisk' },
          'offence-history-data': [
            {
              offenceGroupName: 'Arson (09000)',
              offenceCategory: 'Arson',
              'offenceDate-day': '5',
              'offenceDate-month': '6',
              'offenceDate-year': '1940',
              sentenceLength: '3 years',
              summary: 'summary detail',
            },
            {
              offenceGroupName: 'Stalking (08000)',
              offenceCategory: 'Stalking',
              'offenceDate-day': '6',
              'offenceDate-month': '7',
              'offenceDate-year': '2023',
              sentenceLength: '2 months',
              summary: 'more summary detail',
            },
          ],
          'offence-history': {},
        },
      }

      it('removes offence history data', () => {
        expect(deleteOrphanedFollowOnAnswers(applicationData)).toEqual({
          'offending-history': {
            'any-previous-convictions': { hasAnyPreviousConvictions: 'yesNoRelevantRisk' },
            'offence-history': {},
          },
        })
      })
    })
  })

  describe('address-history', () => {
    describe('when hasPreviousAddresses is set to no', () => {
      const applicationData = {
        'address-history': {
          'previous-address': {
            hasPreviousAddress: 'no',
            previousAddressLine1: '1 Example Road',
            previousAddressLine2: 'Pretend Close',
            previousTownOrCity: 'Aberdeen',
            previousCounty: 'Gloucestershire',
            previousPostcode: 'AB1 2CD',
          },
        },
      }

      it('removes previous address history data', () => {
        expect(deleteOrphanedFollowOnAnswers(applicationData)).toEqual({
          'address-history': {
            'previous-address': {
              hasPreviousAddress: 'no',
            },
          },
        })
      })
    })

    describe('when hasPreviousAddresses is set to yes', () => {
      const applicationData = {
        'address-history': {
          'previous-address': {
            hasPreviousAddress: 'yes',
            howLong: '6 months',
            lastKnownAddressLine1: '1 Example Road',
            lastKnownAddressLine2: 'Pretend Close',
            lastKnownTownOrCity: 'Aberdeen',
            lastKnownCounty: 'Gloucestershire',
            lastKnownPostcode: 'AB1 2CD',
          },
        },
      }

      it('removes last known address history data', () => {
        expect(deleteOrphanedFollowOnAnswers(applicationData)).toEqual({
          'address-history': {
            'previous-address': {
              hasPreviousAddress: 'yes',
            },
          },
        })
      })
    })
  })

  describe('risk-of-serious-harm', () => {
    describe('when hasOldOasys is set to no', () => {
      const applicationData = {
        'risk-of-serious-harm': {
          'old-oasys': {
            hasOldOasys: 'no',
            oasysCompletedDate: '2025-02-03',
            'oasysCompletedDate-year': '2025',
            'oasysCompletedDate-month': '2',
            'oasysCompletedDate-day': '3',
          },
        },
      }

      it('removes previous old oasys data', () => {
        expect(deleteOrphanedFollowOnAnswers(applicationData)).toEqual({
          'risk-of-serious-harm': {
            'old-oasys': {
              hasOldOasys: 'no',
            },
          },
        })
      })
    })

    describe('when hasOldOasys is set to yes and there is existing manual RoSH Summary information', () => {
      const applicationData = {
        'risk-of-serious-harm': {
          'old-oasys': {
            hasOldOasys: 'yes',
            oasysCompletedDate: '2025-02-03',
            'oasysCompletedDate-year': '2025',
            'oasysCompletedDate-month': '2',
            'oasysCompletedDate-day': '3',
          },
          'manual-rosh-information': {
            riskToChildren: 'Low',
            riskToPublic: 'Medium',
            riskToKnownAdult: 'High',
            riskToStaff: 'Very high',
            overallRisk: 'Very high',
            createdAt: '2025-03-12T12:25:29.337Z',
          },
        },
      }

      it('removes previous manual RoSH summary information', () => {
        expect(deleteOrphanedFollowOnAnswers(applicationData)).toEqual({
          'risk-of-serious-harm': {
            'old-oasys': {
              hasOldOasys: 'yes',
              oasysCompletedDate: '2025-02-03',
              'oasysCompletedDate-year': '2025',
              'oasysCompletedDate-month': '2',
              'oasysCompletedDate-day': '3',
            },
          },
        })
      })
    })
  })
})
