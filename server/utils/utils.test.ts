import { SummaryListItem } from '@approved-premises/ui'
import { convertToTitleCase, initialiseName, removeBlankSummaryListItems } from './utils'

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
