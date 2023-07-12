import * as nunjucks from 'nunjucks'

export const escape = (text: string | null): string => {
  const escapeFilter = new nunjucks.Environment().getFilter('escape')
  return escapeFilter(text).val
}
