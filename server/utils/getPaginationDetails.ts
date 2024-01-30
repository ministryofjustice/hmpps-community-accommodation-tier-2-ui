import type { Request } from 'express'
import { createQueryString } from './utils'

export const getPaginationDetails = (
  request: Request,
  basePath: string,
  additionalParams: Record<string, unknown> = {},
) => {
  const pageNumber = request.query.page ? Number(request.query.page) : undefined

  const queryString = createQueryString({ ...additionalParams }, { addQueryPrefix: true })
  const queryStringSuffix = queryString.length > 0 ? '&' : '?'
  const hrefPrefix = `${basePath}${queryString}${queryStringSuffix}`

  return { pageNumber, hrefPrefix }
}
