import { SummaryListItem } from '@approved-premises/ui'
import {
  convertToTitleCase,
  initialiseName,
  removeBlankSummaryListItems,
  camelToKebabCase,
  kebabToCamelCase,
  formatCommaToLinebreak,
  htmlToPlainText,
  createApplicationSummary,
} from './utils'
import { applicationFactory } from '../testutils/factories'
import { FullPerson } from '@approved-premises/api'

describe('convert to title case', () => {
  it.each([
    [null, null, ''],
    ['empty string', '', ''],
    ['Lower case', 'robert', 'Robert'],
    ['Upper case', 'ROBERT', 'Robert'],
    ['Mixed case', 'RoBErT', 'Robert'],
    ['Multiple words', 'RobeRT SMiTH', 'Robert Smith'],
    ['Leading spaces', '  RobeRT', '  Robert'],
    ['Trailing spaces', 'RobeRT  ', 'Robert  '],
    ['Hyphenated', 'Robert-John SmiTH-jONes-WILSON', 'Robert-John Smith-Jones-Wilson'],
  ])('%s convertToTitleCase(%s, %s)', (_: string, a: string, expected: string) => {
    expect(convertToTitleCase(a)).toEqual(expected)
  })
})

describe('initialise name', () => {
  it.each([
    [null, null, null],
    ['Empty string', '', null],
    ['One word', 'robert', 'r. robert'],
    ['Two words', 'Robert James', 'R. James'],
    ['Three words', 'Robert James Smith', 'R. Smith'],
    ['Double barrelled', 'Robert-John Smith-Jones-Wilson', 'R. Smith-Jones-Wilson'],
  ])('%s initialiseName(%s, %s)', (_: string, a: string, expected: string) => {
    expect(initialiseName(a)).toEqual(expected)
  })
})

describe('removeBlankSummaryListItems', () => {
  it('removes all blank and undefined items', () => {
    const items = [
      {
        key: {
          text: 'Names',
        },
        value: {
          text: 'Name',
        },
      },
      {
        key: {
          text: 'CRN',
        },
        value: {
          text: '',
        },
      },
      {
        key: {
          text: 'Date of Birth',
        },
        value: {
          text: undefined,
        },
      },
      {
        key: {
          text: 'NOMS Number',
        },
        value: {
          html: '<strong>Some HTML</strong>',
        },
      },
      {
        key: {
          text: 'Nationality',
        },
        value: {
          html: undefined,
        },
      },
      {
        key: {
          text: 'Religion',
        },
        value: {
          html: '',
        },
      },
      {
        value: {
          somethingElse: '',
        },
      },
    ] as Array<SummaryListItem>

    expect(removeBlankSummaryListItems(items)).toEqual([
      {
        key: {
          text: 'Names',
        },
        value: {
          text: 'Name',
        },
      },
      {
        key: {
          text: 'NOMS Number',
        },
        value: {
          html: '<strong>Some HTML</strong>',
        },
      },
    ])
  })
})

describe('camelToKebabCase', () => {
  it('transforms camelCase to kebabCase', () => {
    expect(camelToKebabCase('moreInfoRequested')).toBe('more-info-requested')
  })

  it('leaves single words untransformed', () => {
    expect(camelToKebabCase('word')).toBe('word')
  })
})

describe('kebabToCamelCase', () => {
  it('transforms kebab-case with multiple hyphens correctly', () => {
    expect(kebabToCamelCase('more-complex-example-text')).toBe('moreComplexExampleText')
  })

  it('leaves the string untransformed if there are no hyphens', () => {
    expect(kebabToCamelCase('unchanged')).toBe('unchanged')
  })

  it('transforms kebab-case with uppercase letters correctly', () => {
    expect(kebabToCamelCase('mixed-Case-Text')).toBe('mixedCaseText')
  })
})

describe('formatCommaToLinebreak', () => {
  it('replaces a single comma with <br>', () => {
    expect(formatCommaToLinebreak('Health needs, Risk to self, Exclusion zones and preferred areas')).toEqual(
      'Health needs<br>Risk to self<br>Exclusion zones and preferred areas',
    )
  })

  it('returns the string unchanged if no commas are present', () => {
    expect(formatCommaToLinebreak('Health needs')).toEqual('Health needs')
  })
})

describe('htmlToPlainText', () => {
  it('removes the HTML elements from a string', () => {
    expect(htmlToPlainText('<strong>Arson</strong>')).toEqual('Arson')
  })

  it('returns the string unchanged if no HTML is present', () => {
    expect(htmlToPlainText('Health needs')).toEqual('Health needs')
  })
})

describe('createApplicationSummary', () => {
  it('returns the correct summary when allocatedPomName is present', () => {
    const application = applicationFactory.build({
      id: '123',
      person: {
        name: 'John Doe',
        nomsNumber: 'A1234BC',
        prisonName: 'HMP Example',
      } as FullPerson,
      createdBy: {
        name: 'Referrer Name',
        email: 'referrer@example.com',
      },
      allocatedPomName: 'Joey Jo-Jo Junior Shabadoo',
      allocatedPomEmailAddress: 'joey.jojo@junior.gov.uk',
      currentPrisonName: 'Example Prison',
      assignmentDate: '2021-06-01',
    })

    const result = createApplicationSummary(application)

    expect(result).toEqual({
      id: '123',
      name: 'John Doe',
      prisonNumber: 'A1234BC',
      prisonName: 'HMP Example',
      referrerName: 'Referrer Name',
      contactEmail: 'joey.jojo@junior.gov.uk',
      emailLabel: 'Email address:',
      pomAllocation: 'Joey Jo-Jo Junior Shabadoo, Example Prison',
      pomAllocationLabel: 'Prison offender manager (POM) from 1 June 2021:',
      view: 'referrerSubmission',
    })
  })

  it('returns the correct summary when allocatedPomName is not present', () => {
    const application = applicationFactory.build({
      id: '123',
      person: {
        name: 'Robert Smith',
        nomsNumber: 'A1234BC',
        prisonName: 'HMP Example',
      } as FullPerson,
      createdBy: {
        name: 'Referrer Name',
        email: 'referrer@example.com',
      },
    })

    const result = createApplicationSummary(application)

    expect(result).toEqual({
      id: '123',
      name: 'Robert Smith',
      prisonNumber: 'A1234BC',
      prisonName: 'HMP Example',
      referrerName: 'Referrer Name',
      contactEmail: 'referrer@example.com',
      emailLabel: 'Offender management unit email address:',
      pomAllocation: 'To be allocated',
      pomAllocationLabel: 'Prison offender manager (POM):',
      view: 'referrerSubmission',
    })
  })
})