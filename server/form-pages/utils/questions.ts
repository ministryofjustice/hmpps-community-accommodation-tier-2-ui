export const getQuestions = (name: string) => {
  const yesOrNo = { yes: 'Yes', no: 'No' }
  const yesNoOrIDontKnow = { yes: 'Yes', no: 'No', dontKnow: `I don't know` }

  const dateExample = '27 3 2023'

  const offenceCategory = {
    question: 'Offence type',
    answers: {
      stalkingOrHarassment: 'Stalking or Harassment',
      weaponsOrFirearms: 'Weapons or Firearms',
      arson: 'Arson',
      violence: 'Violence',
      domesticAbuse: 'Domestic abuse',
      hateCrime: 'Hate crime',
      drugs: 'Drugs',
      other: 'Other',
    },
  }

  const offenceSummaryHintHtml =
    '<div id="offence-details-hint" class="govuk-hint"> <p class="govuk-hint">Include:</p> <ul class="govuk-list govuk-list--bullet govuk-hint"> <li>what happened (excluding names and other sensitive information)</li> <li>where it happened (excluding addresses)</li><li>when it happened</li><li>damage or injury caused</li><li>weapon type</li><li>motivations for the offence</li><li>if a violent offence, the relationship to the victim</li></ul></div>'

  return {
    'confirm-eligibility': {
      'confirm-eligibility': {
        isEligible: {
          question: `Is ${name} eligible for Short-Term Accommodation (CAS-2)?`,
          answers: {
            yes: `Yes, I confirm ${name} is eligible`,
            no: `No, ${name} is not eligible`,
          },
        },
      },
    },
    'confirm-consent': {
      'confirm-consent': {
        hasGivenConsent: {
          question: `Has ${name} given their consent to apply for CAS-2?`,
          answers: {
            yes: `Yes, ${name} has given their consent`,
            no: `No, ${name} has not given their consent`,
          },
        },
        consentDate: {
          question: 'When did they give consent?',
          hint: `For example, ${dateExample}`,
        },
        consentRefusalDetail: {
          question: 'Why was consent refused?',
        },
      },
    },
    'hdc-licence-dates': {
      'hdc-licence-dates': {
        hdcEligibilityDate: {
          question: `What is ${name}'s HDC eligibility date?`,
          hint: `For example, ${dateExample}`,
        },
        conditionalReleaseDate: {
          question: `What is ${name}'s conditional release date?`,
          hint: `For example, ${dateExample}`,
        },
      },
    },
    'referrer-details': {
      'confirm-details': {
        name: { question: 'Name' },
        email: { question: 'Email address' },
      },
      'job-title': {
        jobTitle: { question: 'What is your job title?', hint: 'For example, Prison Offender Manager (POM)' },
      },
      'contact-number': {
        telephone: {
          question: 'What is your contact telephone number?',
          hint: 'This will be used for any communication from the accommodation supplier',
        },
      },
    },
    'information-needed-from-applicant': {
      'information-needed-from-applicant': {
        hasInformationNeeded: {
          question: 'Have you got all the information you need from the applicant?',
          answers: yesOrNo,
        },
      },
    },
    'personal-information': {
      'working-mobile-phone': {
        hasWorkingMobilePhone: {
          question: `Will ${name} have a working mobile phone when they are released?`,
        },
        mobilePhoneNumber: {
          question: 'What is their mobile number? (Optional)',
        },
        isSmartPhone: {
          question: 'Is their mobile a smart phone?',
        },
      },
      'immigration-status': {
        immigrationStatus: {
          question: `What is ${name}'s immigration status?`,
          hint: 'Select their immigration status',
          answers: {
            ukCitizen: 'UK citizen',
            leaveToRemain: 'Leave to remain',
            indefiniteLeaveToRemain: 'Indefinite leave to remain',
            discretionaryLeaveToRemain: 'Discretionary leave to remain',
            eeaNational: 'EEA national',
            refugee: 'Refugee',
            asylumSeekerAwaitingDecision: 'Asylum seeker awaiting decision',
            spousePartnerSponsorship: 'Spouse or partner sponsorship',
            workVisa: 'Work visa',
            studyVisa: 'Study visa',
            notKnown: 'Not known',
          },
        },
      },
      'pregnancy-information': {
        isPregnant: {
          question: `Is ${name} pregnant?`,
          answers: yesNoOrIDontKnow,
        },
        dueDate: {
          question: 'When is their due date?',
          hint: `For example, ${dateExample}`,
        },
      },
      'support-worker-preference': {
        hasSupportWorkerPreference: {
          question: `Does ${name} have a gender preference for their support worker?`,
          answers: yesNoOrIDontKnow,
        },
        supportWorkerPreference: {
          question: 'What is their preference?',
          answers: { male: 'Male', female: 'Female' },
        },
      },
    },
    'address-history': {
      'previous-address': {
        hasPreviousAddress: {
          question: `Did ${name} have an address before entering custody?`,
          answers: {
            yes: 'Yes',
            no: 'No fixed address',
          },
        },
        knownAddress: {
          question: 'What was the address?',
        },
        lastKnownAddress: {
          question: 'What was their last known address? (Optional)',
        },
        howLong: {
          question: 'How long did the applicant have no fixed address for?',
        },
      },
    },
    'equality-and-diversity-monitoring': {
      'will-answer-equality-questions': {
        willAnswer: {
          question: `Equality questions for ${name}`,
          answers: {
            yes: 'Yes, answer the equality questions (takes 2 minutes)',
            no: 'No, skip the equality questions',
          },
        },
      },
      disability: {
        hasDisability: {
          question: `Does ${name} have a disability?`,
          answers: {
            yes: 'Yes',
            no: 'No',
            preferNotToSay: 'Prefer not to say',
          },
        },
        typeOfDisability: {
          question: `What type of disability?`,
          hint: 'Select all that apply',
          answers: {
            sensoryImpairment: 'Sensory impairment',
            physicalImpairment: 'Physical impairment',
            learningDisability: 'Learning disability or difficulty',
            mentalHealth: 'Mental health condition',
            illness: 'Long-standing illness',
            other: 'Other',
          },
        },
        otherDisability: { question: 'What is the disability?' },
      },
      'sex-and-gender': {
        sex: {
          question: `What is ${name}'s sex?`,
          answers: {
            female: 'Female',
            male: 'Male',
            preferNotToSay: 'Prefer not to say',
          },
        },
        gender: {
          question: `Is the gender ${name} identifies with the same as the sex registered at birth?`,
          answers: {
            yes: 'Yes',
            no: 'No',
            preferNotToSay: 'Prefer not to say',
          },
        },
        optionalGenderIdentity: { question: 'What is their gender identity? (optional)' },
      },
      'sexual-orientation': {
        orientation: {
          question: `Which of the following best describes ${name}'s sexual orientation?`,
          answers: {
            heterosexual: 'Heterosexual or straight',
            gay: 'Gay',
            lesbian: 'Lesbian',
            bisexual: 'Bisexual',
            other: 'Other',
            preferNotToSay: 'Prefer not to say',
          },
        },
        otherOrientation: { question: 'How would they describe their sexual orientation? (optional)' },
      },
      'ethnic-group': {
        ethnicGroup: {
          question: `What is ${name}'s ethnic group?`,
          answers: {
            white: 'White',
            mixed: 'Mixed or multiple ethnic groups',
            asian: 'Asian or Asian British',
            black: 'Black, African, Caribbean or Black British',
            other: 'Other ethnic group',
            preferNotToSay: 'Prefer not to say',
          },
        },
      },
      'asian-background': {
        asianBackground: {
          question: `Which of the following best describes ${name}'s Asian or Asian British background?`,
          answers: {
            indian: 'Indian',
            pakistani: 'Pakistani',
            chinese: 'Chinese',
            bangladeshi: 'Bangladeshi',
            other: 'Any other Asian background',
            preferNotToSay: 'Prefer not to say',
          },
        },
        optionalAsianBackground: { question: 'How would they describe their background? (optional)' },
      },
      'black-background': {
        blackBackground: {
          question: `Which of the following best describes ${name}'s Black, African, Caribbean or Black British background?`,
          answers: {
            african: 'African',
            caribbean: 'Caribbean',
            other: 'Any other Black, African or Caribbean background',
            preferNotToSay: 'Prefer not to say',
          },
        },
        optionalBlackBackground: { question: 'How would they describe their background? (optional)' },
      },
      'white-background': {
        whiteBackground: {
          question: `Which of the following best describes ${name}'s White background?`,
          answers: {
            english: 'English, Welsh, Scottish, Northern Irish or British',
            irish: 'Irish',
            gypsy: 'Gypsy or Irish Traveller',
            other: 'Any other White background',
            preferNotToSay: 'Prefer not to say',
          },
        },
        optionalWhiteBackground: { question: 'How would they describe their background? (optional)' },
      },
      'mixed-background': {
        mixedBackground: {
          question: `Which of the following best describes ${name}'s mixed or multiple ethnic groups background?`,
          answers: {
            whiteAndBlackCaribbean: 'White and Black Caribbean',
            whiteAndBlackAfrican: 'White and Black African',
            whiteAndAsian: 'White and Asian',
            other: 'Any other mixed or multiple ethnic background',
            preferNotToSay: 'Prefer not to say',
          },
        },
        optionalMixedBackground: { question: 'How would they describe their background? (optional)' },
      },
      'other-background': {
        otherBackground: {
          question: `Which of the following best describes ${name}'s background?`,
          answers: {
            arab: 'Arab',
            other: 'Any other ethnic group',
            preferNotToSay: 'Prefer not to say',
          },
        },
        optionalOtherBackground: { question: 'How would they describe their background? (optional)' },
      },
      religion: {
        religion: {
          question: `What is ${name}'s religion?`,
          answers: {
            noReligion: 'No religion',
            atheist: 'Atheist or Humanist',
            agnostic: 'Agnostic',
            christian: 'Christian',
            buddhist: 'Buddhist',
            hindu: 'Hindu',
            jewish: 'Jewish',
            muslim: 'Muslim',
            sikh: 'Sikh',
            other: 'Any other religion',
            preferNotToSay: 'Prefer not to say',
          },
        },
        otherReligion: { question: 'What is their religion? (optional)' },
      },
      'military-veteran': {
        isVeteran: {
          question: `Is ${name} a military veteran?`,
          answers: yesNoOrIDontKnow,
        },
      },
      'care-leaver': {
        isCareLeaver: {
          question: `Is ${name} a care leaver?`,
          answers: yesNoOrIDontKnow,
        },
      },
      'parental-carer-responsibilities': {
        hasParentalOrCarerResponsibilities: {
          question: `Does ${name} have parental or carer responsibilities?`,
          answers: yesNoOrIDontKnow,
        },
      },
      'marital-status': {
        maritalStatus: {
          question: `What is ${name}'s legal marital or registered civil partnership status?`,
          answers: {
            neverMarried: 'Never married and never registered in a civil partnership',
            married: 'Married',
            inCivilPartnership: 'In a registered civil partnership',
            marriedButSeparated: 'Separated, but still legally married',
            inCivilPartnershipButSeparated: 'Separated, but still legally in a civil partnership',
            divorced: 'Divorced',
            formerlyInCivilPartnershipNowDissolved: 'Formerly in a civil partnership which is now legally dissolved',
            widowed: 'Widowed',
            survivingPartnerFromCivilPartnership: 'Surviving partner from a registered civil partnership',
            preferNotToSay: 'Prefer not to say',
          },
        },
      },
    },
    'area-information': {
      'first-preferred-area': {
        preferredArea: {
          question: 'First preferred area',
          hint: 'Specify a town, city or region',
        },
        preferenceReason: {
          question: 'Reason for first preference',
          hint: 'Include the type of local connection the applicant has with the area',
        },
      },
      'second-preferred-area': {
        preferredArea: {
          question: 'Second preferred area',
          hint: 'Specify a town, city or region',
        },
        preferenceReason: {
          question: 'Reason for second preference',
          hint: 'Include the type of local connection the applicant has with the area',
        },
      },
      'exclusion-zones': {
        hasExclusionZones: {
          question: `Does ${name} have any exclusion zones?`,
          answers: yesOrNo,
        },
        exclusionZonesDetail: {
          question: 'Provide the required safeguarding details about the exclusion zone',
        },
      },
      'gang-affiliations': {
        hasGangAffiliations: {
          question: `Does ${name} have any gang affiliations?`,
          answers: yesOrNo,
        },
        gangName: {
          question: 'What is the name of the gang?',
        },
        gangOperationArea: {
          question: 'Where do they operate?',
        },
        rivalGangDetail: {
          question: 'Name any known rival gangs and where they operate (optional)',
        },
      },
      'family-accommodation': {
        familyProperty: {
          question: 'Do they want to apply to live with their children in a family property?',
          answers: yesOrNo,
        },
      },
    },
    'funding-information': {
      'funding-source': {
        fundingSource: {
          question: `How will ${name} pay for their accommodation and service charge?`,
          hint: 'Applicants must pay for a weekly service charge using their personal money or wages. This service charge is not eligible to be covered by Housing Benefit.',
          answers: {
            personalSavings: 'Personal money or wages',
            benefits: 'Housing Benefit and personal money or wages',
          },
        },
      },
      'national-insurance': {
        nationalInsuranceNumber: {
          question: `What is ${name}'s National Insurance number? (Optional)`,
          hint: 'We need this to set up a Universal Credit and Housing Benefit claim if required.',
        },
      },
      identification: {
        idDocuments: {
          question: `What identification documentation (ID) does ${name} have?`,
          hint: 'Expired ID will be accepted. Select all that apply.',
          answers: {
            passport: 'Passport',
            travelPass: 'Travel pass with photograph',
            birthCertificate: 'Birth certificate',
            bankOrDebitCard: 'Bank account or debit card',
            bankStatements: 'Bank, building society or Post Office card account statements',
            drivingLicence: 'UK photo driving licence',
            wageSlip: 'Recent wage slip',
            none: 'None of these options',
          },
        },
      },
      'alternative-identification': {
        alternativeIDDocuments: {
          question: `What alternative identification documentation (ID) does ${name} have?`,
          hint: 'Expired ID will be accepted. Select all that apply.',
          answers: {
            contract: 'Employer letter/contract of employment',
            tradeUnion: 'Trade union membership card',
            invoice: 'Invoices (self-employed)',
            hmrc: 'HMRC correspondence',
            citizenCard: 'CitizenCard',
            foreignBirthCertificate: 'Foreign birth certificate',
            citizenCertificate: 'British citizen registration/naturalisation certificate',
            residenceCard: 'Permanent residence card',
            residencePermit: 'Residence permit',
            biometricResidencePermit: 'Biometric Residence Permit',
            laRentCard: 'Local authority rent card',
            marriageCertificate: 'Original marriage/civil partnership certificate',
            divorcePapers: 'Divorce or annulment papers',
            dissolutionPapers: 'Dissolution of marriage/civil partnership papers',
            buildingSociety: 'Building society passbook',
            councilTax: 'Council tax documents',
            insurance: 'Life assurance or insurance policies',
            chequeBook: 'Personal cheque book',
            mortgage: 'Mortgage repayment policies',
            savingAccount: 'Saving account book',
            studentID: 'Student ID card',
            educationalInstitution: 'Educational institution letter (student)',
            youngScot: 'Young Scot card',
            deedPoll: 'Deed poll certificate',
            vehicleRegistration: 'Vehicle registration/motor insurance documents',
            nhsCard: 'NHS medical card',
            other: 'Other type of identification',
            none: 'No ID available',
          },
        },
        other: { question: `What other ID does ${name} have?` },
      },
    },
    'health-needs': {
      'substance-misuse': {
        usesIllegalSubstances: {
          question: 'Do they take any illegal substances in custody?',
          answers: yesOrNo,
        },
        substanceMisuse: { question: 'What substances do they take?' },
        pastSubstanceMisuse: {
          question: 'Did they have any past issues with substance misuse before custody?',
          answers: yesOrNo,
        },
        pastSubstanceMisuseDetail: {
          question: 'Describe their previous substance misuse',
          hint: 'Include previous substance misuse that support would be needed for or that could lead to potential issues in a CAS-2 placement. For example, relapse prevention support, substitute medication or risk of overdose',
        },
        engagedWithDrugAndAlcoholService: {
          question: 'Are they engaged with a drug and alcohol service in custody?',
          answers: yesOrNo,
        },
        intentToReferToServiceOnRelease: {
          question: 'Is there an intention to refer them to a drug and alcohol service when they are released?',
          answers: yesOrNo,
        },
        drugAndAlcoholServiceDetail: { question: 'Name the drug and alcohol service (optional)' },
        requiresSubstituteMedication: {
          question: 'Do they require any substitute medication for misused substances?',
          answers: yesOrNo,
        },
        substituteMedicationDetail: { question: 'What substitute medication do they take?' },
        releasedWithNaloxone: {
          question: 'Are they being released with naloxone?',
          answers: yesNoOrIDontKnow,
        },
      },
      'physical-health': {
        hasPhyHealthNeeds: { question: 'Do they have any physical health needs?', answers: yesOrNo },
        needsDetail: { question: 'Please describe their needs.' },
        canClimbStairs: {
          question: 'Can they climb stairs?',
        },
        isReceivingMedicationOrTreatment: {
          question: 'Are they currently receiving any medication or treatment for their physical health?',
          answers: yesOrNo,
        },
        medicationOrTreatmentDetail: {
          question: 'Describe the medication or treatment',
        },
        medicationDetail: { question: 'Describe the medication they receive for physical health needs' },
        canLiveIndependently: { question: 'Can they live independently?', answers: yesOrNo },
        indyLivingDetail: { question: 'Describe why they are unable to live independently' },
        requiresAdditionalSupport: {
          question: 'Do they require any additional support?',
          answers: yesOrNo,
        },
        addSupportDetail: { question: 'Please describe the types of support.' },
      },
      'mental-health': {
        hasMentalHealthNeeds: { question: 'Do they have any mental health needs?', answers: yesOrNo },
        needsDetail: { question: 'Please describe their mental health needs.' },
        needsPresentation: { question: 'How are they presenting?' },
        isEngagedWithCommunity: {
          question: 'Were they engaged in mental health services before custody?',
          answers: yesOrNo,
        },
        servicesDetail: { question: 'Please state which services.' },
        isEngagedWithServicesInCustody: {
          question: 'Are they engaged with any mental health services in custody?',
          answers: yesOrNo,
        },
        areIntendingToEngageWithServicesAfterCustody: {
          question: 'Are they intending to engage with mental health services after custody?',
          answers: yesNoOrIDontKnow,
        },
        canManageMedication: {
          question: 'Can they manage their own mental health medication on release?',
          answers: {
            yes: 'Yes',
            no: 'No',
            notPrescribedMedication: 'They are not prescribed medication for their mental health',
          },
        },
        canManageMedicationNotes: {
          question: 'Provide any relevant medication notes (optional)',
          hint: 'For example, storage requirements',
        },
        medicationIssues: {
          question: 'Describe the issues they have with taking their medication',
        },
        cantManageMedicationNotes: {
          question: 'Provide any relevant medication notes (optional)',
          hint: 'For example, storage requirements',
        },
      },
      'communication-and-language': {
        requiresInterpreter: { question: 'Do they need an interpreter?', answers: yesOrNo },
        interpretationDetail: { question: 'What language do they need an interpreter for?' },
        hasSupportNeeds: {
          question: 'Do they need any support to see, hear, speak, or understand?',
          answers: yesOrNo,
        },
        supportDetail: { question: 'Please describe their support needs.' },
      },
      'learning-difficulties': {
        hasLearningNeeds: {
          question: 'Do they have any additional needs relating to learning difficulties or neurodiversity?',
          answers: yesOrNo,
        },
        needsDetail: { question: 'Please describe their additional needs.' },
        isVulnerable: {
          question: 'Are they vulnerable as a result of this condition?',
          answers: yesOrNo,
        },
        vulnerabilityDetail: { question: 'Please describe their level of vulnerability.' },
        hasDifficultyInteracting: {
          question: 'Do they have difficulties interacting with other people as a result of this condition?',
          answers: yesOrNo,
        },
        interactionDetail: { question: 'Please describe these difficulties.' },
        requiresAdditionalSupport: { question: 'Is additional support required?', answers: yesOrNo },
        addSupportDetail: { question: 'Please describe the type of support.' },
      },
      'brain-injury': {
        hasBrainInjury: {
          question: 'Do they have a brain injury?',
          answers: yesOrNo,
        },
        injuryDetail: { question: 'Please describe their brain injury and needs.' },
        isVulnerable: {
          question: 'Are they vulnerable as a result of this injury?',
          answers: yesOrNo,
        },
        vulnerabilityDetail: { question: 'Please describe their level of vulnerability.' },
        hasDifficultyInteracting: {
          question: 'Do they have difficulties interacting with other people as a result of this injury?',
          answers: yesOrNo,
        },
        interactionDetail: { question: 'Please describe these difficulties.' },
        requiresAdditionalSupport: { question: 'Is additional support required?', answers: yesOrNo },
        addSupportDetail: { question: 'Please describe the type of support.' },
      },
      'other-health': {
        hasLongTermHealthCondition: {
          question: 'Are they managing any long term health conditions?',
          hint: 'For example, diabetes, arthritis or high blood pressure.',
          answers: yesOrNo,
        },
        healthConditionDetail: {
          question: 'Please describe the long term health conditions.',
        },
        hasHadStroke: { question: 'Have they experienced a stroke?', answers: yesOrNo },
        hasSeizures: { question: 'Do they experience seizures?', answers: yesOrNo },
        seizuresDetail: {
          question: 'Please describe the type and any treatment.',
        },
        beingTreatedForCancer: {
          question: 'Are they currently receiving regular treatment for cancer?',
          answers: yesOrNo,
        },
      },
    },
    'risk-to-self': {
      'old-oasys': {
        hasOldOasys: {
          question: `Does ${name} have an older OASys with risk to self information?`,
          answers: { yes: 'Yes', no: 'No, they do not have an OASys' },
        },
        oasysCompletedDate: {
          question: 'When was the OASys completed?',
          hint: `For example, ${dateExample}`,
        },
      },
      vulnerability: {
        vulnerabilityDetail: {
          question: `Describe ${name}'s current circumstances, issues and needs related to vulnerability`,
          hint: 'Include all current risk information and remove sensitive information, such as names and addresses.',
        },
        confirmation: {
          question: 'I confirm this information is relevant and up to date.',
          answers: { confirmed: 'Confirmed' },
        },
      },
      'current-risk': {
        currentRiskDetail: {
          question: `Describe ${name}'s current issues and needs related to self harm and suicide`,
          hint: 'Include all current risk information and remove sensitive information, such as names and addresses.',
        },
        confirmation: {
          question: 'I confirm this information is relevant and up to date.',
          answers: { confirmed: 'Confirmed' },
        },
      },
      'historical-risk': {
        historicalRiskDetail: {
          question: `Describe ${name}'s historical issues and needs related to self harm and suicide`,
          hint: 'Remove sensitive information, such as names and addresses.',
        },
        confirmation: {
          question: 'I confirm this information is relevant and up to date.',
          answers: { confirmed: 'Confirmed' },
        },
      },
      'acct-data': {
        createdDate: {
          question: 'When was the ACCT created?',
          hint: 'For example, 22 4 2003',
        },
        isOngoing: {
          question: 'Is the ACCT ongoing?',
        },
        closedDate: {
          question: 'When was the ACCT closed?',
          hint: 'For example, 22 4 2003',
        },
        referringInstitution: {
          question: 'Referring institution',
          hint: 'Where the applicant was based at the time the ACCT was created',
        },
        acctDetail: {
          question: 'Details about the ACCT',
        },
      },
      'additional-information': {
        hasAdditionalInformation: {
          question: `Is there anything else to include about ${name}'s risk to self?`,
          hint: 'Record any additional information about their risk to self.',
          answers: yesOrNo,
        },
        additionalInformationDetail: { question: 'Additional information' },
      },
    },
    'risk-of-serious-harm': {
      summary: {
        status: 'retrieved',
        overallRisk: { question: 'Overall risk' },
        riskToChildren: { question: 'Risk to children' },
        riskToPublic: { question: 'Risk to the public' },
        riskToKnownAdult: { question: 'Risk to a known adult' },
        riskToStaff: { question: 'Risk to staff' },
        additionalComments: { question: 'Additional comments (optional)' },
      },
      'old-oasys': {
        hasOldOasys: {
          question: `Does ${name} have an older OASys with risk of serious harm (RoSH) information?`,
          answers: { yes: 'Yes', no: 'No, they do not have an OASys' },
        },
        oasysCompletedDate: {
          question: 'When was the OASys completed?',
          hint: `For example, ${dateExample}`,
        },
      },
      'risk-to-others': {
        whoIsAtRisk: {
          question: 'Who is at risk?',
        },
        natureOfRisk: {
          question: 'What is the nature of the risk?',
        },
        confirmation: {
          question: 'I confirm this information is relevant and up to date.',
          answers: { confirmed: 'Confirmed' },
        },
      },
      'risk-management-arrangements': {
        arrangements: {
          question: `Is ${name} subject to any of these multi-agency risk management arrangements upon release?`,
          hint: 'Select all that apply',
          answers: {
            mappa: 'MAPPA',
            marac: 'MARAC',
            iom: 'IOM',
          },
        },
        mappaDetails: {
          question: 'Provide MAPPA details',
          hint: 'Specify whether the MAPPA is Category 2 or Category 3. Include lead contact details where possible.',
        },
        maracDetails: {
          question: 'Provide MARAC details',
          hint: 'Include lead contact details where possible.',
        },
        iomDetails: {
          question: 'Provide IOM details',
          hint: 'Include lead contact details where possible.',
        },
      },
      'cell-share-information': {
        hasCellShareComments: {
          question: 'Are there any comments to add about cell sharing?',
          answers: yesOrNo,
        },
        cellShareInformationDetail: { question: 'Cell sharing information' },
      },
      'additional-risk-information': {
        hasAdditionalInformation: {
          question: `Is there any other risk information for ${name}?`,
          hint: 'If known, state their incentive level, also known as Incentive and Enhanced Privileges (IEP), and any other information about their risk to others.',
          answers: yesOrNo,
        },
        additionalInformationDetail: { question: 'Additional information' },
      },
    },
    'current-offences': {
      'current-offence-data': {
        titleAndNumber: {
          question: 'Offence title',
          hint: "For example, 'Stalking'",
        },
        offenceCategory,
        offenceDate: {
          question: 'When did they commit the offence?',
          hint: `For example, ${dateExample}`,
        },
        sentenceLength: {
          question: 'How long were they sentenced for?',
          hint: 'For example, 6 months',
        },
        summary: {
          question: 'Provide a summary of the offence',
          hint: offenceSummaryHintHtml,
        },
        outstandingCharges: {
          question: `Are there outstanding charges committed prior to the current sentence?`,
          answers: yesOrNo,
        },
        outstandingChargesDetail: {
          question: 'Details of any outstanding charges',
        },
      },
    },
    'offending-history': {
      'any-previous-convictions': {
        hasAnyPreviousConvictions: {
          question: `Does ${name} have any previous unspent convictions?`,
          answers: {
            yesRelevantRisk: 'Yes, and there is relevant risk',
            yesNoRelevantRisk: 'Yes, but there is no relevant risk',
            no: 'No, they do not have any previous unspent convictions',
          },
        },
      },
      'offence-history-data': {
        offenceGroupName: {
          question: 'Offence group name',
          hint: 'For example, grievous bodily harm (GBH)',
        },
        offenceCategory,
        numberOfOffences: {
          question: 'Number of offences',
          hint: 'The number of the same offence type. For example, 3',
        },
        sentenceTypes: {
          question: 'Sentence type(s)',
          hint: 'For example, 1 custodial and 1 suspended',
        },
        summary: {
          question: 'Offence details',
          hint: offenceSummaryHintHtml,
        },
      },
    },
    'cpp-details-and-hdc-licence-conditions': {
      'cpp-details': {
        cppDetails: {
          question: `Who is ${name}'s Community Probation Practitioner (CPP)?`,
          hint: 'A Community Probation Practitioner (CPP) is also known as Community Offender Manager (COM).',
        },
      },
      'non-standard-licence-conditions': {
        nonStandardLicenceConditions: {
          question: `Does ${name} have any non-standard licence conditions?`,
          answers: yesNoOrIDontKnow,
          hint: 'Check with their Community Probation Practitioner (CPP), also known as Community Offender Manager (COM). Non-standard licence conditions may also be in NDelius.',
        },
        nonStandardLicenceConditionsDetail: {
          question: 'Describe the conditions',
        },
      },
    },
  }
}
