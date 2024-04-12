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
})
