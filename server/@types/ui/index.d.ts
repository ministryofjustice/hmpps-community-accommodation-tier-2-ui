export interface ErrorsAndUserInput {
  errorTitle?: string
  errors: ErrorMessages
  errorSummary: Array<string>
  userInput: Record<string, unknown>
}

export interface ErrorMessage {
  text: string
  attributes: {
    [K: string]: boolean
  }
}
export interface ErrorMessages {
  [K: string]: ErrorMessage
}

export interface ErrorSummary {
  text?: string
  html?: string
  href?: string
}

export type UserDetails = {
  id: string
  name: string
  displayName: string
  roles: Array<UserRole>
}

export type OasysImportArrays = ArrayOfOASysRiskOfSeriousHarmSummaryQuestions

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Very High'

export type TierNumber = '1' | '2' | '3' | '4'
export type TierLetter = 'A' | 'B' | 'C' | 'D'
export type RiskTierLevel = `${TierLetter}${TierNumber}`

// A utility type that allows us to define an object with a date attribute split into
// date, month, year (and optionally, time) attributes. Designed for use with the GOV.UK
// date input
export type ObjectWithDateParts<K extends string | number> = { [P in `${K}-${'year' | 'month' | 'day'}`]: string } & {
  [P in `${K}-time`]?: string
} & {
  [P in K]?: string
}

export type TableRow = Array<TableCell>
