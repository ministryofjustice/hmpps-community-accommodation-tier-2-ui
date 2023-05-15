import * as nunjucks from 'nunjucks'

export const escape = (text: string): string => {
  const escapeFilter = new nunjucks.Environment().getFilter('escape')
  return escapeFilter(text).val
}
