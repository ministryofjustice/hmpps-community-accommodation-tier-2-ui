import qs, { IStringifyOptions } from 'qs'
import { Cas2Application, Cas2SubmittedApplication, FullPerson, Person } from '@approved-premises/api'
import { SummaryListItem } from '@approved-premises/ui'

const properCase = (word: string): string =>
  word.length >= 1 ? word[0].toUpperCase() + word.toLowerCase().slice(1) : word

const isBlank = (str: string): boolean => !str || /^\s*$/.test(str)

/**
 * Converts a name (first name, last name, middle name, etc.) to proper case equivalent, handling double-barreled names
 * correctly (i.e. each part in a double-barreled is converted to proper case).
 * @param name name to be converted.
 * @returns name converted to proper case.
 */
const properCaseName = (name: string): string => (isBlank(name) ? '' : name.split('-').map(properCase).join('-'))

export const convertToTitleCase = (sentence: string): string =>
  isBlank(sentence) ? '' : sentence.split(' ').map(properCaseName).join(' ')

export const initialiseName = (fullName?: string): string | null => {
  // this check is for the authError page
  if (!fullName) return null

  const array = fullName.split(' ')
  return `${array[0][0]}. ${array.reverse()[0]}`
}

export const createQueryString = (
  params: Record<string, unknown> | string,
  options: IStringifyOptions = { encode: false, indices: false },
): string => {
  return qs.stringify(params, options)
}

export const isFullPerson = (person: Person): person is FullPerson => {
  return person.type === 'FullPerson'
}

/**
 * Returns the person's name if they are a FullPerson, otherwise returns 'the person'
 * @param {Person} person
 * @returns 'the person' | person.name
 */
export const nameOrPlaceholderCopy = (person: Person, copyForRestrictedPerson = 'the person'): string => {
  return isFullPerson(person) ? person.name : copyForRestrictedPerson
}

/**
 * Removes any items in an array of summary list items that are blank or undefined
 * @param items an array of summary list items
 * @returns all items with non-blank values
 */
export const removeBlankSummaryListItems = (items: Array<SummaryListItem>): Array<SummaryListItem> => {
  return items.filter(item => {
    if ('html' in item.value) {
      return item.value.html
    }
    if ('text' in item.value) {
      return item.value.text
    }
    return false
  })
}

export const stringToKebabCase = (stringToTransform: string) => {
  return stringToTransform.replace(/\s+/g, '-').toLowerCase()
}

export const isSubmittedApplication = (
  application: Cas2Application | Cas2SubmittedApplication,
): application is Cas2SubmittedApplication => {
  return !Object.keys(application).includes('createdBy')
}

/**
 * Transforms a kebab-case formatted string into camelCase
 * @param str a string that is formatted in kebab-case
 * @returns string formatted in camelCase
 */
export const kebabToCamelCase = (str: string) => {
  return str.replace(/-./g, match => match[1].toUpperCase())
}

/**
 * Transforms a camelCase formatted string into kebab-case
 * @param str a string that is formatted in camelCase
 * @returns string formatted in kebab-case
 */
export const camelToKebabCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Substitutes commas in a comma separated list with HTML linebreaks
 * example: "This, is, a, list" --> "This<br>is<br>a<br>list<br>"
 * @param str
 * @returns string
 */
export const formatCommaToLinebreak = (str: string) => {
  return str.replace(/,\s*/g, '<br>')
}

/**
 * Removes HTML tags from a string
 * example: <strong>Arson</strong> --> "Arson"
 * @param str
 * @returns string
 */
export const htmlToPlainText = (str: string) => {
  return str.replace(/(<([^>]+)>)/gi, '')
}
