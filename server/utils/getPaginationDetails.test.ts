import { createMock } from '@golevelup/ts-jest'
import type { Request } from 'express'
import { getPaginationDetails } from './getPaginationDetails'

describe('getPaginationDetails', () => {
  const basePath = 'http://localhost/example'

  it('should return the hrefPrefix with a query string prefix if there are no query parameters', () => {
    const request = createMock<Request>({ query: {} })

    expect(getPaginationDetails(request, basePath)).toEqual({
      pageNumber: undefined,
      hrefPrefix: `${basePath}?`,
    })
  })

  it('should append additonal parameters to the hrefPrefix', () => {
    const request = createMock<Request>({ query: { page: '1', sortBy: 'something', sortDirection: 'asc' } })

    expect(getPaginationDetails(request, basePath, { foo: 'bar' })).toEqual({
      pageNumber: 1,
      hrefPrefix: `${basePath}?foo=bar&`,
    })
  })
})
